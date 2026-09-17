const exerciseCatalog = [
    ["Shoulder Press", "Shoulders", "Dumbbell", "Intermediate", "Builds pressing strength through the shoulders and upper arms.", ["Sit or stand tall with the weights at shoulder height.", "Press the weights overhead without locking the elbows.", "Lower with control and repeat."]],
    ["Lateral Raise", "Shoulders", "Dumbbell", "Beginner", "Targets the side deltoids for stronger, broader shoulders.", ["Stand with weights beside your thighs.", "Raise your arms until they are level with your shoulders.", "Lower slowly without swinging."]],
    ["Biceps Curl", "Biceps", "Dumbbell", "Beginner", "A simple isolation exercise for the front of the upper arm.", ["Keep elbows close to your sides.", "Curl the weights toward your shoulders.", "Lower fully while keeping tension."]],
    ["Hammer Curl", "Biceps", "Dumbbell", "Beginner", "Works the biceps and forearms with a neutral grip.", ["Hold the dumbbells with palms facing inward.", "Curl without rotating your wrists.", "Lower under control."]],
    ["Bench Press", "Chest", "Barbell", "Intermediate", "Develops pressing strength across the chest, shoulders, and triceps.", ["Set your eyes below the bar and plant your feet.", "Lower the bar toward the middle of your chest.", "Press upward while keeping your wrists steady."]],
    ["Push-up", "Chest", "Bodyweight", "Beginner", "A versatile bodyweight push that trains the chest and arms.", ["Place hands just wider than shoulder width.", "Lower your body as one unit.", "Push the floor away to return."]],
    ["Triceps Extension", "Triceps", "Dumbbell", "Beginner", "Isolates the back of the upper arms.", ["Hold one dumbbell overhead with both hands.", "Bend your elbows to lower it behind your head.", "Extend your arms without flaring your elbows."]],
    ["Triceps Dip", "Triceps", "Bodyweight", "Intermediate", "Builds triceps strength using controlled bodyweight pressing.", ["Use parallel bars or a stable bench.", "Lower until your elbows reach roughly 90 degrees.", "Press back up without shrugging."]],
    ["Lat Pulldown", "Back", "Cable", "Beginner", "Trains the lats and upper back with a vertical pulling motion.", ["Grip the bar wider than shoulder width.", "Pull it toward your upper chest.", "Return slowly while keeping your torso stable."]],
    ["Deadlift", "Back", "Barbell", "Advanced", "A full-body hinge that develops the posterior chain and back strength.", ["Stand with the bar over your mid-foot.", "Brace your core and hinge to grip the bar.", "Stand tall by driving through the floor."]],
    ["Bodyweight Squat", "Legs", "Bodyweight", "Beginner", "A foundational lower-body movement for strength and mobility.", ["Stand with feet around shoulder width.", "Sit your hips down and back.", "Drive through your feet to stand."]],
    ["Leg Press", "Legs", "Machine", "Intermediate", "Builds lower-body strength with guided machine resistance.", ["Place feet comfortably on the platform.", "Lower with knees tracking over your toes.", "Press without locking your knees."]],
    ["Romanian Deadlift", "Hamstrings", "Dumbbell", "Intermediate", "Strengthens hamstrings and glutes through a controlled hip hinge.", ["Hold weights close to your thighs.", "Push hips back while keeping a soft knee bend.", "Drive hips forward to stand tall."]],
    ["Standing Calf Raise", "Calves", "Bodyweight", "Beginner", "Builds strength and control through the lower leg.", ["Stand tall with support if needed.", "Rise onto the balls of your feet.", "Pause at the top and lower slowly."]]
].map(([name, muscle, equipment, difficulty, description, steps]) => ({ name, muscle, equipment, difficulty, description, steps }));

const FAVORITE_EXERCISES_KEY = "elateFitFavoriteExercises";
let activeMuscle = "All muscles";
let favoriteExercises = loadFavoriteExercises();

function loadFavoriteExercises() {
    try { return JSON.parse(localStorage.getItem(FAVORITE_EXERCISES_KEY) || "[]"); } catch (error) { return []; }
}

function saveFavoriteExercises() { localStorage.setItem(FAVORITE_EXERCISES_KEY, JSON.stringify(favoriteExercises)); }

function renderMuscleTabs() {
    const muscles = ["All muscles", ...new Set(exerciseCatalog.map(exercise => exercise.muscle))];
    document.getElementById("muscleTabs").innerHTML = muscles.map(muscle => `<button type="button" class="muscleTab ${muscle === activeMuscle ? "active" : ""}" data-muscle="${muscle}">${muscle}</button>`).join("");
}

function matchesFilters(exercise) {
    const query = document.getElementById("exerciseSearch").value.trim().toLowerCase();
    const equipment = document.getElementById("equipmentFilter").value;
    const difficulty = document.getElementById("difficultyFilter").value;
    return (activeMuscle === "All muscles" || exercise.muscle === activeMuscle)
        && (!query || `${exercise.name} ${exercise.muscle} ${exercise.equipment}`.toLowerCase().includes(query))
        && (!equipment || exercise.equipment === equipment)
        && (!difficulty || exercise.difficulty === difficulty);
}

function renderExercises() {
    const results = exerciseCatalog.filter(matchesFilters);
    const list = document.getElementById("exerciseGrid");
    document.getElementById("resultCount").textContent = `${results.length} exercise${results.length === 1 ? "" : "s"} found`;
    list.innerHTML = results.length ? results.map(exercise => {
        const favorite = favoriteExercises.includes(exercise.name);
        return `<article class="exerciseCard">
            <div class="exerciseImagePlaceholder">Image space for ${exercise.name}</div>
            <div class="exerciseBody">
                <div class="exerciseHeader"><span class="exerciseName">${exercise.name}</span><button type="button" class="favoriteExercise ${favorite ? "is-favorite" : ""}" data-name="${exercise.name}" aria-label="${favorite ? "Remove" : "Add"} ${exercise.name} ${favorite ? "from" : "to"} favourites"><i class="fa-${favorite ? "solid" : "regular"} fa-heart"></i></button></div>
                <div class="exerciseMeta"><span class="metaPill">${exercise.muscle}</span><span class="metaPill">${exercise.equipment}</span><span class="metaPill">${exercise.difficulty}</span></div>
                <p class="exerciseDescription">${exercise.description}</p>
                <details class="exerciseDetails"><summary>View instructions</summary><ol>${exercise.steps.map(step => `<li>${step}</li>`).join("")}</ol></details>
            </div>
        </article>`;
    }).join("") : '<div class="emptyResults">No exercises match these filters. Try another muscle group or keyword.</div>';
}

document.addEventListener("DOMContentLoaded", function() {
    renderMuscleTabs();
    renderExercises();
    document.getElementById("exerciseSearch").addEventListener("input", renderExercises);
    document.getElementById("equipmentFilter").addEventListener("change", renderExercises);
    document.getElementById("difficultyFilter").addEventListener("change", renderExercises);
    document.getElementById("muscleTabs").addEventListener("click", event => {
        const tab = event.target.closest(".muscleTab");
        if (!tab) return;
        activeMuscle = tab.dataset.muscle;
        renderMuscleTabs();
        renderExercises();
    });
    document.getElementById("exerciseGrid").addEventListener("click", event => {
        const button = event.target.closest(".favoriteExercise");
        if (!button) return;
        const name = button.dataset.name;
        favoriteExercises = favoriteExercises.includes(name) ? favoriteExercises.filter(item => item !== name) : [...favoriteExercises, name];
        saveFavoriteExercises();
        renderExercises();
    });
});
