const NUTRITION_DB_NAME = "elateFitNutritionDB";
const NUTRITION_DB_VERSION = 1;
const NUTRITION_STORE = "foodEntries";
const PROFILE_DB_NAME = "elateFitUserProfileDB";
const PROFILE_STORE_NAME = "profiles";
const PROFILE_RECORD_ID = "profile";

const foodCatalog = {
    rice: { label: "Rice", calories: 130, protein: 2.7, saturatedFat: 0.1, unsaturatedFat: 0.2, solubleFiber: 0.1, insolubleFiber: 0.3 },
    dal: { label: "Dal", calories: 116, protein: 9.0, saturatedFat: 0.1, unsaturatedFat: 0.2, solubleFiber: 1.3, insolubleFiber: 3.1 },
    carrot: { label: "Carrot", calories: 41, protein: 0.9, saturatedFat: 0.0, unsaturatedFat: 0.1, solubleFiber: 0.9, insolubleFiber: 1.6 },
    wheat: { label: "Wheat", calories: 340, protein: 13.7, saturatedFat: 0.4, unsaturatedFat: 0.8, solubleFiber: 1.2, insolubleFiber: 10.0 },
    oats: { label: "Oats", calories: 389, protein: 16.9, saturatedFat: 1.2, unsaturatedFat: 3.5, solubleFiber: 4.0, insolubleFiber: 6.2 },
    roti: { label: "Roti", calories: 297, protein: 11.0, saturatedFat: 0.4, unsaturatedFat: 0.8, solubleFiber: 1.2, insolubleFiber: 6.0 },
    potato: { label: "Potato", calories: 77, protein: 2.0, saturatedFat: 0.0, unsaturatedFat: 0.1, solubleFiber: 0.3, insolubleFiber: 1.4 },
    banana: { label: "Banana", calories: 89, protein: 1.1, saturatedFat: 0.1, unsaturatedFat: 0.1, solubleFiber: 0.7, insolubleFiber: 1.0 },
    apple: { label: "Apple", calories: 52, protein: 0.3, saturatedFat: 0.0, unsaturatedFat: 0.1, solubleFiber: 1.0, insolubleFiber: 1.2 },
    egg: { label: "Egg", calories: 155, protein: 13.0, saturatedFat: 3.1, unsaturatedFat: 5.4, solubleFiber: 0.0, insolubleFiber: 0.0 },
    chicken: { label: "Chicken", calories: 239, protein: 27.3, saturatedFat: 3.8, unsaturatedFat: 5.0, solubleFiber: 0.0, insolubleFiber: 0.0 },
    paneer: { label: "Paneer", calories: 265, protein: 18.3, saturatedFat: 14.0, unsaturatedFat: 7.0, solubleFiber: 0.0, insolubleFiber: 0.0 },
    milk: { label: "Milk", calories: 61, protein: 3.2, saturatedFat: 1.9, unsaturatedFat: 0.8, solubleFiber: 0.0, insolubleFiber: 0.0 },
    curd: { label: "Curd", calories: 61, protein: 3.5, saturatedFat: 1.2, unsaturatedFat: 0.5, solubleFiber: 0.0, insolubleFiber: 0.0 },
    peanuts: { label: "Peanuts", calories: 567, protein: 25.8, saturatedFat: 7.3, unsaturatedFat: 36.0, solubleFiber: 2.1, insolubleFiber: 6.0 },
    spinach: { label: "Spinach", calories: 23, protein: 2.9, saturatedFat: 0.1, unsaturatedFat: 0.1, solubleFiber: 0.6, insolubleFiber: 1.5 },
    tomato: { label: "Tomato", calories: 18, protein: 0.9, saturatedFat: 0.0, unsaturatedFat: 0.1, solubleFiber: 0.2, insolubleFiber: 1.2 }
};

let nutritionDb;
let selectedPeriod = 7;
let allEntries = [];
let userProfile = null;

function openNutritionDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(NUTRITION_DB_NAME, NUTRITION_DB_VERSION);
        request.onupgradeneeded = event => {
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
        const request = nutritionDb.transaction(NUTRITION_STORE, "readonly").objectStore(NUTRITION_STORE).getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

function saveEntry(entry) {
    return new Promise((resolve, reject) => {
        const request = nutritionDb.transaction(NUTRITION_STORE, "readwrite").objectStore(NUTRITION_STORE).put(entry);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function deleteEntry(id) {
    return new Promise((resolve, reject) => {
        const request = nutritionDb.transaction(NUTRITION_STORE, "readwrite").objectStore(NUTRITION_STORE).delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function deleteAllEntries() {
    return new Promise((resolve, reject) => {
        const request = nutritionDb.transaction(NUTRITION_STORE, "readwrite").objectStore(NUTRITION_STORE).clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function openProfileDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(PROFILE_DB_NAME, 1);
        request.onupgradeneeded = event => {
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
        const request = db.transaction(PROFILE_STORE_NAME, "readonly").objectStore(PROFILE_STORE_NAME).get(PROFILE_RECORD_ID);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
    });
}

function normalizeFoodName(value) { return value.trim().toLowerCase(); }

function getFood(value) {
    const key = normalizeFoodName(value);
    return foodCatalog[key] || Object.values(foodCatalog).find(food => food.label.toLowerCase() === key);
}

function renderFoodSuggestions(query) {
    const suggestions = document.getElementById("foodSuggestions");
    const normalizedQuery = normalizeFoodName(query);
    const matches = Object.values(foodCatalog).filter(food => !normalizedQuery || food.label.toLowerCase().includes(normalizedQuery));

    suggestions.innerHTML = matches.map(food => `<button type="button" class="foodSuggestion" data-food="${food.label}" role="option">${food.label}<small>${food.calories} kcal - ${food.protein} g protein - ${food.saturatedFat} g saturated fat per 100 g</small></button>`).join("");
    suggestions.classList.toggle("is-visible", matches.length > 0 && document.activeElement === document.getElementById("foodSearch"));
}

function formatDate(date) {
    return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function formatTime(date) {
    return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date);
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
        "Very active": 1.9
    };
    return factors[level] || 1.2;
}

function bodyTypeFactor(bodyType) {
    const factors = {
        Ectomorphic: 1.1,
        Mesomorphic: 1.0,
        Endomorphic: 0.9
    };
    return factors[bodyType] || 1.0;
}

function targetFactor(target) {
    const factors = {
        "Lose weight": 0.85,
        "Maintain weight": 1.0,
        "Gain weight": 1.15
    };
    return factors[target] || 1.0;
}

function proteinFactor(profile) {
    const factors = {
        Ectomorphic: 1.9,
        Mesomorphic: 1.7,
        Endomorphic: 1.5
    };
    const base = factors[profile.bodyType] || 1.6;
    if (profile.target === "Gain weight") return base + 0.2;
    if (profile.target === "Lose weight") return Math.max(1.4, base - 0.1);
    return base;
}

function calculateNutritionTargets(profile) {
    const baseCalories = (10 * profile.weight) + (6.25 * profile.height) - (5 * profile.age) + 5;
    const calories = Math.round(baseCalories * activityFactor(profile.activityLevel) * bodyTypeFactor(profile.bodyType) * targetFactor(profile.target));
    const protein = Math.round(profile.weight * proteinFactor(profile));
    return { calories, protein };
}

function calculateNutrition(food, grams) {
    return {
        calories: food.calories * grams / 100,
        protein: food.protein * grams / 100,
        saturatedFat: food.saturatedFat * grams / 100,
        unsaturatedFat: food.unsaturatedFat * grams / 100,
        solubleFiber: food.solubleFiber * grams / 100,
        insolubleFiber: food.insolubleFiber * grams / 100
    };
}

function setStatus(message, isError = true) {
    const status = document.getElementById("statusMessage");
    status.textContent = message;
    status.style.color = isError ? "#a45e4c" : "#1f6b5b";
}

function getTodayEntries() {
    const today = dayKey(new Date());
    return allEntries.filter(entry => dayKey(entry.createdAt) === today);
}

function renderEntries() {
    const entries = getTodayEntries().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const list = document.getElementById("entryList");
    list.innerHTML = entries.length ? entries.map(entry => `
        <div class="entryRow">
            <div class="entryFood"><strong>${entry.foodLabel}</strong><small>${formatDate(new Date(entry.createdAt))} · ${formatTime(new Date(entry.createdAt))}</small></div>
            <span>${entry.grams} g</span><span>${entry.calories.toFixed(0)} kcal</span><span>${entry.protein.toFixed(1)} g</span>
            <span>${(entry.saturatedFat || 0).toFixed(1)} g</span><span>${(entry.unsaturatedFat || 0).toFixed(1)} g</span>
            <span>${((entry.solubleFiber || 0) + (entry.insolubleFiber || 0)).toFixed(1)} g</span>
            <button type="button" class="deleteEntry" data-id="${entry.id}" data-food="${entry.foodLabel}" aria-label="Delete ${entry.foodLabel}"><i class="fa-solid fa-xmark"></i></button>
        </div>`).join("") : '<div class="entryEmpty">No food entries saved for today.</div>';
    const calories = entries.reduce((sum, entry) => sum + entry.calories, 0);
    const protein = entries.reduce((sum, entry) => sum + entry.protein, 0);
    const saturatedFat = entries.reduce((sum, entry) => sum + (entry.saturatedFat || 0), 0);
    const unsaturatedFat = entries.reduce((sum, entry) => sum + (entry.unsaturatedFat || 0), 0);
    const solubleFiber = entries.reduce((sum, entry) => sum + (entry.solubleFiber || 0), 0);
    const insolubleFiber = entries.reduce((sum, entry) => sum + (entry.insolubleFiber || 0), 0);
    document.getElementById("todayCalories").textContent = `${calories.toFixed(0)} kcal`;
    document.getElementById("todayProtein").textContent = `${protein.toFixed(1)} g`;
    document.getElementById("todayEntries").textContent = entries.length;
    document.getElementById("todaySaturatedFat").textContent = `${saturatedFat.toFixed(1)} g`;
    document.getElementById("todayUnsaturatedFat").textContent = `${unsaturatedFat.toFixed(1)} g`;
    document.getElementById("todaySolubleFiber").textContent = `${solubleFiber.toFixed(1)} g`;
    document.getElementById("todayInsolubleFiber").textContent = `${insolubleFiber.toFixed(1)} g`;
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
    calorieLeft.textContent = calorieComplete ? `Target reached. ${Math.abs(calorieRemaining).toFixed(0)} kcal over.` : `${calorieRemaining.toFixed(0)} kcal left to reach your target.`;
    calorieBadge.innerHTML = calorieComplete ? '<i class="fa-solid fa-star"></i> Target reached' : 'In progress';
    proteinValue.textContent = `${targets.protein} g`;
    proteinLeft.textContent = proteinComplete ? `Target reached. ${Math.abs(proteinRemaining).toFixed(1)} g over.` : `${proteinRemaining.toFixed(1)} g left to reach your target.`;
    proteinBadge.innerHTML = proteinComplete ? '<i class="fa-solid fa-star"></i> Target reached' : 'In progress';
}

function aggregateByDay(days) {
    const end = new Date();
    const values = [];
    for (let offset = days - 1; offset >= 0; offset -= 1) {
        const date = new Date(end);
        date.setDate(end.getDate() - offset);
        const key = dayKey(date);
        const dayEntries = allEntries.filter(entry => dayKey(entry.createdAt) === key);
        values.push({
            key,
            label: new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date),
            calories: dayEntries.reduce((sum, entry) => sum + entry.calories, 0),
            protein: dayEntries.reduce((sum, entry) => sum + entry.protein, 0)
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
    const maxValue = Math.max(10, ...data.map(day => Math.max(day.calories, day.protein * 10)));
    context.font = "11px Segoe UI, sans-serif";
    context.strokeStyle = "#e3ebe6";
    context.fillStyle = "#687873";
    for (let tick = 0; tick <= 4; tick += 1) {
        const y = padding.top + chartHeight - chartHeight * tick / 4;
        context.beginPath(); context.moveTo(padding.left, y); context.lineTo(width - padding.right, y); context.stroke();
        context.fillText(Math.round(maxValue * tick / 4), 5, y + 4);
    }
    function drawLine(valueSelector, color, scale = 1) {
        context.beginPath();
        data.forEach((day, index) => {
            const x = padding.left + chartWidth * index / Math.max(1, data.length - 1);
            const y = padding.top + chartHeight - chartHeight * day[valueSelector] * scale / maxValue;
            index ? context.lineTo(x, y) : context.moveTo(x, y);
        });
        context.strokeStyle = color; context.lineWidth = 2.5; context.stroke();
    }
    drawLine("calories", "#1f6b5b");
    drawLine("protein", "#b58b45", 10);
    context.fillStyle = "#687873";
    data.forEach((day, index) => {
        if (data.length <= 10 || index % Math.ceil(data.length / 7) === 0 || index === data.length - 1) {
            const x = padding.left + chartWidth * index / Math.max(1, data.length - 1);
            context.fillText(day.label, x - 15, height - 12);
        }
    });
    context.fillStyle = "#1f6b5b"; context.fillRect(width - 154, 10, 12, 3); context.fillStyle = "#24332f"; context.fillText("Calories", width - 136, 14);
    context.fillStyle = "#b58b45"; context.fillRect(width - 76, 10, 12, 3); context.fillStyle = "#24332f"; context.fillText("Protein", width - 58, 14);
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
    document.getElementById("calorieTrend").textContent = trendText(data, "calories", "kcal");
    document.getElementById("proteinTrend").textContent = trendText(data, "protein", "g");
}

async function refreshDashboard() {
    allEntries = await getAllEntries();
    renderEntries();
    renderProfileTargets();
    renderProgress();
}

document.addEventListener("DOMContentLoaded", async function() {
    try {
        nutritionDb = await openNutritionDatabase();
        try {
            const profileDb = await openProfileDatabase();
            userProfile = await getSavedProfile(profileDb);
        } catch (error) {
            userProfile = null;
        }
        const dataList = document.getElementById("foodOptions");
        dataList.innerHTML = Object.values(foodCatalog).map(food => `<option value="${food.label}"></option>`).join("");
        const foodSearch = document.getElementById("foodSearch");
        const foodSuggestions = document.getElementById("foodSuggestions");
        foodSearch.addEventListener("focus", function() {
            renderFoodSuggestions(this.value);
        });
        foodSearch.addEventListener("input", function() {
            renderFoodSuggestions(this.value);
            const food = getFood(this.value);
            document.getElementById("foodPreview").textContent = food ? `${food.label}: ${food.calories} kcal and ${food.protein} g protein per 100 g.` : "Choose a food to see its nutrition per 100 g.";
        });
        foodSearch.addEventListener("blur", function() {
            setTimeout(() => foodSuggestions.classList.remove("is-visible"), 150);
        });
        foodSuggestions.addEventListener("click", function(event) {
            const suggestion = event.target.closest(".foodSuggestion");
            if (!suggestion) return;
            foodSearch.value = suggestion.dataset.food;
            foodSearch.dispatchEvent(new Event("input", { bubbles: true }));
            foodSearch.focus();
        });
        document.getElementById("foodForm").addEventListener("submit", async function(event) {
            event.preventDefault();
            const food = getFood(document.getElementById("foodSearch").value);
            const grams = Number(document.getElementById("enterGrams").value);
            if (!food || !grams || grams <= 0) { setStatus("Choose a listed food and enter a gram amount greater than zero."); return; }
            const nutrition = calculateNutrition(food, grams);
            await saveEntry({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, foodKey: normalizeFoodName(food.label), foodLabel: food.label, grams, calories: nutrition.calories, protein: nutrition.protein, saturatedFat: nutrition.saturatedFat, unsaturatedFat: nutrition.unsaturatedFat, solubleFiber: nutrition.solubleFiber, insolubleFiber: nutrition.insolubleFiber, createdAt: new Date().toISOString() });
            this.reset();
            document.getElementById("foodPreview").textContent = "Food saved with the current date and time.";
            setStatus("Food added to today's journal.", false);
            await refreshDashboard();
        });
        document.getElementById("entryList").addEventListener("click", async function(event) {
            const button = event.target.closest(".deleteEntry");
            if (!button) return;
            if (!confirm(`Delete ${button.dataset.food} from today's intake?`)) return;
            await deleteEntry(button.dataset.id);
            await refreshDashboard();
        });
        document.getElementById("deleteAllButton").addEventListener("click", async function() {
            if (!allEntries.length || !confirm("Delete all saved food entries?")) return;
            if (!confirm("This will permanently delete every saved food entry. Continue?")) return;
            await deleteAllEntries(); setStatus("All saved food entries were deleted.", false); await refreshDashboard();
        });
        document.querySelectorAll(".periodButton").forEach(button => button.addEventListener("click", function() {
            selectedPeriod = Number(this.dataset.period);
            document.querySelectorAll(".periodButton").forEach(item => item.classList.remove("active"));
            this.classList.add("active"); renderProgress();
        }));
        window.addEventListener("resize", renderProgress);
        await refreshDashboard();
    } catch (error) {
        console.error("Unable to initialize nutrition journal:", error);
        setStatus("Nutrition storage is unavailable in this browser.");
    }
});
