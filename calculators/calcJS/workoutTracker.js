const WORKOUT_DB_NAME = "elateFitWorkoutDB";
const WORKOUT_DB_VERSION = 1;
const WORKOUT_STORE = "workouts";
let workoutDb;
let workoutEntries = [];
let selectedRange = 7;
const EXERCISE_OPTIONS = [
    { value: "", label: "Choose an exercise" },
    { value: "Shoulder Press", label: "Shoulder Press" },
    { value: "Biceps Curl", label: "Biceps Curl" },
    { value: "Bench Press", label: "Bench Press" },
    { value: "Squat", label: "Squat" },
    { value: "Deadlift", label: "Deadlift" },
    { value: "Lat Pulldown", label: "Lat Pulldown" },
    { value: "Leg Press", label: "Leg Press" },
    { value: "Triceps Extension", label: "Triceps Extension" },
    { value: "Other", label: "Other" }
];

function openWorkoutDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(WORKOUT_DB_NAME, WORKOUT_DB_VERSION);
        request.onupgradeneeded = event => {
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
        const request = workoutDb.transaction(WORKOUT_STORE, "readonly").objectStore(WORKOUT_STORE).getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

function writeWorkout(workout) {
    return new Promise((resolve, reject) => {
        const request = workoutDb.transaction(WORKOUT_STORE, "readwrite").objectStore(WORKOUT_STORE).put(workout);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function removeWorkout(id) {
    return new Promise((resolve, reject) => {
        const request = workoutDb.transaction(WORKOUT_STORE, "readwrite").objectStore(WORKOUT_STORE).delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function removeAllWorkouts() {
    return new Promise((resolve, reject) => {
        const request = workoutDb.transaction(WORKOUT_STORE, "readwrite").objectStore(WORKOUT_STORE).clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function dayKey(value) {
    const date = new Date(value);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatWorkoutDate(value) {
    const date = new Date(value);
    return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
}

function currentRangeEntries() {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - selectedRange + 1);
    return workoutEntries.filter(entry => new Date(entry.createdAt) >= start);
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
    const matches = EXERCISE_OPTIONS.filter(option => option.value && option.label.toLowerCase().includes(query));
    suggestions.innerHTML = matches.map(option => `<button type="button" class="exerciseSuggestion" data-exercise="${option.value}" role="option">${option.label}<small>Tap to select this exercise</small></button>`).join("");
    suggestions.classList.toggle("is-visible", matches.length > 0 && document.activeElement === input);
}

function renderWorkoutList() {
    const entries = currentRangeEntries().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const list = document.getElementById("workoutList");
    list.innerHTML = entries.length ? entries.map(entry => `
        <div class="workoutRow">
            <div class="workoutName"><strong>${entry.exercise}</strong><small>${formatWorkoutDate(entry.createdAt)}</small></div>
            <span>${entry.reps}</span><span>${entry.weight.toFixed(1)} kg</span><span>${entry.volume.toFixed(1)} kg</span>
            <button type="button" class="deleteWorkout" data-id="${entry.id}" data-exercise="${entry.exercise}" aria-label="Delete ${entry.exercise}"><i class="fa-solid fa-xmark"></i></button>
        </div>`).join("") : '<div class="emptyState">No workouts in this period.</div>';
    document.getElementById("sessionCount").textContent = entries.length;
    document.getElementById("repCount").textContent = entries.reduce((sum, entry) => sum + entry.reps, 0);
    document.getElementById("volumeCount").textContent = `${entries.reduce((sum, entry) => sum + entry.volume, 0).toFixed(1)} kg`;
}

function refreshExerciseOptions() {
    const select = document.getElementById("chartExercise");
    const current = select.value;
    const names = [...new Set(workoutEntries.map(entry => entry.exercise))].sort();
    select.innerHTML = '<option value="all">All workouts</option>' + names.map(name => `<option value="${name}">${name}</option>`).join("");
    select.value = names.includes(current) || current === "all" ? current : "all";
}

function chartEntries() {
    const selected = document.getElementById("chartExercise").value;
    const entries = currentRangeEntries().filter(entry => selected === "all" || entry.exercise === selected);
    const grouped = {};
    entries.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).forEach(entry => {
        const key = dayKey(entry.createdAt);
        if (!grouped[key]) grouped[key] = { date: new Date(entry.createdAt), weight: 0, volume: 0 };
        grouped[key].weight = Math.max(grouped[key].weight, entry.weight);
        grouped[key].volume += entry.volume;
    });
    return Object.values(grouped);
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
    const maxValue = Math.max(10, ...data.map(item => Math.max(item.weight, item.volume / 10)));
    context.font = "11px Segoe UI, sans-serif";
    context.strokeStyle = "#e3ebe6";
    context.fillStyle = "#687873";
    for (let tick = 0; tick <= 4; tick += 1) {
        const y = pad.top + chartHeight - chartHeight * tick / 4;
        context.beginPath(); context.moveTo(pad.left, y); context.lineTo(width - pad.right, y); context.stroke();
        context.fillText(Math.round(maxValue * tick / 4), 8, y + 4);
    }
    function line(key, color, scale = 1) {
        context.beginPath();
        data.forEach((item, index) => {
            const x = pad.left + chartWidth * index / Math.max(1, data.length - 1);
            const y = pad.top + chartHeight - chartHeight * item[key] * scale / maxValue;
            index ? context.lineTo(x, y) : context.moveTo(x, y);
        });
        context.strokeStyle = color; context.lineWidth = 2.5; context.stroke();
    }
    line("weight", "#1f6b5b");
    line("volume", "#b58b45", 0.1);
    data.forEach((item, index) => {
        const x = pad.left + chartWidth * index / Math.max(1, data.length - 1);
        const y = pad.top + chartHeight - chartHeight * item.weight / maxValue;
        context.fillStyle = "#1f6b5b"; context.beginPath(); context.arc(x, y, 3, 0, Math.PI * 2); context.fill();
        if (data.length <= 8 || index % Math.ceil(data.length / 6) === 0 || index === data.length - 1) {
            context.fillStyle = "#687873"; context.fillText(new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(item.date), x - 16, height - 12);
        }
    });
    context.fillStyle = "#1f6b5b"; context.fillRect(width - 178, 12, 12, 3); context.fillStyle = "#24332f"; context.fillText("Weight kg", width - 160, 16);
    context.fillStyle = "#b58b45"; context.fillRect(width - 86, 12, 12, 3); context.fillStyle = "#24332f"; context.fillText("Volume / 10", width - 68, 16);
}

function renderProgress() {
    const data = chartEntries();
    drawOverloadChart(data);
    const first = data[0];
    const last = data[data.length - 1];
    document.getElementById("weightProgress").textContent = first && last ? `${last.weight > first.weight ? "Up" : last.weight < first.weight ? "Down" : "Steady"}: ${first.weight.toFixed(1)} kg to ${last.weight.toFixed(1)} kg.` : "Add workouts to see your progress.";
    document.getElementById("volumeProgress").textContent = first && last ? `${last.volume > first.volume ? "Up" : last.volume < first.volume ? "Down" : "Steady"}: latest tracked volume is ${last.volume.toFixed(1)} kg.` : "Add workouts to see your progress.";
}

async function refreshWorkoutDashboard() {
    workoutEntries = await readWorkouts();
    refreshExerciseOptions();
    renderWorkoutList();
    renderProgress();
}

document.addEventListener("DOMContentLoaded", async function() {
    try {
        workoutDb = await openWorkoutDatabase();
        renderExerciseOptions();
        const exerciseName = document.getElementById("exerciseName");
        const exerciseSuggestions = document.getElementById("exerciseSuggestions");
        exerciseName.addEventListener("focus", function() {
            renderExerciseOptions();
        });
        exerciseName.addEventListener("input", function() {
            renderExerciseOptions();
        });
        exerciseName.addEventListener("blur", function() {
            setTimeout(() => exerciseSuggestions.classList.remove("is-visible"), 150);
        });
        exerciseSuggestions.addEventListener("click", function(event) {
            const suggestion = event.target.closest(".exerciseSuggestion");
            if (!suggestion) return;
            exerciseName.value = suggestion.dataset.exercise;
            exerciseName.dispatchEvent(new Event("input", { bubbles: true }));
            exerciseName.focus();
        });
        document.getElementById("workoutForm").addEventListener("submit", async function(event) {
            event.preventDefault();
            const selected = document.getElementById("exerciseName").value;
            const custom = document.getElementById("customExercise").value.trim();
            const exercise = custom || selected;
            const reps = Number(document.getElementById("workoutReps").value);
            const weight = Number(document.getElementById("workoutWeight").value);
            if (!exercise || !reps || reps <= 0 || weight < 0) { setWorkoutStatus("Choose an exercise and enter valid repetitions and weight."); return; }
            await writeWorkout({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, exercise, reps, weight, volume: reps * weight, createdAt: new Date().toISOString() });
            this.reset(); setWorkoutStatus("Workout saved with the current date and time.", false); await refreshWorkoutDashboard();
        });
        document.getElementById("workoutList").addEventListener("click", async function(event) {
            const button = event.target.closest(".deleteWorkout");
            if (!button || !confirm(`Delete this ${button.dataset.exercise} workout?`)) return;
            await removeWorkout(button.dataset.id); await refreshWorkoutDashboard();
        });
        document.getElementById("deleteAllWorkouts").addEventListener("click", async function() {
            if (!workoutEntries.length || !confirm("Delete all saved workouts?")) return;
            if (!confirm("This will permanently delete your complete workout history. Continue?")) return;
            await removeAllWorkouts(); setWorkoutStatus("All workouts deleted.", false); await refreshWorkoutDashboard();
        });
        document.querySelectorAll(".rangeButton").forEach(button => button.addEventListener("click", function() {
            if (!this.dataset.range) return;
            selectedRange = Number(this.dataset.range);
            document.querySelectorAll(".rangeButton").forEach(item => item.classList.remove("active")); this.classList.add("active");
            renderWorkoutList(); renderProgress();
        }));
        document.getElementById("chartExercise").addEventListener("change", renderProgress);
        window.addEventListener("resize", renderProgress);
        await refreshWorkoutDashboard();
    } catch (error) { console.error("Unable to initialize workout tracker:", error); setWorkoutStatus("Workout storage is unavailable in this browser."); }
});
