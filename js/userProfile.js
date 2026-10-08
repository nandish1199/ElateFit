const PROFILE_DB_NAME = "elateFitUserProfileDB";
const PROFILE_STORE_NAME = "profiles";
const PROFILE_RECORD_ID = "profile";
const PROFILE_CACHE_KEY = "elateFitProfileName";

function openProfileDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PROFILE_DB_NAME, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(PROFILE_STORE_NAME)) {
        db.createObjectStore(PROFILE_STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getSavedProfile(db) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(PROFILE_STORE_NAME, "readonly")
      .objectStore(PROFILE_STORE_NAME)
      .get(PROFILE_RECORD_ID);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

function saveProfile(db, profile) {
  return new Promise((resolve, reject) => {
    const record = {
      ...profile,
      id: PROFILE_RECORD_ID,
      updatedAt: new Date().toISOString(),
    };
    const request = db
      .transaction(PROFILE_STORE_NAME, "readwrite")
      .objectStore(PROFILE_STORE_NAME)
      .put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = () => reject(request.error);
  });
}

function deleteProfile(db) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(PROFILE_STORE_NAME, "readwrite")
      .objectStore(PROFILE_STORE_NAME)
      .delete(PROFILE_RECORD_ID);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function calculateBmi(heightCm, weightKg) {
  if (!heightCm || !weightKg) return null;
  const heightMeters = heightCm / 100;
  if (!heightMeters) return null;
  return weightKg / (heightMeters * heightMeters);
}

function bmiLabel(bmi) {
  if (bmi === null) return "Not available";
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy range";
  if (bmi < 30) return "Overweight";
  return "Higher range";
}

function activityFactor(level) {
  const factors = {
    Sedentary: 1.2,
    Light: 1.375,
    Moderate: 1.55,
    Active: 1.725,
    "Very active": 1.9,
  };
  return factors[level] || 1.2;
}

function bodyTypeFactor(bodyType) {
  const factors = {
    Ectomorphic: 1.1,
    Mesomorphic: 1.0,
    Endomorphic: 0.9,
  };
  return factors[bodyType] || 1.0;
}

function targetFactor(target) {
  const factors = {
    "Lose weight": 0.85,
    "Maintain weight": 1.0,
    "Gain weight": 1.15,
  };
  return factors[target] || 1.0;
}

function proteinFactor(profile) {
  const factors = {
    Ectomorphic: 1.9,
    Mesomorphic: 1.7,
    Endomorphic: 1.5,
  };
  const base = factors[profile.bodyType] || 1.6;
  if (profile.target === "Gain weight") return base + 0.2;
  if (profile.target === "Lose weight") return Math.max(1.4, base - 0.1);
  return base;
}

function calculateNutritionTargets(profile) {
  const isFemale = profile.gender === "Female";
  const baseCalories =
    10 * profile.weight +
    6.25 * profile.height -
    5 * profile.age +
    (isFemale ? -161 : 5);
  const calculatedCalories = Math.round(
    baseCalories *
      activityFactor(profile.activityLevel) *
      bodyTypeFactor(profile.bodyType) *
      targetFactor(profile.target),
  );
  const calories =
    profile.calorieTarget > 0
      ? Math.round(profile.calorieTarget)
      : calculatedCalories;
  const proteinRate = Math.max(
    isFemale ? 1.3 : 1.4,
    proteinFactor(profile) - (isFemale ? 0.1 : 0),
  );
  const protein = Math.round(profile.weight * proteinRate);
  const saturatedFat = Math.round((calories * 0.07) / 9);
  const unsaturatedFat = Math.round((calories * 0.17) / 9);
  const totalFiber = Math.max(
    isFemale ? 25 : 38,
    Math.round((calories / 1000) * 14),
  );
  const solubleFiber = Math.round(totalFiber * 0.25);
  const insolubleFiber = Math.max(1, totalFiber - solubleFiber);
  return {
    calories,
    calculatedCalories,
    protein,
    saturatedFat,
    unsaturatedFat,
    solubleFiber,
    insolubleFiber,
  };
}

const MICRONUTRIENT_REFERENCES = [
  { name: "Vitamin A", amount: "0.6", unit: "mg RAE" },
  { name: "Vitamin C", amount: "45", unit: "mg" },
  { name: "Vitamin D", amount: "0.005", unit: "mg" },
  { name: "Vitamin E", amount: "10", unit: "mg" },
  { name: "Vitamin K", amount: "0.055", unit: "mg" },
  { name: "Vitamin B1 (Thiamine)", amount: "1.1", unit: "mg" },
  { name: "Vitamin B2 (Riboflavin)", amount: "1.1", unit: "mg" },
  { name: "Vitamin B3 (Niacin)", amount: "14", unit: "mg NE" },
  { name: "Vitamin B6", amount: "1.3", unit: "mg" },
  { name: "Folate (Vitamin B9)", amount: "0.4", unit: "mg DFE" },
  { name: "Vitamin B12", amount: "0.0024", unit: "mg" },
  { name: "Calcium", amount: "1000", unit: "mg" },
  { name: "Iron", amount: "8", unit: "mg" },
  { name: "Magnesium", amount: "310", unit: "mg" },
  { name: "Zinc", amount: "8", unit: "mg" },
  { name: "Iodine", amount: "0.15", unit: "mg" },
  { name: "Selenium", amount: "0.055", unit: "mg" },
  { name: "Copper", amount: "0.9", unit: "mg" },
  { name: "Potassium", amount: "3500", unit: "mg" },
  { name: "Phosphorus", amount: "700", unit: "mg" },
];

const GENDER_MICRONUTRIENT_ADJUSTMENTS = {
  Male: {
    "Vitamin A": "0.9",
    "Vitamin C": "90",
    "Vitamin K": "0.12",
    "Vitamin B1 (Thiamine)": "1.2",
    "Vitamin B2 (Riboflavin)": "1.3",
    "Vitamin B3 (Niacin)": "16",
    Iron: "8",
    Magnesium: "400",
    Zinc: "11",
    Potassium: "3400",
  },
  Female: {
    "Vitamin A": "0.7",
    "Vitamin C": "75",
    "Vitamin K": "0.09",
    "Vitamin B1 (Thiamine)": "1.1",
    "Vitamin B2 (Riboflavin)": "1.1",
    "Vitamin B3 (Niacin)": "14",
    Iron: "18",
    Magnesium: "310",
    Zinc: "8",
    Potassium: "2600",
  },
};

function getMicronutrientReferences(gender) {
  const adjustments = GENDER_MICRONUTRIENT_ADJUSTMENTS[gender] || {};
  return MICRONUTRIENT_REFERENCES.map((nutrient) => ({
    ...nutrient,
    amount: adjustments[nutrient.name] || nutrient.amount,
  }));
}

function renderMicronutrientGuidance(profile) {
  const rows = getMicronutrientReferences(profile.gender)
    .map(
      (nutrient) => `
        <tr>
          <th scope="row">${nutrient.name}</th>
          <td>${nutrient.amount} ${nutrient.unit}</td>
        </tr>`,
    )
    .join("");
  const bmi = calculateBmi(profile.height, profile.weight);
  const bmiText = bmi ? bmi.toFixed(1) : "Not available";

  return `
      <section class="micronutrientSection" aria-labelledby="micronutrientHeading">
        <div class="micronutrientHeader">
          <div>
            <h3 id="micronutrientHeading">Daily micronutrient references</h3>
            <p>20 essential vitamins and minerals for a general adult ${profile.gender || "neutral"} reference profile.</p>
          </div>
          <div class="micronutrientContext">
            <span>${profile.height} cm</span>
            <span>${profile.weight} kg</span>
            <span>BMI ${bmiText}</span>
          </div>
        </div>
        <div class="micronutrientTableWrap">
          <table class="micronutrientTable">
            <caption>Reference amount per day</caption>
            <thead>
              <tr><th scope="col">Nutrient</th><th scope="col">Daily amount</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        <p class="micronutrientDisclaimer">Values are general adult reference amounts based on established international reference values. Gender, age, pregnancy, illness, medication, and deficiency can change requirements. Ask a qualified doctor/dietitian before using supplements.</p>
      </section>`;
}

function setProfileStatus(message, error = true) {
  const status = document.getElementById("profileStatus");
  if (!status) return;
  status.textContent = message;
  status.style.color = error ? "#a45e4c" : "#1f6b5b";
}

function getDisplayName(profile) {
  const cachedName = localStorage.getItem(PROFILE_CACHE_KEY) || "";
  const profileName = profile?.username?.trim() || "";
  return profileName || cachedName || "Set profile";
}

function renderProfileBadge(profile) {
  const badge = document.getElementById("profileBadge");
  if (!badge) return;
  const name = getDisplayName(profile);
  const nameElement = badge.querySelector(".profileBadgeName");
  if (nameElement) nameElement.textContent = name;
  badge.title = profile?.username
    ? `Open profile for ${name}`
    : "Create your profile";
}

function populateProfileForm(profile) {
  if (!profile) return;
  const fieldMap = {
    username: profile.username || "",
    gender: profile.gender || "",
    calorieTarget: profile.calorieTarget || "",
    userAge: profile.age || "",
    userHeight: profile.height || "",
    userWeight: profile.weight || "",
    targetWeight: profile.targetWeight || "",
    userTarget: profile.target || "",
    dietType: profile.dietType || "",
    lactoseIntolerant: profile.lactoseIntolerant || "",
    bodyType: profile.bodyType || "",
    activityLevel: profile.activityLevel || "",
    workStyle: profile.workStyle || "",
    profileNotes: profile.notes || "",
  };
  Object.entries(fieldMap).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.value = value;
  });
}

function readProfileForm() {
  return {
    username: document.getElementById("username").value.trim(),
    gender: document.getElementById("gender").value,
    calorieTarget: Number(document.getElementById("calorieTarget").value),
    age: Number(document.getElementById("userAge").value),
    height: Number(document.getElementById("userHeight").value),
    weight: Number(document.getElementById("userWeight").value),
    targetWeight: Number(document.getElementById("targetWeight").value),
    target: document.getElementById("userTarget").value,
    dietType: document.getElementById("dietType").value,
    lactoseIntolerant: document.getElementById("lactoseIntolerant").value,
    bodyType: document.getElementById("bodyType").value,
    activityLevel: document.getElementById("activityLevel").value,
    workStyle: document.getElementById("workStyle").value,
    notes: document.getElementById("profileNotes").value.trim(),
  };
}

function renderProfileSummary(profile) {
  const summary = document.getElementById("profileSummary");
  if (!summary) return;

  if (!profile) {
    summary.innerHTML =
      '<div class="profileEmpty">Complete the form to store your measurements, target, and dietary preferences in IndexedDB.</div>';
    return;
  }

  const bmi = calculateBmi(profile.height, profile.weight);
  const bmiText = bmi
    ? `${bmi.toFixed(1)} (${bmiLabel(bmi)})`
    : "Not available";
  const targetWeightText = Number.isInteger(profile.targetWeight)
    ? `${profile.targetWeight} kg`
    : "Not set";
  const nutrition = calculateNutritionTargets(profile);
  const notesText = profile.notes ? profile.notes : "No extra notes saved.";
  summary.innerHTML = `
        <div class="profileSummaryCard">
            <div class="profileSummaryHeader">
                <div>
                    <div class="profileSummaryName">${profile.username}</div>
                    <div class="profileSummaryMeta">Saved ${formatDateTime(profile.updatedAt)}</div>
                </div>
                <div class="profilePill">${profile.target}</div>
            </div>
            <div class="profileStatGrid">
              <div class="profileStat"><span>Gender</span><strong>${profile.gender || "Not specified"}</strong></div>
                <div class="profileStat"><span>Age</span><strong>${profile.age} years</strong></div>
                <div class="profileStat"><span>Height</span><strong>${profile.height} cm</strong></div>
                <div class="profileStat"><span>Weight</span><strong>${profile.weight} kg</strong></div>
                <div class="profileStat"><span>Target weight</span><strong>${targetWeightText}</strong></div>
                <div class="profileStat"><span>BMI</span><strong>${bmiText}</strong></div>
                <div class="profileStat"><span>Diet</span><strong>${profile.dietType}</strong></div>
                <div class="profileStat"><span>Body type</span><strong>${profile.bodyType}</strong></div>
                <div class="profileStat"><span>Lactose</span><strong>${profile.lactoseIntolerant}</strong></div>
                <div class="profileStat"><span>Activity</span><strong>${profile.activityLevel}</strong></div>
                <div class="profileStat"><span>Work style</span><strong>${profile.workStyle || "Not specified"}</strong></div>
                <div class="profileStat"><span>Calculated calorie target</span><strong>${nutrition.calculatedCalories} kcal</strong></div>
                <div class="profileStat"><span>Daily calorie target</span><strong>${nutrition.calories} kcal</strong></div>
                <div class="profileStat"><span>Daily protein</span><strong>${nutrition.protein} g</strong></div>
                <div class="profileStat"><span>Saturated fat limit</span><strong>${nutrition.saturatedFat} g</strong></div>
                <div class="profileStat"><span>Unsaturated fat</span><strong>${nutrition.unsaturatedFat} g</strong></div>
                <div class="profileStat"><span>Soluble fiber</span><strong>${nutrition.solubleFiber} g</strong></div>
                <div class="profileStat"><span>Insoluble fiber</span><strong>${nutrition.insolubleFiber} g</strong></div>
            </div>
            <div class="profileNote">${notesText}</div>
            ${renderMicronutrientGuidance(profile)}
        </div>`;
}

async function loadProfileState() {
  try {
    const db = await openProfileDatabase();
    const profile = await getSavedProfile(db);
    if (profile?.username)
      localStorage.setItem(PROFILE_CACHE_KEY, profile.username);
    renderProfileBadge(profile);
    renderProfileSummary(profile);
    return { db, profile };
  } catch (error) {
    renderProfileBadge(null);
    renderProfileSummary(null);
    return { db: null, profile: null };
  }
}

function validateProfile(profile) {
  if (
    !profile.username ||
    !profile.gender ||
    !profile.age ||
    profile.age <= 0 ||
    !profile.height ||
    profile.height <= 0 ||
    !profile.weight ||
    profile.weight <= 0 ||
    !profile.targetWeight ||
    profile.targetWeight <= 0 ||
    !Number.isInteger(profile.targetWeight)
  ) {
    return "Please complete the username, gender, age, height, weight, and whole-number target weight fields.";
  }
  if (profile.calorieTarget < 0 || !Number.isInteger(profile.calorieTarget)) {
    return "Set a whole-number calorie target or leave it blank to use the calculated target.";
  }
  if (
    !profile.target ||
    !profile.dietType ||
    !profile.lactoseIntolerant ||
    !profile.bodyType ||
    !profile.activityLevel
  ) {
    return "Please choose your target, diet, lactose preference, body type, and activity level.";
  }
  return "";
}

const DAILY_GUIDANCE_TARGETS = {
  Sedentary: { steps: 6000, cardio: 20, strength: 15, stretching: 10 },
  Light: { steps: 7500, cardio: 25, strength: 20, stretching: 10 },
  Moderate: { steps: 9000, cardio: 30, strength: 25, stretching: 15 },
  Active: { steps: 10000, cardio: 35, strength: 30, stretching: 15 },
  "Very active": { steps: 11000, cardio: 40, strength: 35, stretching: 20 },
};
const BODY_TYPE_STEP_RANGES = {
  Ectomorphic: { minimum: 2000, maximum: 4000, activityStep: 500 },
  Mesomorphic: { minimum: 4000, maximum: 6000, activityStep: 500 },
  Endomorphic: { minimum: 8000, maximum: 11000, activityStep: 750 },
};
const ACTIVITY_LEVEL_INDEX = {
  Sedentary: 0,
  Light: 1,
  Moderate: 2,
  Active: 3,
  "Very active": 4,
};
const GUIDANCE_NUTRITION_DB = "elateFitNutritionDB";
const GUIDANCE_NUTRITION_STORE = "foodEntries";
const GUIDANCE_WORKOUT_DB = "elateFitWorkoutDB";
const GUIDANCE_WORKOUT_STORE = "workouts";
const GUIDANCE_MICRONUTRIENT_KEYS = [
  "vitaminA",
  "vitaminC",
  "vitaminD",
  "vitaminE",
  "vitaminK",
  "vitaminB1",
  "vitaminB2",
  "vitaminB3",
  "vitaminB6",
  "folate",
  "vitaminB12",
  "calcium",
  "iron",
  "magnesium",
  "zinc",
  "iodine",
  "selenium",
  "copper",
  "potassium",
  "phosphorus",
];
const GUIDANCE_MICRONUTRIENT_SOURCES = {
  vitaminA: "orange vegetables, spinach, eggs, or mango",
  vitaminC: "citrus, berries, peppers, or broccoli",
  vitaminD: "safe sunlight, fortified foods, or oily fish",
  vitaminE: "nuts, seeds, spinach, or avocado",
  vitaminK: "leafy greens, broccoli, or green beans",
  vitaminB1: "whole grains, lentils, peas, or seeds",
  vitaminB2: "milk, yogurt, eggs, almonds, or spinach",
  vitaminB3: "poultry, fish, peanuts, avocado, or whole grains",
  vitaminB6: "chickpeas, potatoes, bananas, or fish",
  folate: "leafy greens, beans, peas, or avocado",
  vitaminB12: "eggs, dairy, fish, or fortified foods",
  calcium: "dairy, tofu, almonds, or leafy greens",
  iron: "beans, lentils, spinach, poultry, or seafood",
  magnesium: "seeds, almonds, spinach, beans, or brown rice",
  zinc: "lentils, chickpeas, pumpkin seeds, or dairy",
  iodine: "iodized salt, dairy, eggs, or seafood",
  selenium: "eggs, fish, poultry, brown rice, or beans",
  copper: "beans, cashews, seeds, or dark chocolate",
  potassium: "bananas, potatoes, beans, tomatoes, or yogurt",
  phosphorus: "dairy, poultry, fish, seeds, or whole grains",
};

function getTodayStepTarget(profile) {
  const range =
    BODY_TYPE_STEP_RANGES[profile?.bodyType] ||
    BODY_TYPE_STEP_RANGES.Mesomorphic;
  const activityIndex = ACTIVITY_LEVEL_INDEX[profile?.activityLevel] || 0;
  const goalAdjustment =
    profile?.target === "Lose weight"
      ? range.activityStep
      : profile?.target === "Gain weight"
        ? -range.activityStep
        : 0;
  return Math.min(
    range.maximum,
    Math.max(
      range.minimum,
      range.minimum + activityIndex * range.activityStep + goalAdjustment,
    ),
  );
}

function guidanceDayKey(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function escapeGuidanceText(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openExistingGuidanceDatabase(databaseName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName);
    let missingDatabase = false;
    request.onupgradeneeded = (event) => {
      if (event.oldVersion !== 0) return;
      missingDatabase = true;
      event.target.transaction.abort();
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      if (missingDatabase && request.error?.name === "AbortError") {
        resolve(null);
        return;
      }
      reject(request.error || new Error(`Unable to open ${databaseName}.`));
    };
  });
}

async function readGuidanceStore(databaseName, storeName) {
  const database = await openExistingGuidanceDatabase(databaseName);
  if (!database) return { entries: [], available: true };
  if (!database.objectStoreNames.contains(storeName)) {
    database.close();
    return { entries: [], available: true };
  }

  return new Promise((resolve, reject) => {
    const request = database
      .transaction(storeName, "readonly")
      .objectStore(storeName)
      .getAll();
    request.onsuccess = () => {
      database.close();
      resolve({ entries: request.result || [], available: true });
    };
    request.onerror = () => {
      database.close();
      reject(request.error || new Error(`Unable to read ${storeName}.`));
    };
  });
}

function readGuidanceDays(storageKey) {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return new Set();
  try {
    const days = JSON.parse(stored);
    if (!Array.isArray(days)) throw new TypeError("Completion data is invalid.");
    return new Set(days);
  } catch (error) {
    throw new TypeError(`Unable to read ${storageKey}: ${error.message}`);
  }
}

function isPreviousGuidanceWeek(value, todayStart) {
  const date = new Date(value);
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  return date >= weekStart && date < todayStart;
}

function getPreviousNutritionSummary(entries) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const previousEntries = entries.filter((entry) =>
    isPreviousGuidanceWeek(entry.createdAt, todayStart),
  );
  const dailyTotals = new Map();
  previousEntries.forEach((entry) => {
    const key = guidanceDayKey(entry.createdAt);
    const totals = dailyTotals.get(key) || {};
    [
      "calories",
      "protein",
      "solubleFiber",
      "insolubleFiber",
      ...GUIDANCE_MICRONUTRIENT_KEYS,
    ].forEach((field) => {
      if (Number.isFinite(Number(entry[field]))) {
        totals[field] = (totals[field] || 0) + Number(entry[field]);
      }
    });
    dailyTotals.set(key, totals);
  });

  const days = [...dailyTotals.values()];
  const average = {};
  [
    "calories",
    "protein",
    "solubleFiber",
    "insolubleFiber",
    ...GUIDANCE_MICRONUTRIENT_KEYS,
  ].forEach((field) => {
    average[field] = days.length
      ? days.reduce((sum, day) => sum + (day[field] || 0), 0) / days.length
      : 0;
  });
  return {
    entries: previousEntries,
    days: days.length,
    average,
    micronutrientsStored:
      previousEntries.length > 0 &&
      previousEntries.every((entry) =>
        GUIDANCE_MICRONUTRIENT_KEYS.every((key) =>
          Object.prototype.hasOwnProperty.call(entry, key),
        ),
      ),
  };
}

function formatGuidanceAmount(value, decimals = 0) {
  return Number(value).toFixed(decimals).replace(/\.0+$/, "");
}

function getGuidanceNutrientKey(name) {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  return GUIDANCE_MICRONUTRIENT_KEYS.find((key) =>
    normalizedName.startsWith(key.toLowerCase()),
  );
}

function renderNutritionMetricAdvice(label, average, target, unit) {
  const icons = {
    Calories: "🔥",
    Protein: "💪",
    "Soluble fiber": "🌾",
    "Insoluble fiber": "🥦",
  };
  const progress = Math.min(
    100,
    Math.max(0, Math.round((average / Math.max(target, 1)) * 100)),
  );
  let advice;
  if (average < target * 0.9) {
    advice = `About ${formatGuidanceAmount(target - average)} ${unit} below target. Add balanced portions gradually.`;
  } else if (average > target * 1.1) {
    advice = `About ${formatGuidanceAmount(average - target)} ${unit} above target. Reduce portions gradually if this does not match your goal.`;
  } else {
    advice = `Close to your ${formatGuidanceAmount(target)} ${unit} target.`;
  }
  return `
    <li class="whatsTodayAdviceItem">
      <div class="whatsTodayAdviceHeader">
        <span>${icons[label] || "📌"} <strong>${label}</strong></span>
        <strong>${formatGuidanceAmount(average)} / ${formatGuidanceAmount(target)} ${unit}</strong>
      </div>
      <div class="whatsTodayProgressTrack" role="progressbar" aria-label="${label} progress"
        aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">
        <span class="whatsTodayProgressFill" style="width: ${progress}%"></span>
      </div>
      <p>${advice}</p>
    </li>`;
}

function renderNutritionGuidance(profile, summary, available = true) {
  if (!profile) {
    return `
      <section class="whatsTodaySection is-warning">
        <h3>🍽️ Food guidance</h3>
        <p>Save your profile first so calorie, protein, fiber, vitamin, and mineral advice can be compared with personalized targets.</p>
      </section>`;
  }
  if (!available) {
    return `
      <section class="whatsTodaySection is-error">
        <h3>🍽️ Food guidance</h3>
        <p>Nutrition history is temporarily unavailable. Open the calorie tracker to check your saved entries and try this guide again.</p>
      </section>`;
  }
  if (!summary.days) {
    return `
      <section class="whatsTodaySection is-warning">
        <h3>🍽️ Food guidance</h3>
        <p>No food was logged in the previous seven days. Add meals in the calorie tracker so tomorrow's guidance can compare your calories, protein, fiber, vitamins, and minerals with your profile targets.</p>
      </section>`;
  }

  const targets = calculateNutritionTargets(profile);
  const fiberAdvice = [
    renderNutritionMetricAdvice(
      "Soluble fiber",
      summary.average.solubleFiber,
      targets.solubleFiber,
      "g",
    ),
    renderNutritionMetricAdvice(
      "Insoluble fiber",
      summary.average.insolubleFiber,
      targets.insolubleFiber,
      "g",
    ),
  ].join("");
  const references = getMicronutrientReferences(profile.gender);
  const deficiencies = references
    .filter((nutrient) => {
      const key = getGuidanceNutrientKey(nutrient.name);
      return key && summary.average[key] < Number(nutrient.amount) * 0.8;
    })
    .map((nutrient) => {
      const key = getGuidanceNutrientKey(nutrient.name);
      return `${nutrient.name}: try ${GUIDANCE_MICRONUTRIENT_SOURCES[key]}.`;
    })
    .slice(0, 5);

  const micronutrientAdvice = !summary.micronutrientsStored
    ? "Vitamin and mineral values are not stored for some older food entries. Keep adding new foods to build a complete micronutrient history."
    : deficiencies.length
      ? `Your logged average looks low in: ${deficiencies.join(" ")}`
      : "Your logged vitamin and mineral averages are not showing a clear deficiency.";

  return `
    <section class="whatsTodaySection">
      <h3>🍽️ Food guidance · previous seven days</h3>
      <ul class="whatsTodayList whatsTodayAdviceList">
        ${renderNutritionMetricAdvice("Calories", summary.average.calories, targets.calories, "kcal")}
        ${renderNutritionMetricAdvice("Protein", summary.average.protein, targets.protein, "g")}
        ${fiberAdvice}
      </ul>
      <p>${micronutrientAdvice}</p>
    </section>`;
}

function recentGuidanceDayCount(days, todayKey) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - 6);
  return [...days].filter((day) => {
    const date = new Date(`${day}T00:00:00`);
    return date >= start && date <= today;
  }).length;
}

function renderConsistencyLine(
  label,
  available,
  recentDays,
  completedToday,
  todayTarget,
) {
  if (!available) {
    return `<li><strong>${label}:</strong> status is unavailable right now. Open its tracker to check and record progress.</li>`;
  }
  if (!recentDays) {
    return `<li><strong>${label}:</strong> no progress data yet. Add a session so your consistency can be measured.</li>`;
  }
  const consistency =
    recentDays >= 4
      ? "You are consistent - great work."
      : "You have some progress; keep building the routine.";
  const todayMessage = completedToday
    ? "Today's session is marked complete."
    : `Today's ${todayTarget}-minute goal is still open.`;
  const progress = Math.round((recentDays / 7) * 100);
  const icon = {
    Cardio: "🏃",
    "Strength training": "🏋️",
    Stretching: "🧘",
  }[label];
  return `
    <li class="whatsTodayConsistency ${completedToday ? "is-complete" : "is-pending"}">
      <div class="whatsTodayConsistencyHeader">
        <span>${icon} <strong>${label}</strong></span>
        <strong>${recentDays} / 7 days</strong>
      </div>
      <div class="whatsTodayProgressTrack" role="progressbar" aria-label="${label} consistency"
        aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">
        <span class="whatsTodayProgressFill" style="width: ${progress}%"></span>
      </div>
      <p>${consistency} ${todayMessage}</p>
    </li>`;
}

function renderTodayGuidance(profile, nutritionSummary, activity) {
  const activityLevel = profile?.activityLevel || "Sedentary";
  const targets = {
    ...(DAILY_GUIDANCE_TARGETS[activityLevel] ||
      DAILY_GUIDANCE_TARGETS.Sedentary),
    steps: getTodayStepTarget(profile),
  };
  const profileMessage = profile
    ? ""
    : `<section class="whatsTodaySection is-warning"><h3>🎯 Personalize this guide</h3><p>Complete and save your profile to tailor today's targets to your age, weight, target, and activity level. Starter targets below use a sedentary baseline.</p></section>`;
  const sedentaryAdvice =
    !profile ||
    activityLevel === "Sedentary" ||
    profile.workStyle === "Desk or sitting job"
      ? `<section class="whatsTodaySection is-warning">
          <h3>⚠️ Break up sitting time</h3>
          <p>Long uninterrupted sitting can harm health even when you exercise later. Stand, walk, or move for 2-5 minutes every 30-60 minutes, and use the home routine below as a gentle starting point.</p>
        </section>
        <section class="whatsTodaySection">
          <h3>🏠 Basic home strength routine</h3>
          <ul class="whatsTodayList">
            <li>March in place - 2 minutes</li>
            <li>Chair squats - 2 sets of 8-12</li>
            <li>Wall push-ups - 2 sets of 8-12</li>
            <li>Glute bridges - 2 sets of 10-15</li>
            <li>Bird-dog or dead-bug - 2 sets of 6-10 per side</li>
            <li>Calf raises - 2 sets of 12-15</li>
          </ul>
          <p>Start comfortably, rest as needed, and stop for pain, dizziness, or unusual shortness of breath.</p>
        </section>`
      : "";
  const completedToday = [
    activity.today.cardio,
    activity.today.strength,
    activity.today.stretching,
  ].filter(Boolean).length;
  const profileLabel = profile
    ? `${profile.bodyType} · ${profile.target} · ${activityLevel}`
    : "Starter plan · save your profile for precision";

  return `
    ${profileMessage}
    <section class="whatsTodayDashboard">
      <div class="whatsTodayDashboardIntro">
        <div>
          <span class="whatsTodayOverline">📊 Daily plan</span>
          <h3>Today's movement targets</h3>
          <p>${profileLabel}</p>
        </div>
        <div class="whatsTodayScore"><strong>${completedToday} / 3</strong><span>activities complete</span></div>
      </div>
      <div class="whatsTodayMetricGrid">
        <article class="whatsTodayMetric">
          <span class="whatsTodayMetricLabel">🚶 Steps</span>
          <strong>${targets.steps.toLocaleString()}<small>steps</small></strong>
          <p>Use a phone or watch to track them.</p>
        </article>
        <article class="whatsTodayMetric">
          <span class="whatsTodayMetricLabel">🏃 Cardio</span>
          <strong>${targets.cardio}<small>minutes</small></strong>
          <p>Comfortable-to-moderate effort.</p>
        </article>
        <article class="whatsTodayMetric">
          <span class="whatsTodayMetricLabel">🏋️ Strength</span>
          <strong>${targets.strength}<small>minutes</small></strong>
          <p>Controlled full-body exercises.</p>
        </article>
        <article class="whatsTodayMetric">
          <span class="whatsTodayMetricLabel">🧘 Stretching</span>
          <strong>${targets.stretching}<small>minutes</small></strong>
          <p>Move gently; do not bounce.</p>
        </article>
      </div>
    </section>
    <section class="whatsTodaySection ${completedToday === 3 ? "is-success" : ""}">
      <h3>📈 Consistency dashboard</h3>
      <ul class="whatsTodayList">
        ${renderConsistencyLine("Cardio", activity.cardioAvailable, activity.recent.cardio, activity.today.cardio, targets.cardio)}
        ${renderConsistencyLine("Strength training", activity.workoutAvailable, activity.recent.strength, activity.today.strength, targets.strength)}
        ${renderConsistencyLine("Stretching", activity.stretchAvailable, activity.recent.stretching, activity.today.stretching, targets.stretching)}
      </ul>
    </section>
    ${renderNutritionGuidance(
      profile,
      nutritionSummary,
      activity.nutritionAvailable,
    )}
    ${sedentaryAdvice}
    <section class="whatsTodaySection">
      <h3>💧 One more useful habit</h3>
      <p>Drink water regularly, sleep consistently, and adjust these suggestions for medical conditions, pregnancy, medication, or pain with advice from a qualified clinician.</p>
    </section>`;
}

async function readTodayGuidanceData() {
  const profileDatabase = await openProfileDatabase();
  const profile = await getSavedProfile(profileDatabase);
  const todayKey = guidanceDayKey(new Date());
  const [nutritionResult, workoutResult, cardioResult, stretchResult] =
    await Promise.allSettled([
      readGuidanceStore(GUIDANCE_NUTRITION_DB, GUIDANCE_NUTRITION_STORE),
      readGuidanceStore(GUIDANCE_WORKOUT_DB, GUIDANCE_WORKOUT_STORE),
      Promise.resolve(readGuidanceDays("elateFitCardioCompletedDays")),
      Promise.resolve(readGuidanceDays("elateFitStretchCompletedDays")),
    ]);
  const nutritionEntries =
    nutritionResult.status === "fulfilled"
      ? nutritionResult.value.entries
      : [];
  const workouts =
    workoutResult.status === "fulfilled"
      ? workoutResult.value.entries
      : [];
  const cardioDays =
    cardioResult.status === "fulfilled" ? cardioResult.value : new Set();
  const stretchDays =
    stretchResult.status === "fulfilled" ? stretchResult.value : new Set();
  const workoutDays = new Set(
    workouts
      .filter((entry) => entry.createdAt)
      .map((entry) => guidanceDayKey(entry.createdAt)),
  );
  const recent = {
    cardio: recentGuidanceDayCount(cardioDays, todayKey),
    strength: recentGuidanceDayCount(workoutDays, todayKey),
    stretching: recentGuidanceDayCount(stretchDays, todayKey),
  };
  return {
    profile,
    nutritionSummary: getPreviousNutritionSummary(nutritionEntries),
    activity: {
      cardioAvailable: cardioResult.status === "fulfilled",
      workoutAvailable: workoutResult.status === "fulfilled",
      stretchAvailable: stretchResult.status === "fulfilled",
      nutritionAvailable: nutritionResult.status === "fulfilled",
      recent,
      today: {
        cardio: cardioDays.has(todayKey),
        strength: workoutDays.has(todayKey),
        stretching: stretchDays.has(todayKey),
      },
    },
  };
}

function initializeTodayWidget() {
  const openButton = document.getElementById("whatsTodayButton");
  const overlay = document.getElementById("whatsTodayOverlay");
  const dialog = overlay?.querySelector(".whatsTodayDialog");
  const cancelButton = document.getElementById("whatsTodayCancel");
  const content = document.getElementById("whatsTodayContent");
  const date = document.getElementById("whatsTodayDate");
  if (!openButton || !overlay || !dialog || !cancelButton || !content) return;

  let previousFocus;
  const close = () => {
    overlay.hidden = true;
    document.body.style.removeProperty("overflow");
    previousFocus?.focus();
  };
  const open = async () => {
    previousFocus = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    date.textContent = new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date());
    content.innerHTML =
      '<p class="whatsTodayLoading">Loading your daily guidance...</p>';
    dialog.focus();
    try {
      const state = await readTodayGuidanceData();
      content.innerHTML = renderTodayGuidance(
        state.profile,
        state.nutritionSummary,
        state.activity,
      );
    } catch (error) {
      console.error("Unable to load today's guidance:", error);
      content.innerHTML =
        '<p class="whatsTodayError">Today\'s guidance could not be loaded. Please try again after opening your profile and trackers.</p>';
    }
  };

  openButton.addEventListener("click", open);
  cancelButton.addEventListener("click", close);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });
  document.addEventListener("keydown", (event) => {
    if (!overlay.hidden && event.key === "Escape") close();
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  initializeTodayWidget();
  const profileForm = document.getElementById("profileForm");
  if (!profileForm) {
    await loadProfileState();
    return;
  }

  let profileDatabase;
  try {
    const state = await loadProfileState();
    profileDatabase = state.db;
    populateProfileForm(state.profile);
    profileForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const profile = readProfileForm();
      const validationMessage = validateProfile(profile);
      if (validationMessage) {
        setProfileStatus(validationMessage, true);
        return;
      }
      try {
        const savedRecord = await saveProfile(
          profileDatabase || (await openProfileDatabase()),
          profile,
        );
        localStorage.setItem(PROFILE_CACHE_KEY, profile.username);
        renderProfileBadge(savedRecord);
        renderProfileSummary(savedRecord);
        setProfileStatus("Profile saved successfully.", false);
      } catch (error) {
        setProfileStatus("Unable to save the profile in this browser.", true);
      }
    });
  } catch (error) {
    setProfileStatus("Profile storage is unavailable in this browser.", true);
  }
});
