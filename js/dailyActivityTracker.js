const DAILY_ACTIVITY_TRACKERS = [
  {
    id: "calorie",
    label: "Calorie tracker",
    database: "elateFitNutritionDB",
    store: "foodEntries",
    dateField: "createdAt",
  },
  {
    id: "workout",
    label: "Workout tracker",
    database: "elateFitWorkoutDB",
    store: "workouts",
    dateField: "createdAt",
  },
  {
    id: "cardio",
    label: "Cardio",
    storageKey: "elateFitCardioCompletedDays",
  },
  {
    id: "stretch",
    label: "Stretch",
    storageKey: "elateFitStretchCompletedDays",
  },
];

function localDayKey(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function openExistingDatabase(databaseName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName);
    let wasMissing = false;

    request.onupgradeneeded = (event) => {
      if (event.oldVersion !== 0) return;
      wasMissing = true;
      event.target.transaction.abort();
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      if (wasMissing && request.error?.name === "AbortError") {
        resolve(null);
        return;
      }
      reject(request.error || new Error(`Unable to open ${databaseName}.`));
    };
    request.onblocked = () => reject(new Error(`${databaseName} is blocked.`));
  });
}

async function readActivityEntries(databaseName, storeName) {
  const database = await openExistingDatabase(databaseName);
  if (!database) return [];

  if (!database.objectStoreNames.contains(storeName)) {
    database.close();
    return [];
  }

  return new Promise((resolve, reject) => {
    try {
      const request = database
        .transaction(storeName, "readonly")
        .objectStore(storeName)
        .getAll();
      request.onsuccess = () => {
        const entries = request.result || [];
        database.close();
        resolve(entries);
      };
      request.onerror = () => {
        database.close();
        reject(request.error || new Error(`Unable to read ${storeName}.`));
      };
    } catch (error) {
      database.close();
      reject(error);
    }
  });
}

async function hasActivityForToday(tracker, today) {
  if (tracker.storageKey) {
    const storedDays = JSON.parse(localStorage.getItem(tracker.storageKey) || "[]");
    if (!Array.isArray(storedDays)) {
      throw new TypeError(`${tracker.label} completion data is invalid.`);
    }
    return storedDays.includes(today);
  }

  const entries = await readActivityEntries(tracker.database, tracker.store);
  return entries.some(
    (entry) =>
      entry[tracker.dateField] &&
      localDayKey(entry[tracker.dateField]) === today,
  );
}

function setTrackerStatus(trackerId, completed, unavailable = false) {
  const item = document.querySelector(
    `.quickNav a[data-tracker="${trackerId}"]`,
  );
  if (!item) return;

  item.classList.toggle("is-complete", completed);
  item.classList.toggle("is-unavailable", unavailable);
  const label = DAILY_ACTIVITY_TRACKERS.find(
    (tracker) => tracker.id === trackerId,
  )?.label;
  if (label) {
    item.setAttribute(
      "aria-label",
      unavailable
        ? `${label}, today's status is unavailable`
        : `${label}, ${completed ? "completed" : "not completed"} today`,
    );
  }
}

async function refreshDailyActivityTracker() {
  const today = localDayKey(new Date());
  const results = await Promise.allSettled(
    DAILY_ACTIVITY_TRACKERS.map((tracker) =>
      hasActivityForToday(tracker, today),
    ),
  );
  const failedTrackers = [];

  results.forEach((result, index) => {
    const tracker = DAILY_ACTIVITY_TRACKERS[index];
    if (result.status === "fulfilled") {
      setTrackerStatus(tracker.id, result.value);
      return;
    }
    console.error(`Unable to check ${tracker.label} activity:`, result.reason);
    setTrackerStatus(tracker.id, false, true);
    failedTrackers.push(tracker.label);
  });

  if (failedTrackers.length) {
    console.error(
      `Could not check today's status for ${failedTrackers.join(", ")}.`,
    );
  }
}

document.addEventListener("DOMContentLoaded", refreshDailyActivityTracker);
window.addEventListener("pageshow", (event) => {
  if (event.persisted) refreshDailyActivityTracker();
});
window.addEventListener("focus", refreshDailyActivityTracker);
