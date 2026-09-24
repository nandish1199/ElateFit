const CARDIO_DB = "elateFitCardioDB";
const CARDIO_VERSION = 1;
const PLAN_STORE = "plans";
const PLAN_KEY = "current";
const CARDIO_DAYS_KEY = "elateFitCardioCompletedDays";
let db;
let plan = [];
let editingId = null;
let timer = null;
let timerState = null;
let savedPlans = [];
let cardioCalendarMonth = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1,
);
const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
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
  el.textContent = text;
  el.style.color = error ? "#a45e4c" : "#1f6b5b";
}
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
    work: reps * secondsPerRep + 1,
    rest: Math.max(
      0,
      (Number(document.getElementById("restSeconds").value) || 0) + 1,
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
    '<i class="fa-solid fa-plus"></i> Add cardio';
  document.getElementById("cardioFormTitle").textContent = "Add cardio";
}
function fillForm(item) {
  editingId = item.id;
  document.getElementById("cardioName").value = item.name;
  document.getElementById("cardioRounds").value = item.rounds;
  document.getElementById("repCount").value =
    item.reps ||
    Math.max(1, Math.round((item.work || 1) / (item.secondsPerRep || 1)));
  document.getElementById("secondsPerRep").value = item.secondsPerRep || 1;
  document.getElementById("restSeconds").value = item.rest;
  document.getElementById("cardioNotes").value = item.notes || "";
  document.getElementById("saveCardio").innerHTML =
    '<i class="fa-solid fa-floppy-disk"></i> Update cardio';
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
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  u.pitch = 1;
  speechSynthesis.speak(u);
}
function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
function nextBlock(index) {
  return plan[index + 1] || null;
}
function startWork(item) {
  timerState.phase = "work";
  timerState.remaining = item.work;
  timerState.total = item.work;
  timerState.reps =
    item.reps || Math.max(1, Math.round(item.work / (item.secondsPerRep || 1)));
  timerState.secondsPerRep = item.secondsPerRep || item.work / timerState.reps;
  timerState.completedReps = 0;
  timerState.nextRepAt = timerState.secondsPerRep;
}
function beginSession() {
  if (!plan.length) {
    setStatus("Add at least one cardio first.");
    return;
  }
  clearInterval(timer);
  timerState = { itemIndex: 0, round: 1, phase: "work" };
  startWork(plan[0]);
  document.getElementById("timerPanel").classList.remove("hidden");
  speak(`Get ready. ${plan[0].name}`);
  renderTimer();
  timer = setInterval(tick, 1000);
  document.getElementById("timerPanel").scrollIntoView({ behavior: "smooth" });
}
function tick() {
  if (!timerState) return;
  timerState.remaining--;
  const item = plan[timerState.itemIndex];
  if (timerState.phase === "work") {
    const elapsed = timerState.total - timerState.remaining;
    while (
      timerState.completedReps < timerState.reps &&
      elapsed >= timerState.nextRepAt
    ) {
      timerState.completedReps++;
      speak(String(timerState.completedReps));
      timerState.nextRepAt += timerState.secondsPerRep;
    }
  }
  if (timerState.phase === "rest" || timerState.phase === "transition") {
    if (timerState.remaining > 0 && timerState.remaining <= 7)
      speak(String(timerState.remaining));
  }
  if (timerState.remaining <= 0) {
    if (timerState.phase === "work") {
      if (timerState.completedReps < timerState.reps) {
        timerState.completedReps = timerState.reps;
        speak(String(timerState.completedReps));
      }
      if (timerState.round < item.rounds && item.rest > 0) {
        timerState.phase = "rest";
        timerState.remaining = item.rest;
        timerState.total = item.rest;
        speak("Rest");
      } else if (timerState.round < item.rounds) {
        timerState.round++;
        startWork(item);
        speak(`${item.name}. Round ${timerState.round}`);
      } else {
        const next = nextBlock(timerState.itemIndex);
        if (next && item.transitionRest > 0) {
          timerState.phase = "transition";
          timerState.nextIndex = timerState.itemIndex + 1;
          timerState.remaining = item.transitionRest;
          timerState.total = item.transitionRest;
          speak(`Rest before ${next.name}`);
        } else if (next) {
          timerState.itemIndex++;
          timerState.round = 1;
          startWork(next);
          speak(`Change. ${[...next.name].join(", ")}`);
        } else {
          finishSession();
          return;
        }
      }
    } else if (timerState.phase === "transition") {
      const next = plan[timerState.nextIndex];
      timerState.itemIndex = timerState.nextIndex;
      timerState.round = 1;
      startWork(next);
      speak(`Change. ${[...next.name].join(", ")}`);
    } else {
      timerState.round++;
      startWork(item);
      speak(`${item.name}. Round ${timerState.round}`);
    }
  }
  renderTimer();
}
function renderTimer() {
  if (!timerState) return;
  const item = plan[timerState.itemIndex];
  document.getElementById("timerPhase").textContent =
    timerState.phase === "work"
      ? `Round ${timerState.round} of ${item.rounds}`
      : timerState.phase === "transition"
        ? "Between cardio"
        : "Rest";
  document.getElementById("timerName").textContent =
    timerState.phase === "work"
      ? item.name
      : timerState.phase === "transition"
        ? `Next: ${plan[timerState.nextIndex].name}`
        : "Recover";
  document.getElementById("timerClock").textContent = formatTime(
    timerState.remaining,
  );
  document.getElementById("timerProgressBar").style.width =
    `${Math.max(0, Math.min(100, (1 - timerState.remaining / timerState.total) * 100))}%`;
  const next =
    timerState.phase === "work" && timerState.round < item.rounds
      ? `Next: ${item.rest}s rest`
      : nextBlock(timerState.itemIndex)
        ? `Next: ${nextBlock(timerState.itemIndex).name}`
        : "Final block";
  document.getElementById("timerNext").textContent = next;
}
function finishSession(completed = true) {
  clearInterval(timer);
  timer = null;
  timerState = null;
  if (completed) {
    markCardioDayComplete();
    renderCardioCalendar();
  }
  speechSynthesis?.cancel();
  document.getElementById("timerPhase").textContent = "Complete";
  document.getElementById("timerName").textContent = "Session finished";
  document.getElementById("timerClock").textContent = "0:00";
  document.getElementById("timerMessage").textContent =
    "Great work. Your cardio session is complete.";
  speak("Session complete. Great work.");
}
function pauseSession() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    document.getElementById("pauseTimer").innerHTML =
      '<i class="fa-solid fa-play"></i> Resume';
  } else if (timerState) {
    timer = setInterval(tick, 1000);
    document.getElementById("pauseTimer").innerHTML =
      '<i class="fa-solid fa-pause"></i> Pause';
  }
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
    if (e.target.closest(".deleteCardio")) {
      plan.splice(index, 1);
    }
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
  document
    .getElementById("startSession")
    .addEventListener("click", beginSession);
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
  document
    .getElementById("resetCardioCalendar")
    .addEventListener("click", () => {
      if (
        !confirm(
          "Reset all completed cardio days from the calendar? Your current and saved cardio plans will not be changed.",
        )
      )
        return;
      if (
        !confirm(
          "This permanently clears all calendar cardio history. Continue?",
        )
      )
        return;
      localStorage.removeItem(CARDIO_DAYS_KEY);
      renderCardioCalendar();
      setStatus("Cardio calendar data reset.", false);
    });
  document.getElementById("nextCardioMonth").addEventListener("click", () => {
    cardioCalendarMonth = new Date(
      cardioCalendarMonth.getFullYear(),
      cardioCalendarMonth.getMonth() + 1,
      1,
    );
    renderCardioCalendar();
  });
  document.getElementById("pauseTimer").addEventListener("click", pauseSession);
  document.getElementById("resetTimer").addEventListener("click", () => {
    finishSession(false);
    document.getElementById("timerPanel").classList.add("hidden");
  });
  document.getElementById("skipTimer").addEventListener("click", () => {
    if (timerState) {
      timerState.remaining = 0;
      tick();
    }
  });
});
document.getElementById("clearCardio").addEventListener("click", () => {
  resetForm();
  setStatus("Cardio form cleared.", false);
});
