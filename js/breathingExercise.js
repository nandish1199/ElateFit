const breathingTechniques = [
  {
    name: "Diaphragmatic breathing",
    pattern: "Belly expands on inhale",
    phases: [
      ["Inhale", 4],
      ["Exhale", 6],
    ],
  },
  {
    name: "Slow deep breathing",
    pattern: "About 5-6 breaths per minute",
    phases: [
      ["Inhale", 5],
      ["Exhale", 5],
    ],
  },
  {
    name: "4-6 breathing",
    pattern: "4 sec inhale -> 6 sec exhale",
    phases: [
      ["Inhale", 4],
      ["Exhale", 6],
    ],
  },
  {
    name: "4-7-8 breathing",
    pattern: "4 sec inhale -> 7 sec hold -> 8 sec exhale",
    phases: [
      ["Inhale", 4],
      ["Hold", 7],
      ["Exhale", 8],
    ],
  },
  {
    name: "Box breathing",
    pattern: "4 sec inhale -> 4 sec hold -> 4 sec exhale -> 4 sec hold",
    phases: [
      ["Inhale", 4],
      ["Hold", 4],
      ["Exhale", 4],
      ["Hold", 4],
    ],
  },
  {
    name: "Coherent breathing",
    pattern: "About 5-6 breaths per minute",
    phases: [
      ["Inhale", 5],
      ["Exhale", 5],
    ],
  },
  {
    name: "Extended exhale",
    pattern: "Exhale longer than inhale",
    phases: [
      ["Inhale", 4],
      ["Exhale", 8],
    ],
  },
  {
    name: "Physiological sigh",
    pattern: "Double inhale -> long exhale",
    phases: [
      ["Inhale", 2],
      ["Inhale again", 2],
      ["Long exhale", 6],
    ],
  },
  {
    name: "Pursed-lip breathing",
    pattern: "Inhale through nose -> slow pursed exhale",
    phases: [
      ["Inhale through nose", 4],
      ["Slow pursed exhale", 6],
    ],
  },
  {
    name: "Equal breathing",
    pattern: "Equal inhale/exhale",
    phases: [
      ["Inhale", 5],
      ["Exhale", 5],
    ],
  },
];

// DOM references
const techniqueList = document.getElementById("techniqueList");
const techniqueCount = document.getElementById("techniqueCount");
const addTechniqueButton = document.getElementById("addTechniqueButton");
const gapInput = document.getElementById("gapMinutes");
const voiceToggle = document.getElementById("voiceToggle");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const planSummary = document.getElementById("planSummary");
const sessionLabel = document.getElementById("sessionLabel");
const techniqueName = document.getElementById("techniqueName");
const phaseText = document.getElementById("phaseText");
const breathOrb = document.getElementById("breathOrb");
const countText = document.getElementById("countText");
const progressBar = document.getElementById("progressBar");
const liveStatus = document.getElementById("breathingLiveStatus");

// State machine aligned with breathing_exercise_page.dart
let sessionId = 0;
let isRunning = false;
let isComplete = false;
let isInitialCountdown = false;
let inGap = false;
let techniqueIndex = 0;
let phaseIndex = 0;
let repetitionIndex = 1;
let remaining = 0;
let elapsed = 0;
let totalPlanSeconds = 1;
let statusMessage = "Audio guidance is available when you start.";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const isValid = (currentSession) => isRunning && sessionId === currentSession;

function isCountedPhase(name) {
  const lower = name.toLowerCase();
  return lower.includes("inhale") || lower.includes("exhale");
}

function phaseClass(name) {
  const lower = name.toLowerCase();
  return lower.includes("inhale")
    ? "inhale"
    : lower.includes("exhale")
      ? "exhale"
      : lower.includes("hold")
        ? "hold"
        : "rest";
}

function chime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = 520;
    gain.gain.setValueAtTime(0.08, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.35);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.35);
  } catch (_) {}
}

function speakPhrase(text) {
  return new Promise((resolve) => {
    if (voiceToggle.value === "off" || !("speechSynthesis" in window)) {
      resolve();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;

      let settled = false;
      const finish = () => {
        if (!settled) {
          settled = true;
          resolve();
        }
      };

      utterance.onend = finish;
      utterance.onerror = finish;
      setTimeout(finish, 4000); // Safe fallback timeout
      window.speechSynthesis.speak(utterance);
    } catch (_) {
      resolve();
    }
  });
}

function speakDigit(number) {
  if (voiceToggle.value !== "voice-count" || !("speechSynthesis" in window))
    return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(String(number));
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  } catch (_) {}
}

function saveCompletedSession() {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const todayStr = `${year}-${month}-${day}`;

    let completedList = [];
    const stored = localStorage.getItem("elateFitBreatheCompletedDays");
    if (stored) {
      try {
        completedList = JSON.parse(stored);
        if (!Array.isArray(completedList)) completedList = [];
      } catch (_) {
        completedList = [];
      }
    }
    if (!completedList.includes(todayStr)) {
      completedList.push(todayStr);
      localStorage.setItem(
        "elateFitBreatheCompletedDays",
        JSON.stringify(completedList),
      );
    }
  } catch (_) {}
}

function techniqueOptions(selectedIndex) {
  return breathingTechniques
    .map(
      (item, index) =>
        `<option value="${index}" ${index === selectedIndex ? "selected" : ""}>${item.name}</option>`,
    )
    .join("");
}

function addTechniqueRow(selectedIndex = 0) {
  if (
    isRunning ||
    isComplete ||
    techniqueList.children.length >= breathingTechniques.length
  )
    return;

  const row = document.createElement("div");
  row.className = "breathingTechniqueRow";
  row.innerHTML = `<button type="button" class="breathingRemoveButton" aria-label="Remove technique">&times;</button>
        <div class="breathingRowFields">
          <div><label>Technique</label><select class="technique-select">${techniqueOptions(selectedIndex)}</select></div>
          <div><label>Repetitions</label><input class="repetitions-input" type="number" min="1" max="70" step="1" value="3"></div>
        </div>`;

  row.querySelector(".breathingRemoveButton").addEventListener("click", () => {
    if (!isRunning && !isComplete && techniqueList.children.length > 1) {
      row.remove();
      updatePlan();
      updateControlsState();
    }
  });

  row.querySelector(".technique-select").addEventListener("change", updatePlan);
  row
    .querySelector(".repetitions-input")
    .addEventListener("change", updatePlan);
  techniqueList.appendChild(row);
  updatePlan();
  updateControlsState();
}

function getPlan() {
  return [...techniqueList.querySelectorAll(".breathingTechniqueRow")].map(
    (row) => {
      const index = Number(row.querySelector(".technique-select").value) || 0;
      const repetitions = Math.min(
        70,
        Math.max(1, Number(row.querySelector(".repetitions-input").value) || 1),
      );
      row.querySelector(".repetitions-input").value = repetitions;
      return { ...breathingTechniques[index], repetitions };
    },
  );
}

function getGapSeconds() {
  return Math.min(30, Math.max(0, Number(gapInput.value) || 0)) * 60;
}

function calculateTotalPlanSeconds(plan, gapSeconds) {
  const breathingSeconds = plan.reduce(
    (total, item) =>
      total +
      item.repetitions *
        item.phases.reduce((phaseTotal, phase) => phaseTotal + phase[1], 0),
    0,
  );
  return breathingSeconds + gapSeconds * Math.max(0, plan.length - 1);
}

function updatePlan() {
  const plan = getPlan();
  const gapSeconds = getGapSeconds();
  techniqueCount.textContent = `${plan.length} technique${plan.length === 1 ? "" : "s"}`;

  const totalSeconds = calculateTotalPlanSeconds(plan, gapSeconds);
  const totalMinutes = Math.ceil(totalSeconds / 60);

  planSummary.textContent = `${plan.map((item) => `${item.name} (${item.repetitions} rep${item.repetitions === 1 ? "" : "s"})`).join(" -> ")} | About ${totalMinutes} minute${totalMinutes === 1 ? "" : "s"}`;
}

function updateControlsState() {
  const hasSession = isRunning || isComplete;
  startButton.disabled = hasSession;
  addTechniqueButton.disabled =
    hasSession || techniqueList.children.length >= breathingTechniques.length;
  gapInput.disabled = hasSession;
  voiceToggle.disabled = hasSession;

  const rows = techniqueList.querySelectorAll(".breathingTechniqueRow");
  rows.forEach((row) => {
    const sel = row.querySelector(".technique-select");
    const rep = row.querySelector(".repetitions-input");
    const rm = row.querySelector(".breathingRemoveButton");
    if (sel) sel.disabled = hasSession;
    if (rep) rep.disabled = hasSession;
    if (rm) rm.disabled = hasSession || rows.length <= 1;
  });
}

function render() {
  const plan = getPlan();
  const currentItem = plan[techniqueIndex] || plan[0];
  const currentPhase = currentItem ? currentItem.phases[phaseIndex] : null;

  // Session Label
  if (isComplete) {
    sessionLabel.innerHTML = '<i class="fa-solid fa-wind"></i> COMPLETE';
  } else if (!isRunning) {
    sessionLabel.innerHTML =
      '<i class="fa-solid fa-wind"></i> READY WHEN YOU ARE';
  } else if (isInitialCountdown) {
    sessionLabel.innerHTML =
      '<i class="fa-solid fa-wind"></i> STARTING SESSION';
  } else if (inGap) {
    sessionLabel.innerHTML =
      '<i class="fa-solid fa-wind"></i> TRANSITION PAUSE';
  } else {
    sessionLabel.innerHTML = `<i class="fa-solid fa-wind"></i> TECHNIQUE ${techniqueIndex + 1} OF ${plan.length} | REP ${repetitionIndex} OF ${currentItem.repetitions}`;
  }

  // Technique / Title
  if (isComplete) {
    techniqueName.textContent = "WELL DONE";
  } else if (!isRunning) {
    techniqueName.textContent = "CHOOSE YOUR TECHNIQUES";
  } else if (isInitialCountdown) {
    techniqueName.textContent = "GET READY";
  } else if (inGap) {
    techniqueName.textContent = "PREPARE FOR THE NEXT TECHNIQUE";
  } else {
    techniqueName.textContent = currentItem
      ? currentItem.name.toUpperCase()
      : "";
  }

  // Phase Label
  if (isComplete) {
    phaseText.textContent = "Take a moment before returning to your day.";
  } else if (!isRunning) {
    phaseText.textContent = "Your guided session will appear here.";
  } else if (isInitialCountdown) {
    phaseText.textContent = "Session begins in a moment.";
  } else if (inGap) {
    phaseText.textContent = "Rest and let your breathing settle.";
  } else if (currentPhase && currentItem) {
    phaseText.textContent = `${currentPhase[0]} - ${currentItem.pattern}`;
  }

  // Count & Orb
  if (isComplete) {
    countText.textContent = "Done";
    breathOrb.className = "breathingOrb";
  } else if (!isRunning) {
    countText.textContent = "--";
    breathOrb.className = "breathingOrb";
  } else {
    countText.textContent = String(remaining);
    if (inGap) {
      breathOrb.className = "breathingOrb rest";
    } else if (currentPhase) {
      breathOrb.className = `breathingOrb ${phaseClass(currentPhase[0])}`;
    } else {
      breathOrb.className = "breathingOrb";
    }
  }

  // Progress Bar
  const pct =
    totalPlanSeconds === 0
      ? 0
      : Math.min(100, (elapsed / totalPlanSeconds) * 100);
  progressBar.style.width = isComplete ? "100%" : `${pct}%`;

  // Status
  liveStatus.textContent = statusMessage;
  if (isComplete) {
    liveStatus.className = "breathingFinished";
  } else {
    liveStatus.className = "";
  }
}

async function startSession() {
  if (isRunning || isComplete) return;

  const plan = getPlan();
  if (!plan.length) return;

  const gapSeconds = getGapSeconds();
  totalPlanSeconds = calculateTotalPlanSeconds(plan, gapSeconds);

  sessionId++;
  const currentSession = sessionId;

  isRunning = true;
  isComplete = false;
  isInitialCountdown = true;
  techniqueIndex = 0;
  phaseIndex = 0;
  repetitionIndex = 1;
  remaining = 5;
  elapsed = 0;
  inGap = false;
  statusMessage = "Get comfortable and follow the guide.";

  updateControlsState();
  render();

  // 1. Say "Start"
  if (voiceToggle.value !== "off") {
    await speakPhrase("Get ready");
  }
  if (!isValid(currentSession)) return;

  // 2. Exact 200ms gap after "Start" finishes
  await delay(200);
  if (!isValid(currentSession)) return;

  // 3. Initial countdown 5 -> 1 with exactly 1 second per count
  for (let i = 5; i >= 1; i--) {
    remaining = i;
    render();
    speakDigit(i);
    await delay(1000);
    if (!isValid(currentSession)) return;
  }

  isInitialCountdown = false;

  // 4. Run session plan
  for (let tIdx = 0; tIdx < plan.length; tIdx++) {
    techniqueIndex = tIdx;
    statusMessage = "Follow the breathing pattern.";
    render();

    const item = plan[tIdx];

    // Announce technique name completely
    chime();
    if (voiceToggle.value !== "off") {
      await speakPhrase(item.name);
      await delay(300);
    } else {
      await delay(500);
    }
    if (!isValid(currentSession)) return;

    // Loop through repetitions
    for (let rep = 1; rep <= item.repetitions; rep++) {
      repetitionIndex = rep;

      // Loop through phases
      for (let pIdx = 0; pIdx < item.phases.length; pIdx++) {
        phaseIndex = pIdx;
        const currentPhase = item.phases[pIdx];
        remaining = currentPhase[1];
        statusMessage = "Stay with the rhythm.";
        render();

        chime();

        // Say phase cue completely before counting down
        if (voiceToggle.value !== "off") {
          await speakPhrase(currentPhase[0]);
          await delay(200);
        }
        if (!isValid(currentSession)) return;

        // Countdown sequence starts immediately at phase duration (e.g. 5, 4, 3, 2, 1)
        const isCounted =
          voiceToggle.value === "voice-count" &&
          isCountedPhase(currentPhase[0]);

        for (let sec = currentPhase[1]; sec >= 1; sec--) {
          remaining = sec;
          elapsed++;
          render();

          if (isCounted) {
            speakDigit(sec);
          }

          await delay(1000);
          if (!isValid(currentSession)) return;
        }
      }
    }

    // Inter-technique transition gap
    if (tIdx + 1 < plan.length && gapSeconds > 0) {
      inGap = true;
      statusMessage = "Transition pause. Let your breathing settle.";
      render();

      if (voiceToggle.value !== "off") {
        await speakPhrase("Rest");
      }

      for (let g = gapSeconds; g >= 1; g--) {
        remaining = g;
        render();
        await delay(1000);
        if (!isValid(currentSession)) return;
      }

      inGap = false;
    }
  }

  finishSession(currentSession);
}

function finishSession(currentSession) {
  if (sessionId !== currentSession) return;
  sessionId++;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  saveCompletedSession();

  isRunning = false;
  isComplete = true;
  isInitialCountdown = false;
  inGap = false;
  remaining = 0;
  elapsed = totalPlanSeconds;
  statusMessage = "Session complete. Notice how you feel.";

  updateControlsState();
  render();
}

function resetSession() {
  sessionId++;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  isRunning = false;
  isComplete = false;
  isInitialCountdown = false;
  inGap = false;
  techniqueIndex = 0;
  phaseIndex = 0;
  repetitionIndex = 1;
  remaining = 0;
  elapsed = 0;
  statusMessage = "Audio guidance is available when you start.";

  techniqueList.innerHTML = "";
  addTechniqueRow(0);

  updateControlsState();
  render();
}

// Event Listeners
addTechniqueButton.addEventListener("click", () => {
  addTechniqueRow(
    Math.min(techniqueList.children.length, breathingTechniques.length - 1),
  );
});

gapInput.addEventListener("input", updatePlan);
startButton.addEventListener("click", startSession);
resetButton.addEventListener("click", resetSession);

// Initial setup
addTechniqueRow(0);
render();
