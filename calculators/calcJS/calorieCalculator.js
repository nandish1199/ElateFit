const NUTRITION_DB_NAME = "elateFitNutritionDB";
const NUTRITION_DB_VERSION = 1;
const NUTRITION_STORE = "foodEntries";
const PROFILE_DB_NAME = "elateFitUserProfileDB";
const PROFILE_STORE_NAME = "profiles";
const PROFILE_RECORD_ID = "profile";

const foodCatalog = {
  // ==========================================
  // 1. GRAINS & MILLETS (Raw & Boiled)
  // ==========================================
  rice: {
    label: "RICE RAW",
    calories: 365,
    protein: 7.2,
    saturatedFat: 0.3,
    unsaturatedFat: 0.6,
    solubleFiber: 0.55,
    insolubleFiber: 1.92,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.04,
    vitaminK: 0,
    vitaminB1: 0.326,
    vitaminB2: 0.102,
    vitaminB3: 6.27,
    vitaminB6: 0.161,
    folate: 0.003,
    vitaminB12: 0,
    calcium: 8,
    iron: 1.5,
    magnesium: 115,
    zinc: 1.85,
    iodine: 0,
    selenium: 0.0148,
    copper: 0.27,
    potassium: 250,
    phosphorus: 303,
  },
  boiled_rice: {
    label: "RICE BOILED",
    calories: 121.67,
    protein: 2.4,
    saturatedFat: 0.1,
    unsaturatedFat: 0.2,
    solubleFiber: 0.183,
    insolubleFiber: 0.64,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.013,
    vitaminK: 0,
    vitaminB1: 0.109,
    vitaminB2: 0.034,
    vitaminB3: 2.09,
    vitaminB6: 0.054,
    folate: 0.001,
    vitaminB12: 0,
    calcium: 2.67,
    iron: 0.5,
    magnesium: 38.33,
    zinc: 0.617,
    iodine: 0,
    selenium: 0.0049,
    copper: 0.09,
    potassium: 83.33,
    phosphorus: 101,
  },
  brown_rice: {
    label: "BROWN RICE RAW",
    calories: 367,
    protein: 7.3,
    saturatedFat: 0.6,
    unsaturatedFat: 2.1,
    solubleFiber: 0.4,
    insolubleFiber: 3.0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.59,
    vitaminK: 0.0019,
    vitaminB1: 0.401,
    vitaminB2: 0.093,
    vitaminB3: 6.4,
    vitaminB6: 0.509,
    folate: 0.038,
    vitaminB12: 0,
    calcium: 9,
    iron: 1.29,
    magnesium: 116,
    zinc: 2.13,
    iodine: 0,
    selenium: 0.0171,
    copper: 0.302,
    potassium: 250,
    phosphorus: 311,
  },
  boiled_brown_rice: {
    label: "BROWN RICE BOILED",
    calories: 122.33,
    protein: 2.43,
    saturatedFat: 0.2,
    unsaturatedFat: 0.7,
    solubleFiber: 0.133,
    insolubleFiber: 1,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.197,
    vitaminK: 0.00063,
    vitaminB1: 0.134,
    vitaminB2: 0.031,
    vitaminB3: 2.13,
    vitaminB6: 0.17,
    folate: 0.0127,
    vitaminB12: 0,
    calcium: 3,
    iron: 0.43,
    magnesium: 38.67,
    zinc: 0.71,
    iodine: 0,
    selenium: 0.0057,
    copper: 0.101,
    potassium: 83.33,
    phosphorus: 103.67,
  },
  wheat: {
    label: "WHOLE WHEAT RAW",
    calories: 340,
    protein: 13.2,
    saturatedFat: 0.43,
    unsaturatedFat: 1.453,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.71,
    vitaminK: 0.0019,
    vitaminB1: 0.502,
    vitaminB2: 0.165,
    vitaminB3: 4.96,
    vitaminB6: 0.407,
    folate: 0.044,
    vitaminB12: 0,
    calcium: 34,
    iron: 3.6,
    magnesium: 137,
    zinc: 2.6,
    iodine: 0,
    selenium: 0.0618,
    copper: 0.41,
    potassium: 363,
    phosphorus: 357,
  },
  boiled_wheat: {
    label: "WHOLE WHEAT BOILED",
    calories: 113.33,
    protein: 4.4,
    saturatedFat: 0.143,
    unsaturatedFat: 0.484,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.237,
    vitaminK: 0.00063,
    vitaminB1: 0.167,
    vitaminB2: 0.055,
    vitaminB3: 1.65,
    vitaminB6: 0.136,
    folate: 0.0147,
    vitaminB12: 0,
    calcium: 11.33,
    iron: 1.2,
    magnesium: 45.67,
    zinc: 0.867,
    iodine: 0,
    selenium: 0.0206,
    copper: 0.137,
    potassium: 121,
    phosphorus: 119,
  },
  oats: {
    label: "OATS RAW",
    calories: 389,
    protein: 16.9,
    saturatedFat: 1.22,
    unsaturatedFat: 4.72,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.42,
    vitaminK: 0.002,
    vitaminB1: 0.763,
    vitaminB2: 0.139,
    vitaminB3: 0.961,
    vitaminB6: 0.119,
    folate: 0.056,
    vitaminB12: 0,
    calcium: 54,
    iron: 4.72,
    magnesium: 177,
    zinc: 3.97,
    iodine: 0,
    selenium: 0.028,
    copper: 0.626,
    potassium: 429,
    phosphorus: 523,
  },
  boiled_oats: {
    label: "OATS BOILED",
    calories: 155.6,
    protein: 6.76,
    saturatedFat: 0.488,
    unsaturatedFat: 1.888,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.168,
    vitaminK: 0.0008,
    vitaminB1: 0.3052,
    vitaminB2: 0.0556,
    vitaminB3: 0.3844,
    vitaminB6: 0.0476,
    folate: 0.0224,
    vitaminB12: 0,
    calcium: 21.6,
    iron: 1.888,
    magnesium: 70.8,
    zinc: 1.588,
    iodine: 0,
    selenium: 0.0112,
    copper: 0.2504,
    potassium: 171.6,
    phosphorus: 209.2,
  },
  jowar: {
    label: "JOWAR RAW",
    calories: 329,
    protein: 10.62,
    saturatedFat: 0.61,
    unsaturatedFat: 2.689,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.5,
    vitaminK: 0,
    vitaminB1: 0.332,
    vitaminB2: 0.096,
    vitaminB3: 3.688,
    vitaminB6: 0.443,
    folate: 0.02,
    vitaminB12: 0,
    calcium: 13,
    iron: 3.36,
    magnesium: 165,
    zinc: 1.67,
    iodine: 0,
    selenium: 0.0122,
    copper: 0.284,
    potassium: 363,
    phosphorus: 289,
  },
  boiled_jowar: {
    label: "JOWAR BOILED",
    calories: 109.67,
    protein: 3.54,
    saturatedFat: 0.203,
    unsaturatedFat: 0.896,
    solubleFiber: 0,
    insolubleFiber: 0,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.167,
    vitaminK: 0,
    vitaminB1: 0.111,
    vitaminB2: 0.032,
    vitaminB3: 1.229,
    vitaminB6: 0.148,
    folate: 0.0067,
    vitaminB12: 0,
    calcium: 4.33,
    iron: 1.12,
    magnesium: 55,
    zinc: 0.557,
    iodine: 0,
    selenium: 0.0041,
    copper: 0.0947,
    potassium: 121,
    phosphorus: 96.33,
  },
  pearl_millet: {
    label: "PEARL MILLET RAW",
    calories: 378,
    protein: 11.0,
    saturatedFat: 0.723,
    unsaturatedFat: 2.903,
    solubleFiber: 3000,
    insolubleFiber: 7000,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.05,
    vitaminK: 0.0009,
    vitaminB1: 0.421,
    vitaminB2: 0.29,
    vitaminB3: 4.72,
    vitaminB6: 0.384,
    folate: 0.085,
    vitaminB12: 0,
    calcium: 8,
    iron: 3.01,
    magnesium: 114,
    zinc: 1.68,
    iodine: 0,
    selenium: 0.0027,
    copper: 0.75,
    potassium: 195,
    phosphorus: 285,
  },
  boiled_pearl_millet: {
    label: "PEARL MILLET BOILED",
    calories: 126,
    protein: 3.67,
    saturatedFat: 0.241,
    unsaturatedFat: 0.968,
    solubleFiber: 1000,
    insolubleFiber: 2333,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.017,
    vitaminK: 0.0003,
    vitaminB1: 0.14,
    vitaminB2: 0.097,
    vitaminB3: 1.573,
    vitaminB6: 0.128,
    folate: 0.0283,
    vitaminB12: 0,
    calcium: 2.67,
    iron: 1.003,
    magnesium: 38,
    zinc: 0.56,
    iodine: 0,
    selenium: 0.0009,
    copper: 0.25,
    potassium: 65,
    phosphorus: 95,
  },
};

let nutritionDb;
let selectedPeriod = 7;
let allEntries = [];
let userProfile = null;

function openNutritionDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(NUTRITION_DB_NAME, NUTRITION_DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(NUTRITION_STORE)) {
        const store = db.createObjectStore(NUTRITION_STORE, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getAllEntries() {
  return new Promise((resolve, reject) => {
    const request = nutritionDb
      .transaction(NUTRITION_STORE, "readonly")
      .objectStore(NUTRITION_STORE)
      .getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

function saveEntry(entry) {
  return new Promise((resolve, reject) => {
    const request = nutritionDb
      .transaction(NUTRITION_STORE, "readwrite")
      .objectStore(NUTRITION_STORE)
      .put(entry);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function deleteEntry(id) {
  return new Promise((resolve, reject) => {
    const request = nutritionDb
      .transaction(NUTRITION_STORE, "readwrite")
      .objectStore(NUTRITION_STORE)
      .delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function deleteAllEntries() {
  return new Promise((resolve, reject) => {
    const request = nutritionDb
      .transaction(NUTRITION_STORE, "readwrite")
      .objectStore(NUTRITION_STORE)
      .clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

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

function normalizeFoodName(value) {
  return value.trim().toLowerCase();
}

function getFood(value) {
  const key = normalizeFoodName(value);
  return (
    foodCatalog[key] ||
    Object.values(foodCatalog).find((food) => food.label.toLowerCase() === key)
  );
}

function renderFoodSuggestions(query) {
  const suggestions = document.getElementById("foodSuggestions");
  const normalizedQuery = normalizeFoodName(query);
  const matches = Object.values(foodCatalog).filter(
    (food) =>
      !normalizedQuery || food.label.toLowerCase().includes(normalizedQuery),
  );

  suggestions.innerHTML = matches
    .map(
      (food) =>
        `<button type="button" class="foodSuggestion" data-food="${food.label}" role="option">${food.label}<small>${food.calories} kcal - ${food.protein} g protein - ${food.saturatedFat} g saturated fat per 100 g</small></button>`,
    )
    .join("");
  suggestions.classList.toggle(
    "is-visible",
    matches.length > 0 &&
      document.activeElement === document.getElementById("foodSearch"),
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function dayKey(date) {
  const local = new Date(date);
  return `${local.getFullYear()}-${String(local.getMonth() + 1).padStart(2, "0")}-${String(local.getDate()).padStart(2, "0")}`;
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
  const baseCalories =
    10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  const calories = Math.round(
    baseCalories *
      activityFactor(profile.activityLevel) *
      bodyTypeFactor(profile.bodyType) *
      targetFactor(profile.target),
  );
  const protein = Math.round(profile.weight * proteinFactor(profile));
  return { calories, protein };
}

function calculateNutrition(food, grams) {
  return {
    calories: (food.calories * grams) / 100,
    protein: (food.protein * grams) / 100,
    saturatedFat: (food.saturatedFat * grams) / 100,
    unsaturatedFat: (food.unsaturatedFat * grams) / 100,
    solubleFiber: (food.solubleFiber * grams) / 100,
    insolubleFiber: (food.insolubleFiber * grams) / 100,
  };
}

const MICRONUTRIENTS = [
  [
    "vitaminA",
    "Vitamin A",
    0.6,
    "mg RAE",
    "Sweet potatoes, carrots, tuna, butternut squash, spinach, cantaloupe, lettuce, red bell peppers, chicken liver, mango",
  ],
  [
    "vitaminC",
    "Vitamin C",
    45,
    "mg",
    "Oranges, strawberries, kiwi, bell peppers, broccoli, Brussels sprouts, tomatoes, papaya, lemons, grapefruits",
  ],
  [
    "vitaminD",
    "Vitamin D",
    0.005,
    "mg",
    "Salmon, sardines, herring, canned tuna, cod liver oil, egg yolks, mushrooms, fortified milk, fortified orange juice, fortified cereals",
  ],
  [
    "vitaminE",
    "Vitamin E",
    10,
    "mg",
    "Sunflower seeds, almonds, peanuts, spinach, broccoli, hazelnuts, pine nuts, avocado, red bell peppers, mango",
  ],
  [
    "vitaminK",
    "Vitamin K",
    0.055,
    "mg",
    "Kale, spinach, broccoli, Brussels sprouts, cabbage, Swiss chard, collard greens, green beans, prunes, kiwi",
  ],
  [
    "vitaminB1",
    "Vitamin B1 (Thiamine)",
    1.1,
    "mg",
    "Sunflower seeds, brown rice, whole wheat, green peas, lentils, pecans, black beans, macadamia nuts, edamame",
  ],
  [
    "vitaminB2",
    "Vitamin B2 (Riboflavin)",
    1.1,
    "mg",
    "Milk, yogurt, cheese, eggs, chicken breast, salmon, almonds, spinach",
  ],
  [
    "vitaminB3",
    "Vitamin B3 (Niacin)",
    14,
    "mg NE",
    "Chicken breast, turkey breast, chicken liver, tuna, salmon, peanuts, avocado, brown rice, whole wheat, mushrooms",
  ],
  [
    "vitaminB6",
    "Vitamin B6",
    1.3,
    "mg",
    "Chickpeas, chicken liver, tuna, salmon, chicken breast, fortified cereals, potatoes, turkey, bananas, marinara sauce",
  ],
  [
    "folate",
    "Folate (Vitamin B9)",
    0.4,
    "mg DFE",
    "Spinach, black-eyed peas, asparagus, Brussels sprouts, romaine lettuce, avocado, broccoli, mustard greens, green peas, kidney beans",
  ],
  [
    "vitaminB12",
    "Vitamin B12",
    0.0024,
    "mg",
    "Chicken liver, clams, sardines, fortified nutritional yeast, trout, salmon, milk, yogurt, eggs",
  ],
  [
    "calcium",
    "Calcium",
    1000,
    "mg",
    "Milk, cheese, yogurt, fortified orange juice, winter squash, edamame, tofu, canned sardines, almonds, kale",
  ],
  [
    "iron",
    "Iron",
    8,
    "mg",
    "Red meat, poultry, seafood, beans, spinach, raisins, fortified cereals, peas, lentils",
  ],
  [
    "magnesium",
    "Magnesium",
    310,
    "mg",
    "Pumpkin seeds, chia seeds, almonds, spinach, cashews, peanuts, edamame, black beans, peanut butter, brown rice",
  ],
  [
    "zinc",
    "Zinc",
    8,
    "mg",
    "Oysters, crab, pumpkin seeds, turkey, cheddar cheese, shrimp, lentils, chickpeas",
  ],
  [
    "iodine",
    "Iodine",
    0.15,
    "mg",
    "Seaweed, cod, milk, yogurt, cheese, iodized salt, shrimp, tuna, eggs, prunes",
  ],
  [
    "selenium",
    "Selenium",
    0.055,
    "mg",
    "Brazil nuts, halibut, tuna, brown rice, eggs, turkey, chicken, cottage cheese, baked beans",
  ],
  [
    "copper",
    "Copper",
    0.9,
    "mg",
    "Oysters, shiitake mushrooms, tofu, sweet potatoes, sesame seeds, cashews, chickpeas, salmon, dark chocolate, turkey",
  ],
  [
    "potassium",
    "Potassium",
    3500,
    "mg",
    "Bananas, sweet potatoes, spinach, avocados, potatoes, white beans, tomatoes, yogurt, salmon, mushrooms",
  ],
  [
    "phosphorus",
    "Phosphorus",
    700,
    "mg",
    "Chicken, turkey, salmon, milk, yogurt, sunflower seeds, pumpkin seeds, almonds, whole grains",
  ],
];

function calculateMicronutrients(food, grams) {
  return Object.fromEntries(
    MICRONUTRIENTS.map(([key]) => [key, ((food[key] || 0) * grams) / 100]),
  );
}

function formatMicronutrientAmount(amount) {
  return amount.toFixed(5);
}

function renderMicronutrients(entries) {
  const container = document.getElementById("micronutrientList");
  if (!container) return;
  const totals = Object.fromEntries(MICRONUTRIENTS.map(([key]) => [key, 0]));

  entries.forEach((entry) => {
    const food = getFood(entry.foodKey || entry.foodLabel);
    if (!food) return;
    const values = calculateMicronutrients(food, entry.grams);
    MICRONUTRIENTS.forEach(([key]) => {
      totals[key] += values[key];
    });
  });

  container.innerHTML = MICRONUTRIENTS.map(
    ([key, label, reference, unit, foodSuggestions]) => {
      const consumed = totals[key];
      const percentage = Math.min(100, (consumed / reference) * 100);
      const guidance =
        consumed < reference
          ? `<div class="micronutrientGuidance"><strong>FOODS TO CONSIDER</strong><ul>${foodSuggestions
              .split(", ")
              .map((food) => `<li>${food}</li>`)
              .join("")}</ul></div>`
          : "";
      return `
      <div class="micronutrientCard">
        <div class="micronutrientHeader">
          <span>${label}</span>
          <strong>${formatMicronutrientAmount(consumed)} / ${reference} ${unit}</strong>
        </div>
        <div class="micronutrientProgressTrack" role="progressbar" aria-label="${label} daily intake" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percentage.toFixed(1)}">
          <span style="width: ${percentage.toFixed(1)}%"></span>
        </div>
        ${guidance}
      </div>`;
    },
  ).join("");
}

function setStatus(message, isError = true) {
  const status = document.getElementById("statusMessage");
  status.textContent = message;
  status.style.color = isError ? "#B42318" : "#757575";
}

function getTodayEntries() {
  const today = dayKey(new Date());
  return allEntries.filter((entry) => dayKey(entry.createdAt) === today);
}

function renderEntries() {
  const entries = getTodayEntries().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );
  const list = document.getElementById("entryList");
  list.innerHTML = entries.length
    ? entries
        .map(
          (entry) => `
        <div class="entryRow">
            <div class="entryFood"><strong>${entry.foodLabel}</strong><small>${formatDate(new Date(entry.createdAt))} · ${formatTime(new Date(entry.createdAt))}</small></div>
            <span>${entry.grams} g</span><span>${entry.calories.toFixed(0)} kcal</span><span>${entry.protein.toFixed(1)} g</span>
            <span>${(entry.saturatedFat || 0).toFixed(1)} g</span><span>${(entry.unsaturatedFat || 0).toFixed(1)} g</span>
            <span>${(entry.solubleFiber || 0).toFixed(1)} g</span><span>${(entry.insolubleFiber || 0).toFixed(1)} g</span>
            <button type="button" class="deleteEntry" data-id="${entry.id}" data-food="${entry.foodLabel}" aria-label="Delete ${entry.foodLabel}"><i class="fa-solid fa-xmark"></i></button>
        </div>`,
        )
        .join("")
    : '<div class="entryEmpty">No food entries saved for today.</div>';
  const calories = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const protein = entries.reduce((sum, entry) => sum + entry.protein, 0);
  const saturatedFat = entries.reduce(
    (sum, entry) => sum + (entry.saturatedFat || 0),
    0,
  );
  const unsaturatedFat = entries.reduce(
    (sum, entry) => sum + (entry.unsaturatedFat || 0),
    0,
  );
  const solubleFiber = entries.reduce(
    (sum, entry) => sum + (entry.solubleFiber || 0),
    0,
  );
  const insolubleFiber = entries.reduce(
    (sum, entry) => sum + (entry.insolubleFiber || 0),
    0,
  );
  document.getElementById("todayCalories").textContent =
    `${calories.toFixed(0)} kcal`;
  document.getElementById("todayProtein").textContent =
    `${protein.toFixed(1)} g`;
  document.getElementById("todayEntries").textContent = entries.length;
  document.getElementById("todaySaturatedFat").textContent =
    `${saturatedFat.toFixed(1)} g`;
  document.getElementById("todayUnsaturatedFat").textContent =
    `${unsaturatedFat.toFixed(1)} g`;
  document.getElementById("todaySolubleFiber").textContent =
    `${solubleFiber.toFixed(1)} g`;
  document.getElementById("todayInsolubleFiber").textContent =
    `${insolubleFiber.toFixed(1)} g`;
  renderMicronutrients(entries);
}

function renderProfileTargets() {
  const calorieCard = document.getElementById("calorieTargetCard");
  const proteinCard = document.getElementById("proteinTargetCard");
  const calorieValue = document.getElementById("calorieTargetValue");
  const calorieLeft = document.getElementById("calorieTargetLeft");
  const calorieBadge = document.getElementById("calorieTargetBadge");
  const proteinValue = document.getElementById("proteinTargetValue");
  const proteinLeft = document.getElementById("proteinTargetLeft");
  const proteinBadge = document.getElementById("proteinTargetBadge");
  if (!calorieCard || !proteinCard) return;

  const entries = getTodayEntries();
  const todayCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const todayProtein = entries.reduce((sum, entry) => sum + entry.protein, 0);

  if (!userProfile) {
    calorieCard.classList.remove("is-complete");
    proteinCard.classList.remove("is-complete");
    calorieValue.textContent = "Set profile";
    calorieLeft.textContent = "Add a profile to calculate your calorie target.";
    calorieBadge.innerHTML = "Profile needed";
    proteinValue.textContent = "Set profile";
    proteinLeft.textContent = "Add a profile to calculate your protein target.";
    proteinBadge.innerHTML = "Profile needed";
    return;
  }

  const targets = calculateNutritionTargets(userProfile);
  const calorieRemaining = targets.calories - todayCalories;
  const proteinRemaining = targets.protein - todayProtein;
  const calorieComplete = calorieRemaining <= 0;
  const proteinComplete = proteinRemaining <= 0;

  calorieCard.classList.toggle("is-complete", calorieComplete);
  proteinCard.classList.toggle("is-complete", proteinComplete);
  calorieValue.textContent = `${targets.calories} kcal`;
  calorieLeft.textContent = calorieComplete
    ? `Target reached. ${Math.abs(calorieRemaining).toFixed(0)} kcal over.`
    : `${calorieRemaining.toFixed(0)} kcal left to reach your target.`;
  calorieBadge.innerHTML = calorieComplete
    ? '<i class="fa-solid fa-star"></i> Target reached'
    : "In progress";
  proteinValue.textContent = `${targets.protein} g`;
  proteinLeft.textContent = proteinComplete
    ? `Target reached. ${Math.abs(proteinRemaining).toFixed(1)} g over.`
    : `${proteinRemaining.toFixed(1)} g left to reach your target.`;
  proteinBadge.innerHTML = proteinComplete
    ? '<i class="fa-solid fa-star"></i> Target reached'
    : "In progress";
}

function aggregateByDay(days) {
  const end = new Date();
  const values = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(end);
    date.setDate(end.getDate() - offset);
    const key = dayKey(date);
    const dayEntries = allEntries.filter(
      (entry) => dayKey(entry.createdAt) === key,
    );
    values.push({
      key,
      label: new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
      }).format(date),
      calories: dayEntries.reduce((sum, entry) => sum + entry.calories, 0),
      protein: dayEntries.reduce((sum, entry) => sum + entry.protein, 0),
    });
  }
  return values;
}

function drawChart(data) {
  const canvas = document.getElementById("nutritionChart");
  const context = canvas.getContext("2d");
  const width = canvas.clientWidth || 600;
  const height = canvas.clientHeight || 290;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  const padding = { top: 20, right: 16, bottom: 38, left: 44 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(
    10,
    ...data.map((day) => Math.max(day.calories, day.protein * 10)),
  );
  context.font = "11px Segoe UI, sans-serif";
  context.strokeStyle = "#DCE9DF";
  context.fillStyle = "#64756A";
  for (let tick = 0; tick <= 4; tick += 1) {
    const y = padding.top + chartHeight - (chartHeight * tick) / 4;
    context.beginPath();
    context.moveTo(padding.left, y);
    context.lineTo(width - padding.right, y);
    context.stroke();
    context.fillText(Math.round((maxValue * tick) / 4), 5, y + 4);
  }
  function drawLine(valueSelector, color, scale = 1) {
    context.beginPath();
    data.forEach((day, index) => {
      const x =
        padding.left + (chartWidth * index) / Math.max(1, data.length - 1);
      const y =
        padding.top +
        chartHeight -
        (chartHeight * day[valueSelector] * scale) / maxValue;
      index ? context.lineTo(x, y) : context.moveTo(x, y);
    });
    context.strokeStyle = color;
    context.lineWidth = 2.5;
    context.stroke();
    data.forEach((day, index) => {
      const x =
        padding.left + (chartWidth * index) / Math.max(1, data.length - 1);
      const y =
        padding.top +
        chartHeight -
        (chartHeight * day[valueSelector] * scale) / maxValue;
      context.fillStyle = "#ffffff";
      context.beginPath();
      context.arc(x, y, 4.5, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, 3, 0, Math.PI * 2);
      context.fill();
    });
  }
  drawLine("calories", "#757575");
  drawLine("protein", "#15803D", 10);
  context.fillStyle = "#64756A";
  data.forEach((day, index) => {
    if (
      data.length <= 10 ||
      index % Math.ceil(data.length / 7) === 0 ||
      index === data.length - 1
    ) {
      const x =
        padding.left + (chartWidth * index) / Math.max(1, data.length - 1);
      context.fillText(day.label, x - 15, height - 12);
    }
  });
  context.fillStyle = "#757575";
  context.fillRect(width - 154, 10, 12, 3);
  context.fillStyle = "#24352A";
  context.fillText("Calories", width - 136, 14);
  context.fillStyle = "#15803D";
  context.fillRect(width - 76, 10, 12, 3);
  context.fillStyle = "#24352A";
  context.fillText("Protein", width - 58, 14);
}

function trendText(data, key, unit) {
  const split = Math.floor(data.length / 2);
  const previous = data.slice(0, split).reduce((sum, day) => sum + day[key], 0);
  const current = data.slice(split).reduce((sum, day) => sum + day[key], 0);
  if (!previous && !current) return "No data recorded in this period.";
  if (!previous) return "New intake recorded in the latest period.";
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? "up" : "down"} ${Math.abs(change).toFixed(0)}% versus the earlier period (${current.toFixed(0)} ${unit}).`;
}

function renderProgress() {
  const data = aggregateByDay(selectedPeriod);
  drawChart(data);
  document.getElementById("calorieTrend").textContent = trendText(
    data,
    "calories",
    "kcal",
  );
  document.getElementById("proteinTrend").textContent = trendText(
    data,
    "protein",
    "g",
  );
}

async function refreshDashboard() {
  allEntries = await getAllEntries();
  renderEntries();
  renderProfileTargets();
  renderProgress();
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    nutritionDb = await openNutritionDatabase();
    try {
      const profileDb = await openProfileDatabase();
      userProfile = await getSavedProfile(profileDb);
    } catch (error) {
      userProfile = null;
    }
    const dataList = document.getElementById("foodOptions");
    dataList.innerHTML = Object.values(foodCatalog)
      .map((food) => `<option value="${food.label}"></option>`)
      .join("");
    const foodSearch = document.getElementById("foodSearch");
    const foodSuggestions = document.getElementById("foodSuggestions");
    foodSearch.addEventListener("focus", function () {
      renderFoodSuggestions(this.value);
    });
    foodSearch.addEventListener("input", function () {
      renderFoodSuggestions(this.value);
      const food = getFood(this.value);
      document.getElementById("foodPreview").textContent = food
        ? `${food.label}: ${food.calories} kcal and ${food.protein} g protein per 100 g.`
        : "Choose a food to see its nutrition per 100 g.";
    });
    foodSearch.addEventListener("blur", function () {
      setTimeout(() => foodSuggestions.classList.remove("is-visible"), 150);
    });
    foodSuggestions.addEventListener("click", function (event) {
      const suggestion = event.target.closest(".foodSuggestion");
      if (!suggestion) return;
      foodSearch.value = suggestion.dataset.food;
      foodSearch.dispatchEvent(new Event("input", { bubbles: true }));
      foodSearch.focus();
    });
    document
      .getElementById("foodForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        const food = getFood(document.getElementById("foodSearch").value);
        const grams = Number(document.getElementById("enterGrams").value);
        if (!food || !grams || grams <= 0) {
          setStatus(
            "Choose a listed food and enter a gram amount greater than zero.",
          );
          return;
        }
        const nutrition = calculateNutrition(food, grams);
        await saveEntry({
          id: crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
          foodKey: normalizeFoodName(food.label),
          foodLabel: food.label,
          grams,
          calories: nutrition.calories,
          protein: nutrition.protein,
          saturatedFat: nutrition.saturatedFat,
          unsaturatedFat: nutrition.unsaturatedFat,
          solubleFiber: nutrition.solubleFiber,
          insolubleFiber: nutrition.insolubleFiber,
          createdAt: new Date().toISOString(),
        });
        this.reset();
        document.getElementById("foodPreview").textContent =
          "Food saved with the current date and time.";
        setStatus("Food added to today's journal.", false);
        await refreshDashboard();
      });
    document
      .getElementById("entryList")
      .addEventListener("click", async function (event) {
        const button = event.target.closest(".deleteEntry");
        if (!button) return;
        if (!confirm(`Delete ${button.dataset.food} from today's intake?`))
          return;
        await deleteEntry(button.dataset.id);
        await refreshDashboard();
      });
    document
      .getElementById("deleteAllButton")
      .addEventListener("click", async function () {
        if (!allEntries.length || !confirm("DELETE ALL SAVED FOOD ENTRIES?"))
          return;
        if (
          !confirm(
            "This will permanently delete every saved food entry. Continue?",
          )
        )
          return;
        await deleteAllEntries();
        setStatus("All saved food entries were deleted.", false);
        await refreshDashboard();
      });
    document.querySelectorAll(".periodButton").forEach((button) =>
      button.addEventListener("click", function () {
        selectedPeriod = Number(this.dataset.period);
        document
          .querySelectorAll(".periodButton")
          .forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
        renderProgress();
      }),
    );
    window.addEventListener("resize", renderProgress);
    await refreshDashboard();
  } catch (error) {
    console.error("Unable to initialize nutrition journal:", error);
    setStatus("Nutrition storage is unavailable in this browser.");
  }
});
