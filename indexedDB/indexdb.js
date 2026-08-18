const DB_NAME = 'workoutDB';
const STORE_NAME = 'shoulderPress';
const RECORD_KEY = 'shoulderPressCount';

const countInput = document.getElementById('workoutCount');
const saveBtn = document.getElementById('saveWorkoutBtn');
const resetBtn = document.getElementById('resetWorkoutBtn');
const savedCountText = document.getElementById('savedWorkoutCount');

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };

        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function () {
            reject(request.error);
        };
    });
}

function getWorkoutCount(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(RECORD_KEY);

        request.onsuccess = function () {
            const result = request.result;
            resolve(result ? result.count : 0);
        };

        request.onerror = function () {
            reject(request.error);
        };
    });
}

function saveWorkoutCount(db, count) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put({ id: RECORD_KEY, count: Number(count) });

        request.onsuccess = function () {
            resolve();
        };

        request.onerror = function () {
            reject(request.error);
        };
    });
}

function resetWorkoutCount(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put({ id: RECORD_KEY, count: 0 });

        request.onsuccess = function () {
            resolve();
        };

        request.onerror = function () {
            reject(request.error);
        };
    });
}

async function loadSavedWorkout() {
    try {
        const db = await openDatabase();
        const savedCount = await getWorkoutCount(db);
        countInput.value = savedCount;
        savedCountText.textContent = savedCount;
    } catch (error) {
        console.error('Failed to load workout count:', error);
    }
}

saveBtn.addEventListener('click', async function () {
    try {
        const db = await openDatabase();
        const count = Number(countInput.value) || 0;
        await saveWorkoutCount(db, count);
        savedCountText.textContent = count;
        console.log('Saved shoulder press count:', count);
    } catch (error) {
        console.error('Failed to save workout count:', error);
    }
});

resetBtn.addEventListener('click', async function () {
    try {
        const db = await openDatabase();
        await resetWorkoutCount(db);
        countInput.value = 0;
        savedCountText.textContent = 0;
        console.log('Workout count reset to 0');
    } catch (error) {
        console.error('Failed to reset workout count:', error);
    }
});

loadSavedWorkout();