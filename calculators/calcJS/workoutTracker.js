const WORKOUT_DB_NAME = "elateFitWorkoutDB";
const WORKOUT_DB_VERSION = 1;
const WORKOUT_STORE = "workouts";
const CHALLENGE_STORAGE_KEY = "elateFit90DayChallengeStart";
const CHALLENGE_LENGTH = 90;
let workoutDb;
let workoutEntries = [];
let selectedRange = 7;
let calendarMonth = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1,
);
const EXERCISE_OPTIONS = [
  { value: "", label: "Choose an exercise" },

  // --- Chest ---
  { value: "Bench Press", label: "Bench Press", muscleGroup: "Chest" },
  {
    value: "Incline Bench Press",
    label: "Incline Bench Press",
    muscleGroup: "Chest",
  },
  {
    value: "Decline Bench Press",
    label: "Decline Bench Press",
    muscleGroup: "Chest",
  },
  { value: "Chest Fly", label: "Chest Fly", muscleGroup: "Chest" },
  { value: "Push-up", label: "Push-up", muscleGroup: "Chest" },
  { value: "Cable Crossover", label: "Cable Crossover", muscleGroup: "Chest" },
  { value: "Pec Deck Fly", label: "Pec Deck Fly", muscleGroup: "Chest" },
  { value: "Chest Dip", label: "Chest Dip", muscleGroup: "Chest" },
  {
    value: "Dumbbell Pullover",
    label: "Dumbbell Pullover",
    muscleGroup: "Chest",
  },

  // --- Back ---
  { value: "Deadlift", label: "Deadlift", muscleGroup: "Back" },
  { value: "Lat Pulldown", label: "Lat Pulldown", muscleGroup: "Back" },
  { value: "Barbell Row", label: "Barbell Row", muscleGroup: "Back" },
  { value: "Seated Cable Row", label: "Seated Cable Row", muscleGroup: "Back" },
  { value: "Pull-up", label: "Pull-up", muscleGroup: "Back" },
  { value: "T-Bar Row", label: "T-Bar Row", muscleGroup: "Back" },
  {
    value: "Single-Arm Dumbbell Row",
    label: "Single-Arm Dumbbell Row",
    muscleGroup: "Back",
  },
  { value: "Chin-up", label: "Chin-up", muscleGroup: "Back" },
  {
    value: "Straight-Arm Pulldown",
    label: "Straight-Arm Pulldown",
    muscleGroup: "Back",
  },
  { value: "Rack Pull", label: "Rack Pull", muscleGroup: "Back" },
  { value: "Hyperextension", label: "Hyperextension", muscleGroup: "Back" },
  { value: "Good Morning", label: "Good Morning", muscleGroup: "Back" },

  // --- Shoulders ---
  {
    value: "Shoulder Press",
    label: "Shoulder Press",
    muscleGroup: "Shoulders",
  },
  { value: "Lateral Raise", label: "Lateral Raise", muscleGroup: "Shoulders" },
  { value: "Front Raise", label: "Front Raise", muscleGroup: "Shoulders" },
  { value: "Rear Delt Fly", label: "Rear Delt Fly", muscleGroup: "Shoulders" },
  { value: "Face Pull", label: "Face Pull", muscleGroup: "Shoulders" },
  { value: "Arnold Press", label: "Arnold Press", muscleGroup: "Shoulders" },
  { value: "Upright Row", label: "Upright Row", muscleGroup: "Shoulders" },
  {
    value: "Cable Lateral Raise",
    label: "Cable Lateral Raise",
    muscleGroup: "Shoulders",
  },
  {
    value: "Reverse Pec Deck",
    label: "Reverse Pec Deck",
    muscleGroup: "Shoulders",
  },

  // --- Traps ---
  { value: "Barbell Shrug", label: "Barbell Shrug", muscleGroup: "Traps" },
  { value: "Dumbbell Shrug", label: "Dumbbell Shrug", muscleGroup: "Traps" },
  { value: "Face Pull", label: "Face Pull", muscleGroup: "Traps" },
  { value: "Upright Row", label: "Upright Row", muscleGroup: "Traps" },
  { value: "Farmer Walk", label: "Farmer Walk", muscleGroup: "Traps" },

  // --- Biceps ---
  { value: "Biceps Curl", label: "Biceps Curl", muscleGroup: "Biceps" },
  { value: "Hammer Curl", label: "Hammer Curl", muscleGroup: "Biceps" },
  { value: "Preacher Curl", label: "Preacher Curl", muscleGroup: "Biceps" },
  {
    value: "Concentration Curl",
    label: "Concentration Curl",
    muscleGroup: "Biceps",
  },
  {
    value: "Incline Dumbbell Curl",
    label: "Incline Dumbbell Curl",
    muscleGroup: "Biceps",
  },
  { value: "Cable Curl", label: "Cable Curl", muscleGroup: "Biceps" },
  { value: "Zottman Curl", label: "Zottman Curl", muscleGroup: "Biceps" },
  { value: "Spider Curl", label: "Spider Curl", muscleGroup: "Biceps" },

  // --- Triceps ---
  {
    value: "Triceps Extension",
    label: "Triceps Extension",
    muscleGroup: "Triceps",
  },
  {
    value: "Tricep Pushdown",
    label: "Tricep Pushdown",
    muscleGroup: "Triceps",
  },
  { value: "Skull Crusher", label: "Skull Crusher", muscleGroup: "Triceps" },
  {
    value: "Close-Grip Bench Press",
    label: "Close-Grip Bench Press",
    muscleGroup: "Triceps",
  },
  {
    value: "Overhead Cable Extension",
    label: "Overhead Cable Extension",
    muscleGroup: "Triceps",
  },
  {
    value: "Tricep Kickback",
    label: "Tricep Kickback",
    muscleGroup: "Triceps",
  },
  { value: "Tricep Dip", label: "Tricep Dip", muscleGroup: "Triceps" },

  // --- Legs ---
  { value: "Squat", label: "Squat", muscleGroup: "Legs" },
  { value: "Leg Press", label: "Leg Press", muscleGroup: "Legs" },
  {
    value: "Romanian Deadlift",
    label: "Romanian Deadlift",
    muscleGroup: "Legs",
  },
  {
    value: "Bulgarian Split Squat",
    label: "Bulgarian Split Squat",
    muscleGroup: "Legs",
  },
  { value: "Leg Extension", label: "Leg Extension", muscleGroup: "Legs" },
  { value: "Hamstring Curl", label: "Hamstring Curl", muscleGroup: "Legs" },
  { value: "Calf Raise", label: "Calf Raise", muscleGroup: "Legs" },
  { value: "Front Squat", label: "Front Squat", muscleGroup: "Legs" },
  { value: "Goblet Squat", label: "Goblet Squat", muscleGroup: "Legs" },
  { value: "Hack Squat", label: "Hack Squat", muscleGroup: "Legs" },
  { value: "Hip Thrust", label: "Hip Thrust", muscleGroup: "Legs" },
  { value: "Glute Bridge", label: "Glute Bridge", muscleGroup: "Legs" },
  { value: "Walking Lunge", label: "Walking Lunge", muscleGroup: "Legs" },
  { value: "Step-up", label: "Step-up", muscleGroup: "Legs" },
  {
    value: "Seated Calf Raise",
    label: "Seated Calf Raise",
    muscleGroup: "Legs",
  },

  // --- Core & Abs ---
  { value: "Crunch", label: "Crunch", muscleGroup: "Core" },
  { value: "Plank", label: "Plank", muscleGroup: "Core" },
  {
    value: "Hanging Leg Raise",
    label: "Hanging Leg Raise",
    muscleGroup: "Core",
  },
  { value: "Russian Twist", label: "Russian Twist", muscleGroup: "Core" },
  { value: "Bicycle Crunch", label: "Bicycle Crunch", muscleGroup: "Core" },
  { value: "Ab Wheel Rollout", label: "Ab Wheel Rollout", muscleGroup: "Core" },
  {
    value: "Mountain Climbers",
    label: "Mountain Climbers",
    muscleGroup: "Core",
  },
  { value: "Dead Bug", label: "Dead Bug", muscleGroup: "Core" },
  { value: "Side Plank", label: "Side Plank", muscleGroup: "Core" },

  // --- Other ---
  { value: "Other", label: "Other", muscleGroup: "Other" },
];

function openWorkoutDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(WORKOUT_DB_NAME, WORKOUT_DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(WORKOUT_STORE)) {
        const store = db.createObjectStore(WORKOUT_STORE, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt");
        store.createIndex("exercise", "exercise");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function readWorkouts() {
  return new Promise((resolve, reject) => {
    const request = workoutDb
      .transaction(WORKOUT_STORE, "readonly")
      .objectStore(WORKOUT_STORE)
      .getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

function writeWorkout(workout) {
  return new Promise((resolve, reject) => {
    const request = workoutDb
      .transaction(WORKOUT_STORE, "readwrite")
      .objectStore(WORKOUT_STORE)
      .put(workout);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function removeWorkout(id) {
  return new Promise((resolve, reject) => {
    const request = workoutDb
      .transaction(WORKOUT_STORE, "readwrite")
      .objectStore(WORKOUT_STORE)
      .delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function removeAllWorkouts() {
  return new Promise((resolve, reject) => {
    const request = workoutDb
      .transaction(WORKOUT_STORE, "readwrite")
      .objectStore(WORKOUT_STORE)
      .clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function dayKey(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getChallengeStartKey() {
  const savedStart = localStorage.getItem(CHALLENGE_STORAGE_KEY);
  if (savedStart) return savedStart;
  if (!workoutEntries.length) return null;
  const earliestWorkout = workoutEntries.reduce((earliest, entry) =>
    new Date(entry.createdAt) < new Date(earliest.createdAt) ? entry : earliest,
  );
  const inferredStart = dayKey(earliestWorkout.createdAt);
  localStorage.setItem(CHALLENGE_STORAGE_KEY, inferredStart);
  return inferredStart;
}

function getChallengeData() {
  const startKey = getChallengeStartKey();
  if (!startKey) return null;
  const startDate = new Date(`${startKey}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const elapsedDays = Math.max(
    1,
    Math.floor((today - startDate) / 86400000) + 1,
  );
  const workoutDays = new Set(
    workoutEntries.map((entry) => dayKey(entry.createdAt)),
  );
  const completedDays = [...workoutDays].filter((key) => {
    const date = new Date(`${key}T00:00:00`);
    return date >= startDate && date <= today;
  }).length;
  let streak = 0;
  const streakDate = new Date(today);
  if (!workoutDays.has(dayKey(streakDate))) {
    streakDate.setDate(streakDate.getDate() - 1);
  }
  while (streakDate >= startDate && workoutDays.has(dayKey(streakDate))) {
    streak += 1;
    streakDate.setDate(streakDate.getDate() - 1);
  }
  return {
    elapsedDays: Math.min(CHALLENGE_LENGTH, elapsedDays),
    completedDays,
    streak,
    todayComplete: workoutDays.has(dayKey(today)),
    complete: elapsedDays >= CHALLENGE_LENGTH,
  };
}

function renderChallenge() {
  const challenge = getChallengeData();
  const dayValue = document.getElementById("challengeDayValue");
  const streakValue = document.getElementById("challengeStreakValue");
  const workoutsValue = document.getElementById("challengeWorkoutsValue");
  const progressBar = document.getElementById("challengeProgressBar");
  const progressTrack = document.getElementById("challengeProgressTrack");
  const message = document.getElementById("challengeMessage");
  const action = document.getElementById("challengeAction");
  if (
    !dayValue ||
    !streakValue ||
    !workoutsValue ||
    !progressBar ||
    !progressTrack ||
    !message ||
    !action
  )
    return;

  if (!challenge) {
    dayValue.textContent = "Ready";
    streakValue.textContent = "0 days";
    workoutsValue.textContent = "0 / 90";
    progressBar.style.width = "0%";
    progressTrack.setAttribute("aria-valuenow", "0");
    message.textContent =
      "Your first workout starts the 90-day clock. Make today count.";
    action.textContent = "Start with a workout";
    action.dataset.state = "start";
    return;
  }

  const progress = Math.min(
    100,
    (challenge.elapsedDays / CHALLENGE_LENGTH) * 100,
  );
  dayValue.textContent = challenge.complete
    ? "Complete"
    : `Day ${challenge.elapsedDays} / ${CHALLENGE_LENGTH}`;
  streakValue.textContent = `${challenge.streak} day${challenge.streak === 1 ? "" : "s"}`;
  workoutsValue.textContent = `${Math.min(CHALLENGE_LENGTH, challenge.completedDays)} / ${CHALLENGE_LENGTH}`;
  progressBar.style.width = `${progress}%`;
  progressTrack.setAttribute("aria-valuenow", progress.toFixed(1));
  if (challenge.complete) {
    message.textContent = "90 days complete. You built a lasting routine.";
    action.textContent = "Start a new challenge";
    action.dataset.state = "restart";
  } else if (challenge.todayComplete) {
    message.textContent = `${challenge.streak} day${challenge.streak === 1 ? "" : "s"} in a row. Today's work is complete.`;
    action.textContent = "Log today's workout";
    action.dataset.state = "view";
  } else if (challenge.streak) {
    message.textContent = `Your ${challenge.streak}-day streak is ready for today's workout.`;
    action.textContent = "Log today's workout";
    action.dataset.state = "log";
  } else {
    message.textContent =
      "A new day is a clear opportunity to keep the challenge moving.";
    action.textContent = "Log today's workout";
    action.dataset.state = "log";
  }
}

function formatWorkoutDate(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function currentRangeEntries() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - selectedRange + 1);
  return workoutEntries.filter((entry) => new Date(entry.createdAt) >= start);
}

function setWorkoutStatus(message, error = true) {
  const status = document.getElementById("workoutStatus");
  status.textContent = message;
  status.style.color = error ? "#a45e4c" : "#1f6b5b";
}

function renderExerciseOptions() {
  const suggestions = document.getElementById("exerciseSuggestions");
  const input = document.getElementById("exerciseName");
  const query = input.value.trim().toLowerCase();
  const matches = EXERCISE_OPTIONS.filter(
    (option) => option.value && option.label.toLowerCase().includes(query),
  );
  suggestions.innerHTML = matches
    .map(
      (option) =>
        `<button type="button" class="exerciseSuggestion" data-exercise="${option.value}" role="option">${option.label}<small>Tap to select this exercise</small></button>`,
    )
    .join("");
  suggestions.classList.toggle(
    "is-visible",
    matches.length > 0 && document.activeElement === input,
  );
}

function renderWorkoutList() {
  const entries = currentRangeEntries().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  const list = document.getElementById("workoutList");
  list.innerHTML = entries.length
    ? entries
        .map(
          (entry) => `
        <div class="workoutRow">
            <div class="workoutName"><strong>${entry.exercise}</strong><small>${formatWorkoutDate(entry.createdAt)}</small></div>
            <span>${entry.reps}</span><span>${entry.weight.toFixed(1)} kg</span><span>${entry.volume.toFixed(1)} kg</span>
            <button type="button" class="deleteWorkout" data-id="${entry.id}" data-exercise="${entry.exercise}" aria-label="Delete ${entry.exercise}"><i class="fa-solid fa-xmark"></i></button>
        </div>`,
        )
        .join("")
    : '<div class="emptyState">No workouts in this period.</div>';
  document.getElementById("sessionCount").textContent = entries.length;
  document.getElementById("repCount").textContent = entries.reduce(
    (sum, entry) => sum + entry.reps,
    0,
  );
  document.getElementById("volumeCount").textContent =
    `${entries.reduce((sum, entry) => sum + entry.volume, 0).toFixed(1)} kg`;
}

function renderWorkoutCalendar() {
  const monthLabel = document.getElementById("calendarMonth");
  const grid = document.getElementById("workoutCalendarGrid");
  if (!monthLabel || !grid) return;

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = dayKey(new Date());
  const workoutDays = new Map();

  workoutEntries.forEach((entry) => {
    const key = dayKey(entry.createdAt);
    workoutDays.set(key, (workoutDays.get(key) || 0) + 1);
  });

  monthLabel.textContent = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(calendarMonth);

  const cells = [];
  for (let index = 0; index < firstDay; index += 1) {
    cells.push(
      '<div class="calendarDay calendarDayEmpty" aria-hidden="true"></div>',
    );
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const key = dayKey(date);
    const workoutCount = workoutDays.get(key) || 0;
    const classes = ["calendarDay"];
    if (key === todayKey) classes.push("calendarDayToday");
    if (workoutCount) classes.push("calendarDayWorkout");
    cells.push(`
      <div class="${classes.join(" ")}"${workoutCount ? ` title="${workoutCount} workout${workoutCount === 1 ? "" : "s"}"` : ""}>
        <span class="calendarDate">${day}</span>
        ${workoutCount ? '<i class="fa-solid fa-dumbbell calendarWorkoutIcon" aria-label="Workout completed"></i>' : ""}
      </div>`);
  }
  grid.innerHTML = cells.join("");
}

function refreshExerciseOptions() {
  const select = document.getElementById("chartExercise");
  const current = select.value;
  const names = [
    ...new Set(workoutEntries.map((entry) => entry.exercise)),
  ].sort();
  select.innerHTML =
    '<option value="all">All workouts</option>' +
    names.map((name) => `<option value="${name}">${name}</option>`).join("");
  select.value = names.includes(current) || current === "all" ? current : "all";
}

function chartEntries() {
  const selected = document.getElementById("chartExercise").value;
  const today = new Date();
  const entries = workoutEntries.filter(
    (entry) => selected === "all" || entry.exercise === selected,
  );
  let currentWeight = 0;
  const values = [];
  for (let offset = selectedRange - 1; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    const key = dayKey(date);
    const dayEntries = entries.filter(
      (entry) => dayKey(entry.createdAt) === key,
    );
    const latest = dayEntries.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    )[0];
    if (latest) currentWeight = latest.weight;
    values.push({
      date,
      weight: currentWeight,
      volume: dayEntries.reduce((sum, entry) => sum + entry.volume, 0),
    });
  }
  return values;
}

function drawOverloadChart(data) {
  const canvas = document.getElementById("overloadChart");
  const context = canvas.getContext("2d");
  const width = canvas.clientWidth || 600;
  const height = canvas.clientHeight || 300;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  const pad = { top: 28, right: 18, bottom: 42, left: 46 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const maxValue = Math.max(
    10,
    ...data.map((item) => Math.max(item.weight, item.volume / 10)),
  );
  context.font = "11px Segoe UI, sans-serif";
  context.strokeStyle = "#e3ebe6";
  context.fillStyle = "#687873";
  for (let tick = 0; tick <= 4; tick += 1) {
    const y = pad.top + chartHeight - (chartHeight * tick) / 4;
    context.beginPath();
    context.moveTo(pad.left, y);
    context.lineTo(width - pad.right, y);
    context.stroke();
    context.fillText(Math.round((maxValue * tick) / 4), 8, y + 4);
  }
  function line(key, color, scale = 1) {
    context.beginPath();
    let drawing = false;
    data.forEach((item, index) => {
      if (item[key] === null) {
        drawing = false;
        return;
      }
      const x = pad.left + (chartWidth * index) / Math.max(1, data.length - 1);
      const y =
        pad.top + chartHeight - (chartHeight * item[key] * scale) / maxValue;
      drawing ? context.lineTo(x, y) : context.moveTo(x, y);
      drawing = true;
    });
    context.strokeStyle = color;
    context.lineWidth = 2.5;
    context.stroke();
  }
  line("weight", "#1f6b5b");
  line("volume", "#b58b45", 0.1);
  data.forEach((item, index) => {
    const x = pad.left + (chartWidth * index) / Math.max(1, data.length - 1);
    if (item.weight !== null) {
      const y = pad.top + chartHeight - (chartHeight * item.weight) / maxValue;
      context.fillStyle = "#1f6b5b";
      context.beginPath();
      context.arc(x, y, 3.5, 0, Math.PI * 2);
      context.fill();
    }
    if (item.volume > 0) {
      const y =
        pad.top + chartHeight - (chartHeight * item.volume * 0.1) / maxValue;
      context.fillStyle = "#b58b45";
      context.beginPath();
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fill();
    }
  });

  const labelStep =
    data.length > 30
      ? Math.ceil(data.length / 6)
      : data.length > 15
        ? 3
        : data.length > 8
          ? 2
          : 1;
  context.fillStyle = "#687873";
  let lastLabelRight = -Infinity;
  data.forEach((item, index) => {
    if (index % labelStep !== 0 && index !== data.length - 1) return;
    const x = pad.left + (chartWidth * index) / Math.max(1, data.length - 1);
    const label = new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
    }).format(item.date);
    const labelWidth = context.measureText(label).width;
    const left = x - labelWidth / 2;
    const right = x + labelWidth / 2;
    if (left <= lastLabelRight + 8 && index !== data.length - 1) return;
    context.fillText(label, left, height - 12);
    lastLabelRight = right;
  });
  context.fillStyle = "#1f6b5b";
  context.fillRect(width - 178, 12, 12, 3);
  context.fillStyle = "#24332f";
  context.fillText("Weight kg", width - 160, 16);
  context.fillStyle = "#b58b45";
  context.fillRect(width - 86, 12, 12, 3);
  context.fillStyle = "#24332f";
  context.fillText("Volume / 10", width - 68, 16);
}

function renderProgress() {
  const data = chartEntries();
  drawOverloadChart(data);
  const measured = data.filter((item) => item.weight !== null);
  const first = measured[0];
  const last = measured[measured.length - 1];
  document.getElementById("weightProgress").textContent =
    first && last
      ? `${last.weight > first.weight ? "Up" : last.weight < first.weight ? "Down" : "Steady"}: ${first.weight.toFixed(1)} kg to ${last.weight.toFixed(1)} kg.`
      : "Add workouts to see your progress.";
  document.getElementById("volumeProgress").textContent =
    first && last
      ? `${last.volume > first.volume ? "Up" : last.volume < first.volume ? "Down" : "Steady"}: latest tracked volume is ${last.volume.toFixed(1)} kg.`
      : "Add workouts to see your progress.";
}

async function refreshWorkoutDashboard() {
  workoutEntries = await readWorkouts();
  refreshExerciseOptions();
  renderWorkoutList();
  renderWorkoutCalendar();
  renderChallenge();
  renderProgress();
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    workoutDb = await openWorkoutDatabase();
    renderExerciseOptions();
    const exerciseName = document.getElementById("exerciseName");
    const exerciseSuggestions = document.getElementById("exerciseSuggestions");
    exerciseName.addEventListener("focus", function () {
      renderExerciseOptions();
    });
    exerciseName.addEventListener("input", function () {
      renderExerciseOptions();
    });
    exerciseName.addEventListener("blur", function () {
      setTimeout(() => exerciseSuggestions.classList.remove("is-visible"), 150);
    });
    exerciseSuggestions.addEventListener("click", function (event) {
      const suggestion = event.target.closest(".exerciseSuggestion");
      if (!suggestion) return;
      exerciseName.value = suggestion.dataset.exercise;
      exerciseName.dispatchEvent(new Event("input", { bubbles: true }));
      exerciseName.focus();
    });
    document
      .getElementById("workoutForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        const selected = document.getElementById("exerciseName").value;
        const custom = document.getElementById("customExercise").value.trim();
        const exercise = custom || selected;
        const reps = Number(document.getElementById("workoutReps").value);
        const weight = Number(document.getElementById("workoutWeight").value);
        if (!exercise || !reps || reps <= 0 || weight < 0) {
          setWorkoutStatus(
            "Choose an exercise and enter valid repetitions and weight.",
          );
          return;
        }
        await writeWorkout({
          id: crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
          exercise,
          reps,
          weight,
          volume: reps * weight,
          createdAt: new Date().toISOString(),
        });
        if (!localStorage.getItem(CHALLENGE_STORAGE_KEY)) {
          localStorage.setItem(CHALLENGE_STORAGE_KEY, dayKey(new Date()));
        }
        this.reset();
        setWorkoutStatus(
          "Workout saved with the current date and time.",
          false,
        );
        await refreshWorkoutDashboard();
      });
    document
      .getElementById("challengeAction")
      .addEventListener("click", function () {
        if (this.dataset.state === "restart") {
          localStorage.setItem(CHALLENGE_STORAGE_KEY, dayKey(new Date()));
          refreshWorkoutDashboard();
          return;
        }
        document.getElementById("exerciseName").focus();
        document
          .getElementById("workoutForm")
          .scrollIntoView({ behavior: "smooth", block: "center" });
      });
    document
      .getElementById("workoutList")
      .addEventListener("click", async function (event) {
        const button = event.target.closest(".deleteWorkout");
        if (
          !button ||
          !confirm(`Delete this ${button.dataset.exercise} workout?`)
        )
          return;
        await removeWorkout(button.dataset.id);
        await refreshWorkoutDashboard();
      });
    document
      .getElementById("deleteAllWorkouts")
      .addEventListener("click", async function () {
        if (!workoutEntries.length || !confirm("Delete all saved workouts?"))
          return;
        if (
          !confirm(
            "This will permanently delete your complete workout history. Continue?",
          )
        )
          return;
        await removeAllWorkouts();
        localStorage.removeItem(CHALLENGE_STORAGE_KEY);
        setWorkoutStatus("All workouts deleted.", false);
        await refreshWorkoutDashboard();
      });
    document
      .getElementById("previousCalendarMonth")
      .addEventListener("click", function () {
        calendarMonth = new Date(
          calendarMonth.getFullYear(),
          calendarMonth.getMonth() - 1,
          1,
        );
        renderWorkoutCalendar();
      });
    document
      .getElementById("nextCalendarMonth")
      .addEventListener("click", function () {
        calendarMonth = new Date(
          calendarMonth.getFullYear(),
          calendarMonth.getMonth() + 1,
          1,
        );
        renderWorkoutCalendar();
      });
    document.querySelectorAll(".rangeButtons .rangeButton").forEach((button) =>
      button.addEventListener("click", function () {
        if (!this.dataset.range) return;
        selectedRange = Number(this.dataset.range);
        document
          .querySelectorAll(".rangeButtons .rangeButton")
          .forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
        renderWorkoutList();
        renderProgress();
      }),
    );
    document
      .getElementById("chartExercise")
      .addEventListener("change", renderProgress);
    window.addEventListener("resize", renderProgress);
    await refreshWorkoutDashboard();
  } catch (error) {
    console.error("Unable to initialize workout tracker:", error);
    setWorkoutStatus("Workout storage is unavailable in this browser.");
  }
});
