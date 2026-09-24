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
  const baseCalories =
    10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  const calories = Math.round(
    baseCalories *
      activityFactor(profile.activityLevel) *
      bodyTypeFactor(profile.bodyType) *
      targetFactor(profile.target),
  );
  const protein = Math.round(profile.weight * proteinFactor(profile));
  const saturatedFat = Math.round((calories * 0.07) / 9);
  const unsaturatedFat = Math.round((calories * 0.17) / 9);
  const totalFiber = Math.round((calories / 1000) * 14);
  const solubleFiber = Math.round(totalFiber * 0.25);
  const insolubleFiber = Math.max(1, totalFiber - solubleFiber);
  return {
    calories,
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

function renderMicronutrientGuidance(profile) {
  const rows = MICRONUTRIENT_REFERENCES.map(
    (nutrient) => `
        <tr>
          <th scope="row">${nutrient.name}</th>
          <td>${nutrient.amount} ${nutrient.unit}</td>
        </tr>`,
  ).join("");
  const bmi = calculateBmi(profile.height, profile.weight);
  const bmiText = bmi ? bmi.toFixed(1) : "Not available";

  return `
      <section class="micronutrientSection" aria-labelledby="micronutrientHeading">
        <div class="micronutrientHeader">
          <div>
            <h3 id="micronutrientHeading">Daily micronutrient references</h3>
            <p>20 essential vitamins and minerals for a general adult reference profile.</p>
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
        <p class="micronutrientDisclaimer">Values are general adult reference amounts based on WHO/FAO guidance where available and established international reference values. Height and weight are shown as profile context; these micronutrient amounts are not calculated by multiplying body weight or height. Sex, age, pregnancy, illness, medication, and deficiency can change requirements. Ask a qualified clinician before using supplements.</p>
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
    userAge: profile.age || "",
    userHeight: profile.height || "",
    userWeight: profile.weight || "",
    targetWeight: profile.targetWeight || "",
    userTarget: profile.target || "",
    dietType: profile.dietType || "",
    lactoseIntolerant: profile.lactoseIntolerant || "",
    bodyType: profile.bodyType || "",
    activityLevel: profile.activityLevel || "",
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
    age: Number(document.getElementById("userAge").value),
    height: Number(document.getElementById("userHeight").value),
    weight: Number(document.getElementById("userWeight").value),
    targetWeight: Number(document.getElementById("targetWeight").value),
    target: document.getElementById("userTarget").value,
    dietType: document.getElementById("dietType").value,
    lactoseIntolerant: document.getElementById("lactoseIntolerant").value,
    bodyType: document.getElementById("bodyType").value,
    activityLevel: document.getElementById("activityLevel").value,
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
                <div class="profileStat"><span>Age</span><strong>${profile.age} years</strong></div>
                <div class="profileStat"><span>Height</span><strong>${profile.height} cm</strong></div>
                <div class="profileStat"><span>Weight</span><strong>${profile.weight} kg</strong></div>
                <div class="profileStat"><span>Target weight</span><strong>${targetWeightText}</strong></div>
                <div class="profileStat"><span>BMI</span><strong>${bmiText}</strong></div>
                <div class="profileStat"><span>Diet</span><strong>${profile.dietType}</strong></div>
                <div class="profileStat"><span>Body type</span><strong>${profile.bodyType}</strong></div>
                <div class="profileStat"><span>Lactose</span><strong>${profile.lactoseIntolerant}</strong></div>
                <div class="profileStat"><span>Activity</span><strong>${profile.activityLevel}</strong></div>
                <div class="profileStat"><span>Daily calories</span><strong>${nutrition.calories} kcal</strong></div>
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
    return "Please complete the username, age, height, weight, and whole-number target weight fields.";
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

document.addEventListener("DOMContentLoaded", async function () {
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
