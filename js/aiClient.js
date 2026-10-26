// Function to fetch the entire health state from IndexedDB
async function gatherUserHealthData() {
  // 1. Read Profile from IndexedDB
  const profile = await new Promise((resolve) => {
    const req = indexedDB.open("elateFitUserProfileDB", 1);
    req.onsuccess = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("profiles")) return resolve(null);
      const getReq = db
        .transaction("profiles", "readonly")
        .objectStore("profiles")
        .get("profile");
      getReq.onsuccess = () => resolve(getReq.result || null);
      getReq.onerror = () => resolve(null);
    };
    req.onerror = () => resolve(null);
  });

  // 2. Read Recent Nutrition Entries (e.g. past 7 days)
  const meals = await new Promise((resolve) => {
    const req = indexedDB.open("elateFitNutritionDB");
    req.onsuccess = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("foodEntries")) return resolve([]);
      const getReq = db
        .transaction("foodEntries", "readonly")
        .objectStore("foodEntries")
        .getAll();
      getReq.onsuccess = () => resolve(getReq.result || []);
      getReq.onerror = () => resolve([]);
    };
    req.onerror = () => resolve([]);
  });

  // 3. Read Recent Workouts & LocalStorage Tracker Streaks
  const workouts = await new Promise((resolve) => {
    const req = indexedDB.open("elateFitWorkoutDB");
    req.onsuccess = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("workouts")) return resolve([]);
      const getReq = db
        .transaction("workouts", "readonly")
        .objectStore("workouts")
        .getAll();
      getReq.onsuccess = () => resolve(getReq.result || []);
      getReq.onerror = () => resolve([]);
    };
    req.onerror = () => resolve([]);
  });

  const cardioDays = JSON.parse(
    localStorage.getItem("elateFitCardioCompletedDays") || "[]",
  );
  const stretchDays = JSON.parse(
    localStorage.getItem("elateFitStretchCompletedDays") || "[]",
  );

  return {
    profile,
    recentMeals: meals.slice(-20), // Send last 20 logged meals to keep payload light
    recentWorkouts: workouts.slice(-10),
    habits: {
      cardioCompletions: cardioDays.length,
      stretchCompletions: stretchDays.length,
    },
  };
}

// Trigger analysis and receive AI feedback
async function requestAiHealthInsights() {
  const payload = await gatherUserHealthData();

  if (!payload.profile) {
    alert("Please complete your profile before generating AI insights.");
    return;
  }

  const response = await fetch("/api/ai_coach.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  if (result.status === "success") {
    console.log("AI Recommendations:", result.ai_advice);
    // Display result.ai_advice on your webpage
  }
}
