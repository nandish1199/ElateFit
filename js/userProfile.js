const PROFILE_DB_NAME = "elateFitUserProfileDB";
const PROFILE_STORE_NAME = "profiles";
const PROFILE_RECORD_ID = "profile";
const PROFILE_CACHE_KEY = "elateFitProfileName";

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

function saveProfile(db, profile) {
    return new Promise((resolve, reject) => {
        const record = { ...profile, id: PROFILE_RECORD_ID, updatedAt: new Date().toISOString() };
        const request = db.transaction(PROFILE_STORE_NAME, "readwrite").objectStore(PROFILE_STORE_NAME).put(record);
        request.onsuccess = () => resolve(record);
        request.onerror = () => reject(request.error);
    });
}

function deleteProfile(db) {
    return new Promise((resolve, reject) => {
        const request = db.transaction(PROFILE_STORE_NAME, "readwrite").objectStore(PROFILE_STORE_NAME).delete(PROFILE_RECORD_ID);
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
        minute: "2-digit"
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
    badge.title = profile?.username ? `Open profile for ${name}` : "Create your profile";
}

function populateProfileForm(profile) {
    if (!profile) return;
    const fieldMap = {
        username: profile.username || "",
        userAge: profile.age || "",
        userHeight: profile.height || "",
        userWeight: profile.weight || "",
        userTarget: profile.target || "",
        dietType: profile.dietType || "",
        lactoseIntolerant: profile.lactoseIntolerant || "",
        bodyType: profile.bodyType || "",
        activityLevel: profile.activityLevel || "",
        profileNotes: profile.notes || ""
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
        target: document.getElementById("userTarget").value,
        dietType: document.getElementById("dietType").value,
        lactoseIntolerant: document.getElementById("lactoseIntolerant").value,
        bodyType: document.getElementById("bodyType").value,
        activityLevel: document.getElementById("activityLevel").value,
        notes: document.getElementById("profileNotes").value.trim()
    };
}

function renderProfileSummary(profile) {
    const summary = document.getElementById("profileSummary");
    if (!summary) return;

    if (!profile) {
        summary.innerHTML = '<div class="profileEmpty">Complete the form to store your measurements, target, and dietary preferences in IndexedDB.</div>';
        return;
    }

    const bmi = calculateBmi(profile.height, profile.weight);
    const bmiText = bmi ? `${bmi.toFixed(1)} (${bmiLabel(bmi)})` : "Not available";
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
                <div class="profileStat"><span>BMI</span><strong>${bmiText}</strong></div>
                <div class="profileStat"><span>Diet</span><strong>${profile.dietType}</strong></div>
                <div class="profileStat"><span>Body type</span><strong>${profile.bodyType}</strong></div>
                <div class="profileStat"><span>Lactose</span><strong>${profile.lactoseIntolerant}</strong></div>
                <div class="profileStat"><span>Activity</span><strong>${profile.activityLevel}</strong></div>
            </div>
            <div class="profileNote">${notesText}</div>
        </div>`;
}

async function loadProfileState() {
    try {
        const db = await openProfileDatabase();
        const profile = await getSavedProfile(db);
        if (profile?.username) localStorage.setItem(PROFILE_CACHE_KEY, profile.username);
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
    if (!profile.username || !profile.age || profile.age <= 0 || !profile.height || profile.height <= 0 || !profile.weight || profile.weight <= 0) {
        return "Please complete the username, age, height, and weight fields.";
    }
    if (!profile.target || !profile.dietType || !profile.lactoseIntolerant || !profile.bodyType || !profile.activityLevel) {
        return "Please choose your target, diet, lactose preference, body type, and activity level.";
    }
    return "";
}

document.addEventListener("DOMContentLoaded", async function() {
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
        profileForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const profile = readProfileForm();
            const validationMessage = validateProfile(profile);
            if (validationMessage) {
                setProfileStatus(validationMessage, true);
                return;
            }
            try {
                const savedRecord = await saveProfile(profileDatabase || await openProfileDatabase(), profile);
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
