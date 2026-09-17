const WEIGHT_DB_NAME = "elateFitWeightTrackerDB";
const WEIGHT_DB_VERSION = 1;
const WEIGHT_STORE = "weightEntries";
const PHOTO_STORE = "progressPhotos";
const PERIODS = [7, 15, 30];
let weightDb;
let weightEntries = [];
let progressPhotos = [];
let selectedPeriod = 7;

function openWeightDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(WEIGHT_DB_NAME, WEIGHT_DB_VERSION);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(WEIGHT_STORE)) {
                const store = db.createObjectStore(WEIGHT_STORE, { keyPath: "id" });
                store.createIndex("recordedAt", "recordedAt");
            }
            if (!db.objectStoreNames.contains(PHOTO_STORE)) {
                const store = db.createObjectStore(PHOTO_STORE, { keyPath: "id" });
                store.createIndex("capturedAt", "capturedAt");
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function getAll(storeName) {
    return new Promise((resolve, reject) => {
        const request = weightDb.transaction(storeName, "readonly").objectStore(storeName).getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
    });
}

function putRecord(storeName, record) {
    return new Promise((resolve, reject) => {
        const request = weightDb.transaction(storeName, "readwrite").objectStore(storeName).put(record);
        request.onsuccess = () => resolve(record);
        request.onerror = () => reject(request.error);
    });
}

function removeRecord(storeName, id) {
    return new Promise((resolve, reject) => {
        const request = weightDb.transaction(storeName, "readwrite").objectStore(storeName).delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function dateKey(value) {
    const date = new Date(value);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDate(value) {
    return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function setStatus(message, error = true) {
    const status = document.getElementById("weightStatus");
    status.textContent = message;
    status.style.color = error ? "#a45e4c" : "#1f6b5b";
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
        const entries = weightEntries.filter(entry => dateKey(entry.recordedAt) === key);
        const latest = entries.sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt))[0];
        values.push({ date, label: new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date), weight: latest ? latest.weight : null });
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
    const weights = data.filter(item => item.weight !== null).map(item => item.weight);
    const min = weights.length ? Math.floor(Math.min(...weights) - 2) : 0;
    const max = weights.length ? Math.ceil(Math.max(...weights) + 2) : 10;
    const span = Math.max(5, max - min);
    context.font = "11px Segoe UI, sans-serif";
    context.strokeStyle = "#e3ebe6";
    context.fillStyle = "#687873";
    for (let tick = 0; tick <= 4; tick += 1) {
        const y = pad.top + chartHeight - chartHeight * tick / 4;
        context.beginPath(); context.moveTo(pad.left, y); context.lineTo(width - pad.right, y); context.stroke();
        context.fillText((min + span * tick / 4).toFixed(0), 8, y + 4);
    }
    const points = data.map((item, index) => item.weight === null ? null : {
        x: pad.left + chartWidth * index / Math.max(1, data.length - 1),
        y: pad.top + chartHeight - chartHeight * (item.weight - min) / span
    }).filter(Boolean);
    if (points.length) {
        context.beginPath();
        points.forEach((point, index) => index ? context.lineTo(point.x, point.y) : context.moveTo(point.x, point.y));
        context.strokeStyle = "#1f6b5b"; context.lineWidth = 2.5; context.stroke();
        context.fillStyle = "#1f6b5b";
        points.forEach(point => { context.beginPath(); context.arc(point.x, point.y, 4, 0, Math.PI * 2); context.fill(); });
    }
    const labelStep = data.length > 20 ? 5 : data.length > 10 ? 3 : 1;
    context.fillStyle = "#687873";
    data.forEach((item, index) => {
        if (index % labelStep === 0 || index === data.length - 1) {
            const x = pad.left + chartWidth * index / Math.max(1, data.length - 1);
            context.fillText(item.label, x - 16, height - 12);
        }
    });
}

function renderStats() {
    const values = weightEntries.slice().sort((a, b) => new Date(a.recordedAt) - new Date(b.recordedAt));
    const latest = values[values.length - 1];
    const first = values[0];
    const change = latest && first ? latest.weight - first.weight : 0;
    document.getElementById("currentWeight").textContent = latest ? `${latest.weight.toFixed(1)} kg` : "--";
    document.getElementById("weightChange").textContent = latest && first ? `${change > 0 ? "+" : ""}${change.toFixed(1)} kg` : "--";
    document.getElementById("weightEntries").textContent = values.length;
    drawChart(rangeData());
}

function renderEntries() {
    const list = document.getElementById("weightEntryList");
    const entries = weightEntries.slice().sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));
    list.innerHTML = entries.length ? entries.map(entry => `
        <div class="weightEntry"><div><div class="entryName">${entry.weight.toFixed(1)} kg</div><div class="entryMeta">${formatDate(entry.recordedAt)}${entry.notes ? ` · ${entry.notes}` : ""}</div></div><div class="entryActions"><button type="button" class="deleteWeight" data-id="${entry.id}" aria-label="Delete ${entry.weight} kilogram entry"><i class="fa-solid fa-xmark"></i></button></div></div>`).join("") : '<div class="emptyState">No weight entries yet. Record your first measurement to start the chart.</div>';
}

function renderPhotos() {
    const grid = document.getElementById("photoGrid");
    const photos = progressPhotos.slice().sort((a, b) => new Date(b.capturedAt) - new Date(a.capturedAt));
    photos.forEach(photo => { if (photo.photoBlob && !photo.photoUrl) photo.photoUrl = URL.createObjectURL(photo.photoBlob); });
    grid.innerHTML = photos.length ? photos.map(photo => `<figure class="photoCard"><img src="${photo.photoUrl}" alt="Progress photo from ${formatDate(photo.capturedAt)}" /><figcaption>${formatDate(photo.capturedAt)}${photo.note ? `<br>${photo.note}` : ""}<button type="button" class="deletePhoto" data-id="${photo.id}" aria-label="Delete progress photo"><i class="fa-solid fa-trash"></i></button></figcaption></figure>`).join("") : '<div class="emptyState">No progress photos yet. Add one each month to compare your journey.</div>';
}

async function refresh() {
    weightEntries = await getAll(WEIGHT_STORE);
    progressPhotos = await getAll(PHOTO_STORE);
    renderStats(); renderEntries(); renderPhotos();
}

document.addEventListener("DOMContentLoaded", async function() {
    try {
        weightDb = await openWeightDatabase();
        await refresh();
        document.getElementById("weightForm").addEventListener("submit", async function(event) {
            event.preventDefault();
            const weight = Number(document.getElementById("weightValue").value);
            if (!weight || weight <= 0) { setStatus("Enter a valid weight."); return; }
            await putRecord(WEIGHT_STORE, { id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, weight, notes: document.getElementById("weightNotes").value.trim(), recordedAt: new Date().toISOString() });
            this.reset(); setStatus("Weight entry saved.", false); await refresh();
        });
        document.getElementById("photoForm").addEventListener("submit", async function(event) {
            event.preventDefault();
            const file = document.getElementById("progressPhoto").files[0];
            if (!file || !file.type.startsWith("image/")) { setStatus("Choose an image for the progress photo."); return; }
            await putRecord(PHOTO_STORE, { id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, photoBlob: file, note: document.getElementById("photoNote").value.trim(), capturedAt: new Date().toISOString() });
            this.reset(); setStatus("Progress photo saved.", false); await refresh();
        });
        document.getElementById("weightEntryList").addEventListener("click", async event => { const button = event.target.closest(".deleteWeight"); if (button && confirm("Delete this weight entry?")) { await removeRecord(WEIGHT_STORE, button.dataset.id); await refresh(); } });
        document.getElementById("photoGrid").addEventListener("click", async event => { const button = event.target.closest(".deletePhoto"); if (button && confirm("Delete this progress photo?")) { await removeRecord(PHOTO_STORE, button.dataset.id); await refresh(); } });
        document.querySelectorAll(".periodButton").forEach(button => button.addEventListener("click", function() { selectedPeriod = Number(this.dataset.period); document.querySelectorAll(".periodButton").forEach(item => item.classList.remove("active")); this.classList.add("active"); renderStats(); }));
        window.addEventListener("resize", () => drawChart(rangeData()));
    } catch (error) { console.error("Unable to initialize weight tracker:", error); setStatus("Weight tracker storage is unavailable in this browser."); }
});
