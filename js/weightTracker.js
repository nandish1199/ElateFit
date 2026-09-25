const WEIGHT_DB_NAME = "elateFitWeightTrackerDB";
const WEIGHT_DB_VERSION = 2;
const WEIGHT_STORE = "weightEntries";
const PHOTO_STORE = "progressPhotos";
const GOAL_MAP_STORE = "goalMapState";
const PERIODS = [7, 15, 30];
let weightDb;
let weightEntries = [];
let progressPhotos = [];
let selectedPeriod = 7;
let savedProfile = null;
let goalMapState = null;

const PROFILE_DB_NAME = "elateFitUserProfileDB";
const PROFILE_STORE_NAME = "profiles";
const PROFILE_RECORD_ID = "profile";

function openWeightDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(WEIGHT_DB_NAME, WEIGHT_DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(WEIGHT_STORE)) {
        const store = db.createObjectStore(WEIGHT_STORE, { keyPath: "id" });
        store.createIndex("recordedAt", "recordedAt");
      }
      if (!db.objectStoreNames.contains(PHOTO_STORE)) {
        const store = db.createObjectStore(PHOTO_STORE, { keyPath: "id" });
        store.createIndex("capturedAt", "capturedAt");
      }
      if (!db.objectStoreNames.contains(GOAL_MAP_STORE)) {
        db.createObjectStore(GOAL_MAP_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getAll(storeName) {
  return new Promise((resolve, reject) => {
    const request = weightDb
      .transaction(storeName, "readonly")
      .objectStore(storeName)
      .getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

function putRecord(storeName, record) {
  return new Promise((resolve, reject) => {
    const request = weightDb
      .transaction(storeName, "readwrite")
      .objectStore(storeName)
      .put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = () => reject(request.error);
  });
}

function removeRecord(storeName, id) {
  return new Promise((resolve, reject) => {
    const request = weightDb
      .transaction(storeName, "readwrite")
      .objectStore(storeName)
      .delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function getGoalMapState() {
  return new Promise((resolve, reject) => {
    const request = weightDb
      .transaction(GOAL_MAP_STORE, "readonly")
      .objectStore(GOAL_MAP_STORE)
      .get("goal");
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function establishGoalMapState() {
  goalMapState = await getGoalMapState();
  if (
    goalMapState ||
    !savedProfile ||
    !Number.isFinite(Number(savedProfile.targetWeight))
  )
    return;
  const firstEntry = weightEntries
    .slice()
    .sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt))[0];
  if (!firstEntry || !Number.isFinite(Number(firstEntry.weight))) return;
  goalMapState = await putRecord(GOAL_MAP_STORE, {
    id: "goal",
    startWeight: Number(firstEntry.weight),
    targetWeight: Number(savedProfile.targetWeight),
    createdAt: new Date().toISOString(),
  });
}

function dateKey(value) {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function setStatus(message, error = true) {
  const status = document.getElementById("weightStatus");
  status.textContent = message;
  status.style.color = error ? "#b42318" : "#16a34a";
}

function getSavedProfile() {
  return new Promise((resolve) => {
    const request = indexedDB.open(PROFILE_DB_NAME, 1);
    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PROFILE_STORE_NAME)) {
        db.close();
        resolve(null);
        return;
      }
      const profileRequest = db
        .transaction(PROFILE_STORE_NAME, "readonly")
        .objectStore(PROFILE_STORE_NAME)
        .get(PROFILE_RECORD_ID);
      profileRequest.onsuccess = () => {
        db.close();
        resolve(profileRequest.result || null);
      };
      profileRequest.onerror = () => {
        db.close();
        resolve(null);
      };
    };
    request.onerror = () => resolve(null);
  });
}

function goalTier(index, total) {
  const progress = total <= 1 ? 1 : index / (total - 1);
  if (progress >= 0.8) return "Diamond";
  if (progress >= 0.6) return "Titanium";
  if (progress >= 0.4) return "Gold";
  if (progress >= 0.2) return "Silver";
  return "Copper";
}

function renderGoalMap() {
  const map = document.getElementById("goalMap");
  const directionLabel = document.getElementById("goalMapDirection");
  const entries = weightEntries
    .slice()
    .sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt));
  const latest = entries[entries.length - 1];
  const currentWeight = latest ? Number(latest.weight) : null;
  const startWeight = goalMapState ? Number(goalMapState.startWeight) : null;
  const targetWeight = goalMapState ? Number(goalMapState.targetWeight) : null;

  if (
    !Number.isFinite(currentWeight) ||
    !Number.isFinite(startWeight) ||
    !Number.isFinite(targetWeight) ||
    targetWeight <= 0
  ) {
    directionLabel.textContent = "Profile target needed";
    map.innerHTML =
      '<div class="goalMapEmpty">Add a weight entry and save a target weight in User Profile to build your goal map.</div>';
    return;
  }

  if (currentWeight === targetWeight) {
    directionLabel.textContent = "Target reached";
    map.innerHTML = `<div class="goalMapComplete"><i class="fa-solid fa-flag-checkered"></i><strong>${currentWeight.toFixed(1)} kg reached</strong><span>Set a new target in your profile to open another route.</span></div>`;
    return;
  }

  const direction = targetWeight > startWeight ? 1 : -1;
  const firstGoal = Math.round(startWeight) + direction;
  const lastGoal = Math.round(targetWeight);
  const goals = [];
  for (
    let weight = firstGoal;
    direction === 1 ? weight <= lastGoal : weight >= lastGoal;
    weight += direction
  ) {
    goals.push(weight);
  }
  const reached = (weight) =>
    direction === 1 ? currentWeight >= weight : currentWeight <= weight;
  const achievedGoals = goals.filter(reached).length;
  const progressRatio = goals.length ? achievedGoals / goals.length : 0;
  directionLabel.textContent =
    direction === 1 ? "Building upward" : "Moving downward";

  const routePoints = goals.map((weight, index) => {
    const progress = goals.length === 1 ? 0.5 : index / (goals.length - 1);
    return {
      weight,
      x: 12 + progress * 74,
      y: 78 - progress * 63 + Math.sin(progress * Math.PI * 4) * 8,
    };
  });
  const routePath = [{ x: 8, y: 78 }, ...routePoints, { x: 92, y: 15 }]
    .map((point, index) => `${index ? "L" : "M"} ${point.x} ${point.y}`)
    .join(" ");

  map.innerHTML = `<div class="goalMapSummary"><span>Start <strong>${currentWeight.toFixed(1)} kg</strong></span><span>Target <strong>${targetWeight.toFixed(0)} kg</strong></span><span><strong>${goals.length}</strong> flags</span></div>
    <div class="goalMapViewport"><div class="goalMapTrack"><svg class="goalMapPath" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="goalMapBasePath" d="${routePath}"></path><path class="goalMapProgressPath" pathLength="1" stroke-dasharray="${progressRatio} 1" d="${routePath}"></path></svg><div class="goalMapEndpoint goalMapStart"><span class="goalMapEndpointPin"><i class="fa-solid fa-location-dot"></i></span><strong>Start</strong><small>${startWeight.toFixed(1)} kg</small></div>${goals
      .map((weight, index) => {
        const tier = goalTier(index, goals.length);
        const achieved = reached(weight);
        const point = routePoints[index];
        return `<div class="goalFlag batch-${tier.toLowerCase()} ${achieved ? "achieved" : ""}" style="--flag-left:${point.x}%;--flag-top:${point.y}%" title="${tier} goal: ${weight} kg"><div class="goalFlagPole"></div><div class="goalFlagCloth"><i class="fa-solid fa-flag"></i></div><div class="goalFlagLabel"><strong>${weight} kg</strong><span>${tier}</span>${achieved ? "<small>Achieved</small>" : ""}</div></div>`;
      })
      .join(
        "",
      )}<div class="goalMapEndpoint goalMapFinish"><span class="goalMapEndpointPin"><i class="fa-solid fa-flag-checkered"></i></span><strong>Finish</strong><small>${targetWeight.toFixed(0)} kg</small></div></div></div>
    <div class="goalBatchLegend" aria-label="Goal batches">${["Copper", "Silver", "Gold", "Titanium", "Diamond"].map((tier) => `<span class="batch-${tier.toLowerCase()}"><i class="fa-solid fa-flag"></i>${tier}</span>`).join("")}</div>`;
}

function rangeData() {
  const end = new Date();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - selectedPeriod + 1);
  const values = [];
  for (let offset = selectedPeriod - 1; offset >= 0; offset -= 1) {
    const date = new Date(end);
    date.setDate(end.getDate() - offset);
    const key = dateKey(date);
    const entries = weightEntries.filter(
      (entry) => dateKey(entry.recordedAt) === key,
    );
    const latest = entries.sort(
      (a, b) => new Date(b.recordedAt) - new Date(a.recordedAt),
    )[0];
    values.push({
      date,
      label: new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
      }).format(date),
      weight: latest ? latest.weight : null,
    });
  }
  return values;
}

function drawChart(data) {
  const canvas = document.getElementById("weightChart");
  const context = canvas.getContext("2d");
  const width = canvas.clientWidth || 600;
  const height = canvas.clientHeight || 300;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  const pad = { top: 22, right: 18, bottom: 40, left: 44 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const weights = data
    .filter((item) => item.weight !== null)
    .map((item) => item.weight);
  const min = weights.length ? Math.floor(Math.min(...weights) - 2) : 0;
  const max = weights.length ? Math.ceil(Math.max(...weights) + 2) : 10;
  const span = Math.max(5, max - min);
  context.font = "11px Segoe UI, sans-serif";
  context.strokeStyle = "#dce9df";
  context.fillStyle = "#64756a";
  for (let tick = 0; tick <= 4; tick += 1) {
    const y = pad.top + chartHeight - (chartHeight * tick) / 4;
    context.beginPath();
    context.moveTo(pad.left, y);
    context.lineTo(width - pad.right, y);
    context.stroke();
    context.fillText((min + (span * tick) / 4).toFixed(0), 8, y + 4);
  }
  const points = data
    .map((item, index) =>
      item.weight === null
        ? null
        : {
            x: pad.left + (chartWidth * index) / Math.max(1, data.length - 1),
            y:
              pad.top +
              chartHeight -
              (chartHeight * (item.weight - min)) / span,
          },
    )
    .filter(Boolean);
  if (points.length) {
    context.beginPath();
    points.forEach((point, index) =>
      index
        ? context.lineTo(point.x, point.y)
        : context.moveTo(point.x, point.y),
    );
    context.strokeStyle = "#16a34a";
    context.lineWidth = 2.5;
    context.stroke();
    context.fillStyle = "#16a34a";
    points.forEach((point) => {
      context.beginPath();
      context.arc(point.x, point.y, 4, 0, Math.PI * 2);
      context.fill();
    });
  }
  const labelStep = data.length > 20 ? 5 : data.length > 10 ? 3 : 1;
  context.fillStyle = "#64756a";
  data.forEach((item, index) => {
    if (index % labelStep === 0 || index === data.length - 1) {
      const x = pad.left + (chartWidth * index) / Math.max(1, data.length - 1);
      context.fillText(item.label, x - 16, height - 12);
    }
  });
}

function renderStats() {
  const values = weightEntries
    .slice()
    .sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt));
  const latest = values[values.length - 1];
  const first = values[0];
  const change = latest && first ? latest.weight - first.weight : 0;
  document.getElementById("currentWeight").textContent = latest
    ? `${latest.weight.toFixed(1)} kg`
    : "--";
  document.getElementById("weightChange").textContent =
    latest && first ? `${change > 0 ? "+" : ""}${change.toFixed(1)} kg` : "--";
  document.getElementById("weightEntries").textContent = values.length;
  drawChart(rangeData());
  renderGoalMap();
}

function renderEntries() {
  const list = document.getElementById("weightEntryList");
  const entries = weightEntries
    .slice()
    .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));
  list.innerHTML = entries.length
    ? entries
        .map(
          (entry) => `
        <div class="weightEntry"><div><div class="entryName">${entry.weight.toFixed(1)} kg</div><div class="entryMeta">${formatDate(entry.recordedAt)}${entry.notes ? ` · ${entry.notes}` : ""}</div></div><div class="entryActions"><button type="button" class="deleteWeight" data-id="${entry.id}" aria-label="Delete ${entry.weight} kilogram entry"><i class="fa-solid fa-xmark"></i></button></div></div>`,
        )
        .join("")
    : '<div class="emptyState">No weight entries yet. Record your first measurement to start the chart.</div>';
}

function renderPhotos() {
  const grid = document.getElementById("photoGrid");
  const photos = progressPhotos
    .slice()
    .sort((a, b) => new Date(b.capturedAt) - new Date(a.capturedAt));
  photos.forEach((photo) => {
    if (photo.photoBlob && !photo.photoUrl)
      photo.photoUrl = URL.createObjectURL(photo.photoBlob);
  });
  grid.innerHTML = photos.length
    ? photos
        .map(
          (photo) =>
            `<figure class="photoCard"><button type="button" class="photoPreview" data-id="${photo.id}" aria-label="View progress photo from ${formatDate(photo.capturedAt)}"><img src="${photo.photoUrl}" alt="Progress photo from ${formatDate(photo.capturedAt)}" /></button><figcaption>${formatDate(photo.capturedAt)}${photo.note ? `<br>${photo.note}` : ""}<button type="button" class="deletePhoto" data-id="${photo.id}" aria-label="Delete progress photo"><i class="fa-solid fa-trash"></i></button></figcaption></figure>`,
        )
        .join("")
    : '<div class="emptyState">No progress photos yet. Add one each month to compare your journey.</div>';
}

function closePhotoViewer() {
  const viewer = document.getElementById("photoViewer");
  viewer.hidden = true;
  document.body.style.overflow = "";
}

function openPhotoViewer(photo) {
  const viewer = document.getElementById("photoViewer");
  document.getElementById("photoViewerTitle").textContent =
    `Progress photo from ${formatDate(photo.capturedAt)}`;
  const image = document.getElementById("photoViewerImage");
  image.src = photo.photoUrl;
  image.alt = `Progress photo from ${formatDate(photo.capturedAt)}`;
  document.getElementById("photoViewerNote").textContent = photo.note || "";
  viewer.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("closePhotoViewer").focus();
}

async function refresh() {
  weightEntries = await getAll(WEIGHT_STORE);
  progressPhotos = await getAll(PHOTO_STORE);
  renderStats();
  renderEntries();
  renderPhotos();
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    weightDb = await openWeightDatabase();
    savedProfile = await getSavedProfile();
    weightEntries = await getAll(WEIGHT_STORE);
    await establishGoalMapState();
    await refresh();
    document
      .getElementById("weightForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        const weight = Number(document.getElementById("weightValue").value);
        if (!weight || weight <= 0) {
          setStatus("Enter a valid weight.");
          return;
        }
        await putRecord(WEIGHT_STORE, {
          id: crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
          weight,
          notes: document.getElementById("weightNotes").value.trim(),
          recordedAt: new Date().toISOString(),
        });
        this.reset();
        setStatus("Weight entry saved.", false);
        await establishGoalMapState();
        await refresh();
      });
    document
      .getElementById("photoForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        const file = document.getElementById("progressPhoto").files[0];
        if (!file || !file.type.startsWith("image/")) {
          setStatus("Choose an image for the progress photo.");
          return;
        }
        await putRecord(PHOTO_STORE, {
          id: crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
          photoBlob: file,
          note: document.getElementById("photoNote").value.trim(),
          capturedAt: new Date().toISOString(),
        });
        this.reset();
        setStatus("Progress photo saved.", false);
        await refresh();
      });
    document
      .getElementById("weightEntryList")
      .addEventListener("click", async (event) => {
        const button = event.target.closest(".deleteWeight");
        if (button && confirm("Delete this weight entry?")) {
          await removeRecord(WEIGHT_STORE, button.dataset.id);
          await refresh();
        }
      });
    document
      .getElementById("photoGrid")
      .addEventListener("click", async (event) => {
        const deleteButton = event.target.closest(".deletePhoto");
        if (deleteButton) {
          if (confirm("Delete this progress photo?")) {
            await removeRecord(PHOTO_STORE, deleteButton.dataset.id);
            await refresh();
          }
          return;
        }
        const previewButton = event.target.closest(".photoPreview");
        if (previewButton) {
          const photo = progressPhotos.find(
            (item) => item.id === previewButton.dataset.id,
          );
          if (photo) openPhotoViewer(photo);
        }
      });
    document
      .getElementById("closePhotoViewer")
      .addEventListener("click", closePhotoViewer);
    document
      .querySelector("[data-close-photo-viewer]")
      .addEventListener("click", closePhotoViewer);
    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        !document.getElementById("photoViewer").hidden
      )
        closePhotoViewer();
    });
    document.querySelectorAll(".periodButton").forEach((button) =>
      button.addEventListener("click", function () {
        selectedPeriod = Number(this.dataset.period);
        document
          .querySelectorAll(".periodButton")
          .forEach((item) => item.classList.remove("active"));
        this.classList.add("active");
        renderStats();
      }),
    );
    window.addEventListener("resize", () => drawChart(rangeData()));
  } catch (error) {
    console.error("Unable to initialize weight tracker:", error);
    setStatus("Weight tracker storage is unavailable in this browser.");
  }
});
