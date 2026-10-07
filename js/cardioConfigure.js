const CARDIO_DB = "elateFitCardioDB";
const CARDIO_VERSION = 1;
const PLAN_STORE = "plans";
const PLAN_KEY = "current";
const CARDIO_DAYS_KEY = "elateFitCardioCompletedDays";

let db;
let plan = [];
let editingId = null;
let savedPlans = [];
let cardioCalendarMonth = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1,
);

let sessionId = 0;
let isPaused = false;
let skipRequested = false;
let timerState = null;

const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ==========================================================================
   IndexedDB Storage Helpers
   ========================================================================== */
function openDb() {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(CARDIO_DB, CARDIO_VERSION);
    r.onupgradeneeded = (e) => {
      if (!e.target.result.objectStoreNames.contains(PLAN_STORE))
        e.target.result.createObjectStore(PLAN_STORE, { keyPath: "id" });
    };
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

function readPlans() {
  return new Promise((resolve, reject) => {
    const r = db
      .transaction(PLAN_STORE, "readonly")
      .objectStore(PLAN_STORE)
      .getAll();
    r.onsuccess = () => resolve(r.result || []);
    r.onerror = () => reject(r.error);
  });
}

function putPlan(value) {
  return new Promise((resolve, reject) => {
    const r = db
      .transaction(PLAN_STORE, "readwrite")
      .objectStore(PLAN_STORE)
      .put(value);
    r.onsuccess = resolve;
    r.onerror = () => reject(r.error);
  });
}

function deletePlan(id) {
  return new Promise((resolve, reject) => {
    const r = db
      .transaction(PLAN_STORE, "readwrite")
      .objectStore(PLAN_STORE)
      .delete(id);
    r.onsuccess = resolve;
    r.onerror = () => reject(r.error);
  });
}

function setStatus(text, error = true) {
  const el = document.getElementById("cardioStatus");
  if (!el) return;
  el.textContent = text;
  el.style.color = error ? "#B42318" : "#16A34A";
}

/* ==========================================================================
   Calendar & Completion Tracking
   ========================================================================== */
function cardioDayKey(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getCompletedCardioDays() {
  try {
    const days = JSON.parse(localStorage.getItem(CARDIO_DAYS_KEY) || "[]");
    return new Set(Array.isArray(days) ? days : []);
  } catch {
    return new Set();
  }
}

function markCardioDayComplete() {
  const days = getCompletedCardioDays();
  days.add(cardioDayKey(new Date()));
  localStorage.setItem(CARDIO_DAYS_KEY, JSON.stringify([...days]));
}

function renderCardioCalendar() {
  const monthLabel = document.getElementById("cardioCalendarMonth");
  const grid = document.getElementById("cardioCalendarGrid");
  if (!monthLabel || !grid) return;

  const year = cardioCalendarMonth.getFullYear();
  const month = cardioCalendarMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = cardioDayKey(new Date());
  const completedDays = getCompletedCardioDays();

  monthLabel.textContent = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(cardioCalendarMonth);

  grid.innerHTML = [
    ...Array.from(
      { length: firstDay },
      () =>
        '<div class="cardioCalendarDay cardioCalendarDayEmpty" aria-hidden="true"></div>',
    ),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(year, month, index + 1);
      const key = cardioDayKey(date);
      const complete = completedDays.has(key);
      const today = key === todayKey;
      return `<div class="cardioCalendarDay${complete ? " cardioCalendarDayComplete" : ""}${today ? " cardioCalendarDayToday" : ""}" role="gridcell" aria-label="${date.toLocaleDateString()}${complete ? ", cardio completed" : ""}"><span class="cardioCalendarDate">${index + 1}</span>${complete ? '<i class="fa-solid fa-heart-pulse cardioCalendarIcon" aria-hidden="true"></i>' : ""}</div>`;
    }),
  ].join("");
}

/* ==========================================================================
   Speech Synthesis Engine
   ========================================================================== */
function speakPhrase(text) {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;

    let finished = false;
    const done = () => {
      if (!finished) {
        finished = true;
        resolve();
      }
    };

    utterance.onend = done;
    utterance.onerror = done;
    setTimeout(done, 4000);
    window.speechSynthesis.speak(utterance);
  });
}

function speakDigit(number) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(String(number));
  utterance.rate = 1.0;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

/* ==========================================================================
   Asynchronous Session Runner & Timers
   ========================================================================== */
function isValidSession(currentSession) {
  return timerState !== null && sessionId === currentSession;
}

function waitDelay(ms, currentSession) {
  return new Promise((resolve) => {
    let elapsedMs = 0;
    const interval = setInterval(() => {
      if (!isValidSession(currentSession) || skipRequested) {
        clearInterval(interval);
        resolve();
        return;
      }
      if (!isPaused) {
        elapsedMs += 100;
        if (elapsedMs >= ms) {
          clearInterval(interval);
          resolve();
        }
      }
    }, 100);
  });
}

function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function renderTimer() {
  if (!timerState) return;
  const item = plan[timerState.itemIndex];
  if (!item) return;

  const phaseEl = document.getElementById("timerPhase");
  const nameEl = document.getElementById("timerName");
  const clockEl = document.getElementById("timerClock");
  const progressEl = document.getElementById("timerProgressBar");
  const nextEl = document.getElementById("timerNext");

  if (phaseEl) {
    phaseEl.textContent =
      timerState.phase === "prepare"
        ? "GET READY"
        : timerState.phase === "work"
          ? `Round ${timerState.round} of ${item.rounds}  •  Rep ${timerState.currentRep || item.reps} of ${item.reps}`
          : timerState.phase === "transition"
            ? "Between cardio"
            : "Rest";
  }

  if (nameEl) {
    nameEl.textContent =
      timerState.phase === "prepare"
        ? "Get ready"
        : timerState.phase === "work"
          ? item.name
          : timerState.phase === "transition"
            ? `Next: ${plan[timerState.nextIndex]?.name || ""}`
            : "Recover";
  }

  if (clockEl) {
    clockEl.textContent = formatTime(timerState.remaining);
  }

  if (progressEl) {
    const progress =
      timerState.total > 0
        ? Math.max(
            0,
            Math.min(100, (1 - timerState.remaining / timerState.total) * 100),
          )
        : 0;
    progressEl.style.width = `${progress}%`;
  }

  if (nextEl) {
    const nextText =
      timerState.phase === "prepare"
        ? `Next: ${item.name} · Round 1`
        : timerState.phase === "work" && timerState.round < item.rounds
          ? `Next: ${item.rest}s rest`
          : plan[timerState.itemIndex + 1]
            ? `Next: ${plan[timerState.itemIndex + 1].name}`
            : "Final block";
    nextEl.textContent = nextText;
  }
}

async function runSession() {
  const currentSession = ++sessionId;
  isPaused = false;
  skipRequested = false;

  const firstItem = plan[0];
  timerState = {
    itemIndex: 0,
    round: 1,
    phase: "prepare",
    remaining: 5,
    total: 5,
    reps: firstItem.reps,
    secondsPerRep: firstItem.secondsPerRep,
    currentRep: firstItem.reps,
  };

  const timerPanel = document.getElementById("timerPanel");
  if (timerPanel) {
    timerPanel.classList.remove("hidden");
    timerPanel.scrollIntoView({ behavior: "smooth" });
  }

  renderTimer();

  // 1. "Get ready", then 5 - 1s gap - 4 - 3 - 2 - 1
  await speakPhrase("Get ready");
  if (!isValidSession(currentSession)) return;

  await waitDelay(250, currentSession);
  if (!isValidSession(currentSession)) return;

  for (let i = 5; i >= 1; i--) {
    if (!isValidSession(currentSession)) return;
    if (skipRequested) {
      skipRequested = false;
      break;
    }
    timerState.remaining = i;
    timerState.total = 5;
    renderTimer();
    speakDigit(i);
    await waitDelay(1000, currentSession);
    if (!isValidSession(currentSession)) return;
  }

  // 2. Loop through cardio blocks
  for (let bIdx = 0; bIdx < plan.length; bIdx++) {
    timerState.itemIndex = bIdx;
    const block = plan[bIdx];

    for (let round = 1; round <= block.rounds; round++) {
      timerState.round = round;
      timerState.phase = "work";
      timerState.remaining = block.work;
      timerState.total = block.work;
      timerState.reps = block.reps;
      timerState.secondsPerRep = block.secondsPerRep;
      timerState.currentRep = block.reps;
      renderTimer();

      // Announce cardio name and round
      await speakPhrase(`${block.name}. Round ${round}`);
      if (!isValidSession(currentSession)) return;

      await waitDelay(300, currentSession);
      if (!isValidSession(currentSession)) return;

      // Count down reps from total reps down to 1
      const repMs = Math.round(block.secondsPerRep * 1000);
      for (let rep = block.reps; rep >= 1; rep--) {
        if (!isValidSession(currentSession)) return;
        if (skipRequested) {
          skipRequested = false;
          break;
        }
        timerState.currentRep = rep;
        renderTimer();
        speakDigit(rep);

        let repElapsed = 0;
        let lastSecTicked = 0;
        while (repElapsed < repMs) {
          if (!isValidSession(currentSession)) return;
          if (skipRequested) break;
          while (isPaused) {
            if (!isValidSession(currentSession)) return;
            await delay(100);
          }
          const step = repMs - repElapsed > 100 ? 100 : repMs - repElapsed;
          await delay(step);
          if (!isPaused) {
            repElapsed += step;
            const secNow = Math.floor(repElapsed / 1000);
            if (secNow > lastSecTicked) {
              lastSecTicked = secNow;
              if (timerState.remaining > 0) {
                timerState.remaining--;
                renderTimer();
              }
            }
          }
        }
      }

      timerState.remaining = 0;
      renderTimer();

      // Rest interval between rounds
      if (round < block.rounds && block.rest > 0) {
        timerState.phase = "rest";
        timerState.remaining = block.rest;
        timerState.total = block.rest;
        renderTimer();

        await speakPhrase("Rest");
        if (!isValidSession(currentSession)) return;

        for (let sec = block.rest; sec >= 1; sec--) {
          if (!isValidSession(currentSession)) return;
          if (skipRequested) {
            skipRequested = false;
            break;
          }
          timerState.remaining = sec;
          renderTimer();
          if (sec <= 5) {
            speakDigit(sec);
          }
          await waitDelay(1000, currentSession);
          if (!isValidSession(currentSession)) return;
        }
      }
    }

    // Transition rest between different cardio blocks
    if (bIdx + 1 < plan.length && block.transitionRest > 0) {
      timerState.nextIndex = bIdx + 1;
      timerState.phase = "transition";
      timerState.remaining = block.transitionRest;
      timerState.total = block.transitionRest;
      renderTimer();

      await speakPhrase(`Rest before ${plan[timerState.nextIndex].name}`);
      if (!isValidSession(currentSession)) return;

      for (let sec = block.transitionRest; sec >= 1; sec--) {
        if (!isValidSession(currentSession)) return;
        if (skipRequested) {
          skipRequested = false;
          break;
        }
        timerState.remaining = sec;
        renderTimer();
        if (sec <= 5) {
          speakDigit(sec);
        }
        await waitDelay(1000, currentSession);
        if (!isValidSession(currentSession)) return;
      }
    }
  }

  finishSession(true);
}

function finishSession(completed = true) {
  sessionId++;
  isPaused = false;
  skipRequested = false;
  timerState = null;

  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
  }

  const pauseBtn = document.getElementById("pauseTimer");
  if (pauseBtn) {
    pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
  }

  if (completed) {
    markCardioDayComplete();
    renderCardioCalendar();
    document.getElementById("timerPhase").textContent = "Complete";
    document.getElementById("timerName").textContent = "Session finished";
    document.getElementById("timerClock").textContent = "0:00";
    document.getElementById("timerProgressBar").style.width = "100%";
    document.getElementById("timerMessage").textContent =
      "Great work. Your cardio session is complete.";
    speakPhrase("Session complete. Great work.");
  }
}

function pauseSession() {
  if (!timerState) return;
  isPaused = !isPaused;
  const btn = document.getElementById("pauseTimer");
  if (isPaused) {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
  } else {
    if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
  }
}

/* ==========================================================================
   Form and Routine List Management
   ========================================================================== */
function formData() {
  const reps = Math.max(
    1,
    Number(document.getElementById("repCount").value) || 1,
  );
  const secondsPerRep = Math.max(
    0.1,
    Number(document.getElementById("secondsPerRep").value) || 0.1,
  );
  const existing = plan.find((x) => x.id === editingId);
  return {
    name: document.getElementById("cardioName").value.trim(),
    rounds: Math.max(
      1,
      Number(document.getElementById("cardioRounds").value) || 1,
    ),
    reps,
    secondsPerRep,
    work: Math.ceil(reps * secondsPerRep),
    rest: Math.max(
      0,
      Number(document.getElementById("restSeconds").value) || 0,
    ),
    transitionRest: existing?.transitionRest || 0,
    notes: document.getElementById("cardioNotes").value.trim(),
  };
}

function resetForm() {
  editingId = null;
  document.getElementById("cardioForm").reset();
  document.getElementById("cardioRounds").value = 3;
  document.getElementById("repCount").value = 15;
  document.getElementById("secondsPerRep").value = 3;
  document.getElementById("restSeconds").value = 10;
  document.getElementById("saveCardio").innerHTML =
    '<i class="fa-solid fa-plus"></i> ADD CARDIO';
  document.getElementById("cardioFormTitle").textContent = "Add cardio";
}

function fillForm(item) {
  editingId = item.id;
  document.getElementById("cardioName").value = item.name;
  document.getElementById("cardioRounds").value = item.rounds;
  document.getElementById("repCount").value = item.reps;
  document.getElementById("secondsPerRep").value = item.secondsPerRep;
  document.getElementById("restSeconds").value = item.rest;
  document.getElementById("cardioNotes").value = item.notes || "";
  document.getElementById("saveCardio").innerHTML =
    '<i class="fa-solid fa-floppy-disk"></i> UPDATE CARDIO';
  document.getElementById("cardioFormTitle").textContent = "Update cardio";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderPlan() {
  const list = document.getElementById("cardioList");
  list.innerHTML = plan.length
    ? plan
        .map(
          (item, i) =>
            `<article class="cardioItem"><div class="orderControls"><button class="iconButton moveUp" data-id="${item.id}" aria-label="Move ${item.name} up" ${i === 0 ? "disabled" : ""}><i class="fa-solid fa-chevron-up"></i></button><button class="iconButton moveDown" data-id="${item.id}" aria-label="Move ${item.name} down" ${i === plan.length - 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-down"></i></button></div><div><h3>${i + 1}. ${item.name}</h3><div class="itemMeta">${item.rounds} rounds · ${item.reps || "?"} reps × ${item.secondsPerRep || "?"}s · ${item.work}s total · ${item.rest}s between rounds</div><label class="transitionRestField">Rest before next cardio<input type="number" class="transitionRestInput" data-id="${item.id}" min="0" step="1" value="${item.transitionRest || 0}" /> seconds</label><div class="itemMeta">${item.notes || "No notes"}</div></div><div class="itemActions"><button class="iconButton editCardio" data-id="${item.id}" aria-label="Edit ${item.name}"><i class="fa-solid fa-pen"></i></button><button class="iconButton deleteCardio" data-id="${item.id}" aria-label="Delete ${item.name}"><i class="fa-solid fa-trash"></i></button></div></article>`,
        )
        .join("")
    : '<div class="planEmpty">No cardio added. Create your first block to build the session.</div>';
}

function renderSaved() {
  const list = document.getElementById("savedPlanList");
  list.innerHTML = savedPlans.length
    ? savedPlans
        .map(
          (p) =>
            `<div class="savedPlan"><div><strong>${p.name}</strong><small>${p.items.length} cardio blocks</small></div><div><button class="iconButton loadPlan" data-id="${p.id}" aria-label="Load ${p.name}"><i class="fa-solid fa-rotate-left"></i></button><button class="iconButton deleteSaved" data-id="${p.id}" aria-label="Delete ${p.name}"><i class="fa-solid fa-xmark"></i></button></div></div>`,
        )
        .join("")
    : "<div class='planEmpty'>No saved sessions yet.</div>";
}

function renderAll() {
  renderPlan();
  renderSaved();
  renderCardioCalendar();
}

function bindTransitionRest() {
  document
    .getElementById("cardioList")
    .addEventListener("change", async (e) => {
      const input = e.target.closest(".transitionRestInput");
      if (!input) return;
      const item = plan.find((x) => x.id === input.dataset.id);
      if (!item) return;
      item.transitionRest = Math.max(0, Number(input.value) || 0);
      await putPlan({
        id: PLAN_KEY,
        items: plan,
        updatedAt: new Date().toISOString(),
      });
      setStatus("Transition rest updated.", false);
    });
}

/* ==========================================================================
   Initialization and Listeners
   ========================================================================== */
document.addEventListener("DOMContentLoaded", bindTransitionRest);
document.addEventListener("DOMContentLoaded", async () => {
  try {
    db = await openDb();
    const records = await readPlans();
    const current = records.find((x) => x.id === PLAN_KEY);
    savedPlans = records.filter((x) => x.id !== PLAN_KEY);
    plan = current?.items || [];
    renderAll();
  } catch (e) {
    setStatus("Cardio storage is unavailable.");
  }

  document
    .getElementById("cardioForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = formData();
      if (!data.name) {
        setStatus("Add a cardio name.");
        return;
      }
      const item = { id: editingId || uid(), ...data };
      const at = editingId ? plan.findIndex((x) => x.id === editingId) : -1;
      if (at >= 0) plan[at] = item;
      else plan.push(item);

      await putPlan({
        id: PLAN_KEY,
        items: plan,
        updatedAt: new Date().toISOString(),
      });
      resetForm();
      renderPlan();
      setStatus("Cardio saved.", false);
    });

  document.getElementById("cardioList").addEventListener("click", async (e) => {
    const id = e.target.closest("button")?.dataset.id;
    if (!id) return;
    const index = plan.findIndex((x) => x.id === id);

    if (e.target.closest(".editCardio")) {
      fillForm(plan[index]);
      return;
    }
    if (e.target.closest(".deleteCardio")) plan.splice(index, 1);
    if (e.target.closest(".moveUp") && index > 0)
      [plan[index - 1], plan[index]] = [plan[index], plan[index - 1]];
    if (e.target.closest(".moveDown") && index < plan.length - 1)
      [plan[index + 1], plan[index]] = [plan[index], plan[index + 1]];

    await putPlan({
      id: PLAN_KEY,
      items: plan,
      updatedAt: new Date().toISOString(),
    });
    renderPlan();
  });

  document.getElementById("savePlan").addEventListener("click", async () => {
    if (!plan.length) {
      setStatus("Add cardio before saving the session.");
      return;
    }
    const name = prompt(
      "Name this cardio session:",
      `Cardio plan ${savedPlans.length + 1}`,
    );
    if (!name?.trim()) return;

    const saved = {
      id: uid(),
      name: name.trim(),
      items: plan,
      createdAt: new Date().toISOString(),
    };
    await putPlan(saved);
    savedPlans.push(saved);
    renderSaved();
    setStatus("Session saved.", false);
  });

  document
    .getElementById("savedPlanList")
    .addEventListener("click", async (e) => {
      const id = e.target.closest("button")?.dataset.id;
      if (!id) return;
      const p = savedPlans.find((x) => x.id === id);

      if (e.target.closest(".loadPlan")) {
        plan = p.items.map((x) => ({ ...x, id: uid() }));
        await putPlan({
          id: PLAN_KEY,
          items: plan,
          updatedAt: new Date().toISOString(),
        });
        renderPlan();
        setStatus(`Loaded ${p.name}.`, false);
      }
      if (e.target.closest(".deleteSaved")) {
        if (!confirm(`Delete ${p.name}?`)) return;
        await deletePlan(id);
        savedPlans = savedPlans.filter((x) => x.id !== id);
        renderSaved();
      }
    });

  document.getElementById("startSession").addEventListener("click", () => {
    if (!plan.length) {
      setStatus("Add at least one cardio first.");
      return;
    }
    runSession();
  });

  document
    .getElementById("previousCardioMonth")
    .addEventListener("click", () => {
      cardioCalendarMonth = new Date(
        cardioCalendarMonth.getFullYear(),
        cardioCalendarMonth.getMonth() - 1,
        1,
      );
      renderCardioCalendar();
    });

  document.getElementById("nextCardioMonth").addEventListener("click", () => {
    cardioCalendarMonth = new Date(
      cardioCalendarMonth.getFullYear(),
      cardioCalendarMonth.getMonth() + 1,
      1,
    );
    renderCardioCalendar();
  });

  document
    .getElementById("resetCardioCalendar")
    .addEventListener("click", () => {
      if (!confirm("Reset all completed cardio days from the calendar?"))
        return;
      localStorage.removeItem(CARDIO_DAYS_KEY);
      renderCardioCalendar();
      setStatus("Cardio calendar data reset.", false);
    });

  document.getElementById("pauseTimer").addEventListener("click", pauseSession);

  document.getElementById("resetTimer").addEventListener("click", () => {
    finishSession(false);
    document.getElementById("timerPanel").classList.add("hidden");
  });

  document.getElementById("skipTimer").addEventListener("click", () => {
    if (timerState) {
      skipRequested = true;
    }
  });

  document.getElementById("clearCardio").addEventListener("click", () => {
    resetForm();
    setStatus("Cardio form cleared.", false);
  });
});
