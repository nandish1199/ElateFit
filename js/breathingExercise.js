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
    name: "Coherent/resonance breathing",
    pattern: "About 5-6 breaths per minute",
    phases: [
      ["Inhale", 5],
      ["Exhale", 5],
    ],
  },
  {
    name: "Extended-exhale breathing",
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

const techniqueList = document.getElementById("techniqueList");
const techniqueCount = document.getElementById("techniqueCount");
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
let timer = null;
let session = null;
let speechStartTimer = null;

function techniqueOptions(selectedIndex) {
  return breathingTechniques
    .map(
      (item, index) =>
        `<option value="${index}" ${index === selectedIndex ? "selected" : ""}>${item.name}</option>`,
    )
    .join("");
}

function addTechniqueRow(selectedIndex = 0) {
  const row = document.createElement("div");
  row.className = "breathingTechniqueRow";
  row.innerHTML = `<button type="button" class="breathingRemoveButton" aria-label="Remove technique">&times;</button>
        <div class="breathingRowFields"><div><label>Technique</label><select class="technique-select">${techniqueOptions(selectedIndex)}</select></div>
        <div><label>Repetitions</label><input class="repetitions-input" type="number" min="1" max="10" step="1" value="3"></div></div>`;
  row.querySelector(".breathingRemoveButton").addEventListener("click", () => {
    if (techniqueList.children.length > 1) row.remove();
    updatePlan();
  });
  row.querySelector(".technique-select").addEventListener("change", updatePlan);
  row.querySelector(".repetitions-input").addEventListener("input", updatePlan);
  techniqueList.appendChild(row);
  updatePlan();
}

function getPlan() {
  return [...techniqueList.querySelectorAll(".breathingTechniqueRow")].map(
    (row) => {
      const index = Number(row.querySelector(".technique-select").value);
      const repetitions = Math.min(
        10,
        Math.max(1, Number(row.querySelector(".repetitions-input").value) || 1),
      );
      row.querySelector(".repetitions-input").value = repetitions;
      return { ...breathingTechniques[index], repetitions };
    },
  );
}

function updatePlan() {
  const plan = getPlan();
  const gap = Math.max(0, Number(gapInput.value) || 0);
  techniqueCount.textContent = `${plan.length} technique${plan.length === 1 ? "" : "s"}`;
  const totalSeconds =
    plan.reduce(
      (total, item) =>
        total +
        item.repetitions *
          item.phases.reduce((phaseTotal, phase) => phaseTotal + phase[1], 0),
      0,
    ) +
    gap * 60 * Math.max(0, plan.length - 1);
  const totalMinutes = Math.ceil(totalSeconds / 60);
  planSummary.textContent = `${plan.map((item) => `${item.name} (${item.repetitions} rep${item.repetitions === 1 ? "" : "s"})`).join(" -> ")} | About ${totalMinutes} minute${totalMinutes === 1 ? "" : "s"}`;
}

function speakAndWait(text) {
  return new Promise((resolve) => {
    if (
      !session ||
      voiceToggle.value === "off" ||
      !("speechSynthesis" in window)
    ) {
      resolve();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      resolve();
    };
    utterance.onend = finish;
    utterance.onerror = finish;
    window.speechSynthesis.cancel();
    clearTimeout(speechStartTimer);
    speechStartTimer = setTimeout(() => {
      speechStartTimer = null;
      if (session) window.speechSynthesis.speak(utterance);
      else finish();
    }, 60);
  });
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function speak(text) {
  if (voiceToggle.value === "off" || !("speechSynthesis" in window)) return;
  speakAndWait(text);
}

function speakPhase(phaseName) {
  const phase = phaseName.toLowerCase();
  const cue = phase.includes("exhale")
    ? "Exhale"
    : phase.includes("inhale")
      ? "Inhale"
      : phase.includes("hold")
        ? "Hold"
        : phaseName;
  speak(cue);
}

function isCountedPhase(phaseName) {
  const phase = phaseName.toLowerCase();
  return phase.includes("inhale") || phase.includes("exhale");
}

function speakPhaseStart(phaseName, duration) {
  const phase = phaseName.toLowerCase();
  const cue = phase.includes("exhale")
    ? "Exhale"
    : phase.includes("inhale")
      ? "Inhale"
      : phaseName;
  speak(
    voiceToggle.value === "voice-count" && isCountedPhase(phaseName)
      ? `${cue}, ${duration}`
      : cue,
  );
}

function speakPhaseCount(phaseName, count) {
  if (voiceToggle.value === "voice-count" && isCountedPhase(phaseName)) {
    speak(String(count));
  }
}

function announceTechnique(name) {
  session.waitingForAnnouncement = true;
  if (voiceToggle.value === "off" || !("speechSynthesis" in window)) {
    session.waitingForAnnouncement = false;
    return;
  }
  speakAndWait(name)
    .then(() => wait(500))
    .then(() => {
      if (!session) return Promise.reject();
      const firstPhase = session.plan[session.techniqueIndex].phases[0];
      const phase = firstPhase[0].toLowerCase();
      const cue = phase.includes("exhale")
        ? "Exhale"
        : phase.includes("inhale")
          ? "Inhale"
          : firstPhase[0];
      const announcement =
        voiceToggle.value === "voice-count" && isCountedPhase(firstPhase[0])
          ? `${cue}, ${firstPhase[1]}`
          : cue;
      return speakAndWait(announcement);
    })
    .then(() => {
      if (session) session.waitingForAnnouncement = false;
    })
    .catch(() => {});
}

function announceSessionStart() {
  if (voiceToggle.value === "off" || !("speechSynthesis" in window)) {
    announceTechnique(session.plan[0].name);
    return;
  }

  session.waitingForAnnouncement = true;
  const announcements = ["Start", "5", "4", "3", "2", "1"];
  announcements
    .reduce(
      (sequence, announcement) =>
        sequence.then(() => speakAndWait(announcement)),
      Promise.resolve(),
    )
    .then(() => {
      if (session) announceTechnique(session.plan[0].name);
    });
}

function chime() {
  if (!("AudioContext" in window)) return;
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.frequency.value = 520;
  gain.gain.setValueAtTime(0.08, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.35);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.35);
}

function phaseClass(name) {
  const phase = name.toLowerCase();
  return phase.includes("inhale")
    ? "inhale"
    : phase.includes("exhale")
      ? "exhale"
      : phase.includes("hold")
        ? "hold"
        : "rest";
}

function renderSession() {
  const item = session.plan[session.techniqueIndex];
  const phase = item.phases[session.phaseIndex];
  sessionLabel.textContent = `Technique ${session.techniqueIndex + 1} of ${session.plan.length} | Rep ${session.repetitionIndex} of ${item.repetitions}`;
  techniqueName.textContent = item.name;
  phaseText.textContent = `${phase[0]} - ${item.pattern}`;
  countText.textContent = session.remaining;
  breathOrb.className = `breathingOrb ${phaseClass(phase[0])}`;
  progressBar.style.width = `${Math.min(100, (session.elapsed / session.total) * 100)}%`;
}

function endSession(message = "Session complete. Notice how you feel.") {
  clearInterval(timer);
  timer = null;
  clearTimeout(speechStartTimer);
  speechStartTimer = null;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  session = null;
  breathOrb.className = "breathingOrb";
  countText.textContent = "Done";
  sessionLabel.textContent = "Complete";
  techniqueName.textContent = "Well done";
  phaseText.textContent = "Take a moment before returning to your day.";
  liveStatus.textContent = message;
  liveStatus.className = "breathingFinished";
  progressBar.style.width = "100%";
  startButton.disabled = false;
}

function renderGap() {
  sessionLabel.textContent = "Transition pause";
  techniqueName.textContent = "Prepare for the next technique";
  phaseText.textContent = "Rest and let your breathing settle.";
  countText.textContent = session.remaining;
  breathOrb.className = "breathingOrb rest";
  progressBar.style.width = `${Math.min(100, (session.elapsed / session.total) * 100)}%`;
}

function startSession() {
  if (session) return;
  const plan = getPlan();
  const gapSeconds = Math.max(0, Number(gapInput.value) || 0) * 60;
  const breathingSeconds = plan.reduce(
    (total, item) =>
      total +
      item.repetitions *
        item.phases.reduce((phaseTotal, phase) => phaseTotal + phase[1], 0),
    0,
  );
  session = {
    plan,
    gapSeconds,
    techniqueIndex: 0,
    phaseIndex: 0,
    repetitionIndex: 1,
    remaining: plan[0].phases[0][1],
    elapsed: 0,
    total: breathingSeconds + gapSeconds * (plan.length - 1),
    inGap: false,
    waitingForAnnouncement: false,
  };
  startButton.disabled = true;
  liveStatus.className = "";
  sessionLabel.textContent = "Get ready";
  techniqueName.textContent = "Starting soon";
  phaseText.textContent = "Listen for the countdown.";
  chime();
  announceSessionStart();
  renderSession();
  timer = setInterval(tick, 1000);
}

function tick() {
  if (!session) return;
  if (session.waitingForAnnouncement) return;
  session.remaining--;
  session.elapsed++;
  if (session.inGap) {
    if (session.remaining > 0 && session.remaining <= 6)
      speak(String(session.remaining));
    if (session.remaining <= 0) {
      session.inGap = false;
      session.phaseIndex = 0;
      session.repetitionIndex = 1;
      session.remaining = session.plan[session.techniqueIndex].phases[0][1];
      chime();
      announceTechnique(session.plan[session.techniqueIndex].name);
      renderSession();
    } else renderGap();
    return;
  }

  const item = session.plan[session.techniqueIndex];
  if (session.remaining > 0) {
    speakPhaseCount(item.phases[session.phaseIndex][0], session.remaining);
    renderSession();
    return;
  }

  session.phaseIndex++;
  if (session.phaseIndex < item.phases.length) {
    session.remaining = item.phases[session.phaseIndex][1];
    chime();
    speakPhaseStart(
      item.phases[session.phaseIndex][0],
      item.phases[session.phaseIndex][1],
    );
    renderSession();
  } else if (session.repetitionIndex < item.repetitions) {
    session.repetitionIndex++;
    session.phaseIndex = 0;
    session.remaining = item.phases[0][1];
    chime();
    speakPhaseStart(item.phases[0][0], item.phases[0][1]);
    renderSession();
  } else if (session.techniqueIndex < session.plan.length - 1) {
    session.techniqueIndex++;
    session.phaseIndex = 0;
    session.repetitionIndex = 1;
    if (session.gapSeconds) {
      session.inGap = true;
      session.remaining = session.gapSeconds;
      chime();
      speak("Rest");
      if (session.remaining === 6) speak("6");
      renderGap();
    } else {
      session.remaining = session.plan[session.techniqueIndex].phases[0][1];
      chime();
      announceTechnique(session.plan[session.techniqueIndex].name);
      renderSession();
    }
  } else endSession();
}

function reset() {
  clearInterval(timer);
  timer = null;
  clearTimeout(speechStartTimer);
  speechStartTimer = null;
  session = null;
  techniqueList.innerHTML = "";
  addTechniqueRow(0);
  sessionLabel.textContent = "READY WHEN YOU ARE";
  techniqueName.textContent = "CHOOSE YOUR TECHNIQUES";
  phaseText.textContent = "Your guided session will appear here.";
  countText.textContent = "--";
  breathOrb.className = "breathingOrb";
  progressBar.style.width = "0";
  liveStatus.textContent = "Audio guidance is available when you start.";
  liveStatus.className = "";
  startButton.disabled = false;
}

document
  .getElementById("addTechniqueButton")
  .addEventListener("click", () =>
    addTechniqueRow(
      Math.min(techniqueList.children.length, breathingTechniques.length - 1),
    ),
  );
gapInput.addEventListener("input", updatePlan);
startButton.addEventListener("click", startSession);
resetButton.addEventListener("click", reset);
addTechniqueRow(0);
