const SERUM_DB_NAME = "elateFitSerumTrackerDB";
const SERUM_DB_VERSION = 1;
const SERUM_STORE = "serums";
const APPLICATION_STORE = "applications";
const WEEKDAY_INDEX = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PERIODS = [
  { label: "7 days", value: 7 },
  { label: "15 days", value: 15 },
  { label: "1 month", value: 30 },
  { label: "3 months", value: 90 },
  { label: "6 months", value: 180 },
];

let serumDb;
let serums = [];
let applications = [];
let activePeriod = 7;
let editingSerumId = null;

function openSerumDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(SERUM_DB_NAME, SERUM_DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(SERUM_STORE)) {
        const store = db.createObjectStore(SERUM_STORE, { keyPath: "id" });
        store.createIndex("name", "name");
        store.createIndex("updatedAt", "updatedAt");
      }
      if (!db.objectStoreNames.contains(APPLICATION_STORE)) {
        const store = db.createObjectStore(APPLICATION_STORE, {
          keyPath: "id",
        });
        store.createIndex("serumId", "serumId");
        store.createIndex("appliedAt", "appliedAt");
        store.createIndex("dayKey", "dayKey");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function readAll(storeName) {
  return new Promise((resolve, reject) => {
    const request = serumDb
      .transaction(storeName, "readonly")
      .objectStore(storeName)
      .getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

function saveRecord(storeName, record) {
  return new Promise((resolve, reject) => {
    const request = serumDb
      .transaction(storeName, "readwrite")
      .objectStore(storeName)
      .put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = () => reject(request.error);
  });
}

function deleteRecord(storeName, id) {
  return new Promise((resolve, reject) => {
    const request = serumDb
      .transaction(storeName, "readwrite")
      .objectStore(storeName)
      .delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function clearApplicationsForSerum(serumId) {
  return new Promise((resolve, reject) => {
    const transaction = serumDb.transaction(APPLICATION_STORE, "readwrite");
    const store = transaction.objectStore(APPLICATION_STORE);
    const request = store.getAll();
    request.onsuccess = () => {
      const records = (request.result || []).filter(
        (item) => item.serumId === serumId,
      );
      records.forEach((item) => store.delete(item.id));
      resolve();
    };
    request.onerror = () => reject(request.error);
  });
}

function dayKey(date) {
  const local = new Date(date);
  return `${local.getFullYear()}-${String(local.getMonth() + 1).padStart(2, "0")}-${String(local.getDate()).padStart(2, "0")}`;
}

function formatDate(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
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

function setStatus(message, error = true) {
  const status = document.getElementById("serumStatus");
  status.textContent = message;
  status.style.color = error ? "#B42318" : "#16A34A";
}

function serumDaysLabel(days) {
  return days.length === 7
    ? "Daily"
    : `${days.length} day${days.length === 1 ? "" : "s"}`;
}

function normalizeSerum(formData) {
  return {
    id:
      editingSerumId ||
      (crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`),
    name: formData.name,
    dosage: formData.dosage,
    time: formData.time,
    notes: formData.notes,
    days: formData.days,
    active: formData.active,
    updatedAt: new Date().toISOString(),
  };
}

function readSerumForm() {
  const days = [...document.querySelectorAll(".serumDay input:checked")].map(
    (input) => input.value,
  );
  return {
    name: document.getElementById("serumName").value.trim(),
    dosage: document.getElementById("serumDosage").value.trim(),
    time: document.getElementById("serumTime").value,
    notes: document.getElementById("serumNotes").value.trim(),
    days: days.length ? days : WEEKDAY_INDEX,
    active: document.getElementById("serumActive")?.checked !== false,
  };
}

function fillSerumForm(serum) {
  editingSerumId = serum ? serum.id : null;
  document.getElementById("serumFormTitle").textContent = serum
    ? "Update serum"
    : "Configure serum";
  document.getElementById("saveSerumBtn").innerHTML = serum
    ? '<i class="fa-solid fa-floppy-disk"></i> Update serum'
    : '<i class="fa-solid fa-plus"></i> Add serum';
  document.getElementById("serumName").value = serum?.name || "";
  document.getElementById("serumDosage").value = serum?.dosage || "";
  document.getElementById("serumTime").value = serum?.time || "";
  document.getElementById("serumNotes").value = serum?.notes || "";
  document.getElementById("serumActive").checked = serum
    ? serum.active !== false
    : true;
  document.querySelectorAll(".serumDay input").forEach((input) => {
    input.checked = serum ? serum.days.includes(input.value) : true;
  });
}

function getPeriodDays() {
  return activePeriod;
}

function currentDateRange() {
  const days = getPeriodDays();
  const end = new Date();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - days + 1);
  return { start, end, days };
}

function scheduleForToday(serum) {
  return (
    serum.active !== false &&
    serum.days.includes(WEEKDAY_INDEX[new Date().getDay()])
  );
}

function appliedTodaySet() {
  const today = dayKey(new Date());
  return new Set(
    applications
      .filter((item) => item.dayKey === today)
      .map((item) => item.serumId),
  );
}

function isAppliedToday(serumId) {
  return appliedTodaySet().has(serumId);
}

function renderSerumList() {
  const list = document.getElementById("serumList");
  if (!serums.length) {
    list.innerHTML =
      '<div class="serumEmpty">No serums configured yet. Add the name, dose, time, and schedule to start tracking.</div>';
    return;
  }

  list.innerHTML = serums
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .map((serum) => {
      const activeDays = serum.days.join(", ");
      return `
                <div class="serumItem">
                    <div class="serumItemHeader">
                        <div>
                            <div class="serumItemName">${serum.name}</div>
                            <div class="serumItemMeta">${serum.dosage || "No dosage"} · ${serum.time || "No time"} · ${serumDaysLabel(serum.days)}</div>
                            <div class="serumItemMeta">Days: ${activeDays}</div>
                        </div>
                        <div class="serumPill">${serum.active ? "Active" : "Paused"}</div>
                    </div>
                    <div class="serumItemMeta">${serum.notes || "No extra notes saved."}</div>
                    <div class="serumItemActions">
                        <button type="button" class="editSerum" data-id="${serum.id}"><i class="fa-solid fa-pen"></i> Edit</button>
                        <button type="button" class="toggleSerum" data-id="${serum.id}"><i class="fa-solid fa-power-off"></i> ${serum.active ? "Pause" : "Activate"}</button>
                        <button type="button" class="deleteSerum" data-id="${serum.id}"><i class="fa-solid fa-trash"></i> Delete</button>
                    </div>
                </div>`;
    })
    .join("");
}

function renderChecklist() {
  const checklist = document.getElementById("dailyChecklist");
  const todayApps = appliedTodaySet();
  const todaySerums = serums.filter(scheduleForToday);

  document.getElementById("todayScheduledCount").textContent =
    todaySerums.length;
  document.getElementById("todayAppliedCount").textContent = todayApps.size;
  document.getElementById("todayPendingCount").textContent = Math.max(
    todaySerums.length - todayApps.size,
    0,
  );

  if (!todaySerums.length) {
    checklist.innerHTML =
      '<div class="serumEmpty">No serums are scheduled for today. Update your schedule in the configure panel.</div>';
    return;
  }

  checklist.innerHTML = todaySerums
    .map((serum) => {
      const applied = todayApps.has(serum.id);
      return `
            <label class="checklistItem ${applied ? "is-applied" : ""}">
                <input type="checkbox" class="markApplied" data-id="${serum.id}" ${applied ? "checked" : ""} />
                <div>
                    <div class="checklistHeader">
                        <div>
                            <div class="checklistName">${serum.name}</div>
                            <div class="checklistMeta">${serum.dosage || "No dosage"} · ${serum.time || "No time"}</div>
                        </div>
                        <div class="serumPill">${applied ? "Applied" : "Pending"}</div>
                    </div>
                    <div class="checklistMeta">${serum.notes || "No extra notes saved."}</div>
                    <small>Scheduled for ${WEEKDAY_INDEX[new Date().getDay()]}</small>
                </div>
            </label>`;
    })
    .join("");
}

function chartData() {
  const { start, end, days } = currentDateRange();
  const values = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(end);
    date.setDate(end.getDate() - offset);
    const key = dayKey(date);
    const count = applications.filter((item) => item.dayKey === key).length;
    values.push({
      key,
      date,
      shortLabel: new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
      }).format(date),
      monthLabel: new Intl.DateTimeFormat(undefined, { month: "short" }).format(
        date,
      ),
      count,
    });
  }
  return values;
}

function drawChart(data, days) {
  const canvas = document.getElementById("serumChart");
  const context = canvas.getContext("2d");
  const width = canvas.clientWidth || 600;
  const height = canvas.clientHeight || 300;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);

  const pad = { top: 24, right: 18, bottom: 42, left: 40 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const maxValue = Math.max(1, ...data.map((item) => item.count));
  const axisLabels = [];

  context.font = "11px Segoe UI, sans-serif";
  context.strokeStyle = "#DCE9DF";
  context.fillStyle = "#64756A";
  context.textAlign = "center";

  for (let tick = 0; tick <= 4; tick += 1) {
    const y = pad.top + chartHeight - (chartHeight * tick) / 4;
    context.beginPath();
    context.moveTo(pad.left, y);
    context.lineTo(width - pad.right, y);
    context.stroke();
    context.fillText(Math.round((maxValue * tick) / 4), 6, y + 4);
  }

  data.forEach((item, index) => {
    const x = pad.left + (chartWidth * index) / Math.max(1, data.length - 1);
    const barWidth = Math.max(10, chartWidth / Math.max(8, data.length * 2));
    const barHeight = (chartHeight * item.count) / maxValue;
    const y = pad.top + chartHeight - barHeight;
    context.fillStyle = "#16A34A";
    context.fillRect(x - barWidth / 2, y, barWidth, barHeight);
    if (days > 30) {
      const previous = data[index - 1];
      const next = data[index + 1];
      const isBoundary =
        index === 0 ||
        index === data.length - 1 ||
        !previous ||
        item.date.getMonth() !== previous.date.getMonth() ||
        !next ||
        item.date.getMonth() !== next.date.getMonth();
      if (isBoundary) axisLabels.push({ x, text: item.monthLabel });
    } else {
      const labelStep = data.length > 15 ? 4 : data.length > 8 ? 2 : 1;
      if (index % labelStep === 0 || index === data.length - 1) {
        axisLabels.push({ x, text: item.shortLabel });
      }
    }
  });

  let lastLabelRight = -Infinity;
  axisLabels.forEach((label) => {
    const textWidth = context.measureText(label.text).width;
    const leftEdge = label.x - textWidth / 2;
    const rightEdge = label.x + textWidth / 2;
    if (leftEdge <= lastLabelRight + 8) return;
    context.fillStyle = "#64756A";
    context.fillText(label.text, label.x, height - 12);
    lastLabelRight = rightEdge;
  });
}

function updateStats() {
  const { days } = currentDateRange();
  const data = chartData();
  const totalApplied = applications.filter((item) => {
    const appliedDate = new Date(item.appliedAt);
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - days + 1);
    return appliedDate >= start;
  }).length;
  const totalScheduled = serums.filter(scheduleForToday).length;
  const completionRate = totalScheduled
    ? Math.round((appliedTodaySet().size / totalScheduled) * 100)
    : 0;

  document.getElementById("periodApplications").textContent = totalApplied;
  document.getElementById("periodScheduled").textContent = totalScheduled;
  document.getElementById("completionRate").textContent = `${completionRate}%`;
  drawChart(data, days);
}

function renderPeriodButtons() {
  const container = document.getElementById("periodButtons");
  container.innerHTML = PERIODS.map(
    (period) =>
      `<button type="button" class="serumFilterButton ${period.value === activePeriod ? "active" : ""}" data-period="${period.value}">${period.label}</button>`,
  ).join("");
}

async function refreshDashboard() {
  serums = await readAll(SERUM_STORE);
  applications = await readAll(APPLICATION_STORE);
  renderSerumList();
  renderChecklist();
  renderPeriodButtons();
  updateStats();
}

function serumValidation(form) {
  if (!form.name || !form.dosage || !form.time)
    return "Please add serum name, dosage, and time.";
  if (!form.days.length) return "Please select at least one scheduled day.";
  return "";
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    serumDb = await openSerumDatabase();
    await refreshDashboard();

    document
      .getElementById("serumForm")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        const form = readSerumForm();
        const error = serumValidation(form);
        if (error) {
          setStatus(error, true);
          return;
        }
        const serum = normalizeSerum(form);
        await saveRecord(SERUM_STORE, serum);
        editingSerumId = null;
        fillSerumForm(null);
        setStatus("Serum saved successfully.", false);
        await refreshDashboard();
      });

    document
      .getElementById("serumList")
      .addEventListener("click", async function (event) {
        const editButton = event.target.closest(".editSerum");
        const toggleButton = event.target.closest(".toggleSerum");
        const deleteButton = event.target.closest(".deleteSerum");
        if (editButton) {
          const serum = serums.find(
            (item) => item.id === editButton.dataset.id,
          );
          if (serum) fillSerumForm(serum);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        if (toggleButton) {
          const serum = serums.find(
            (item) => item.id === toggleButton.dataset.id,
          );
          if (!serum) return;
          serum.active = !serum.active;
          serum.updatedAt = new Date().toISOString();
          await saveRecord(SERUM_STORE, serum);
          await refreshDashboard();
          return;
        }
        if (deleteButton) {
          const serum = serums.find(
            (item) => item.id === deleteButton.dataset.id,
          );
          if (!serum || !confirm(`Delete serum ${serum.name}?`)) return;
          await clearApplicationsForSerum(serum.id);
          await deleteRecord(SERUM_STORE, serum.id);
          if (editingSerumId === serum.id) fillSerumForm(null);
          setStatus(`Deleted serum ${serum.name}.`, false);
          await refreshDashboard();
        }
      });

    document
      .getElementById("dailyChecklist")
      .addEventListener("change", async function (event) {
        const checkbox = event.target.closest(".markApplied");
        if (!checkbox) return;
        const serum = serums.find((item) => item.id === checkbox.dataset.id);
        if (!serum) return;
        const today = dayKey(new Date());
        const existing = applications.find(
          (item) => item.serumId === serum.id && item.dayKey === today,
        );
        if (checkbox.checked) {
          if (!existing) {
            await saveRecord(APPLICATION_STORE, {
              id: `${serum.id}-${today}`,
              serumId: serum.id,
              serumName: serum.name,
              appliedAt: new Date().toISOString(),
              dayKey: today,
            });
          }
        } else if (existing) {
          await deleteRecord(APPLICATION_STORE, existing.id);
        }
        await refreshDashboard();
      });

    document
      .getElementById("periodButtons")
      .addEventListener("click", async function (event) {
        const button = event.target.closest(".serumFilterButton");
        if (!button) return;
        activePeriod = Number(button.dataset.period);
        renderPeriodButtons();
        updateStats();
      });

    document
      .getElementById("resetFormBtn")
      .addEventListener("click", function () {
        editingSerumId = null;
        fillSerumForm(null);
        setStatus("Form cleared.", false);
      });

    window.addEventListener("resize", updateStats);
  } catch (error) {
    console.error("Unable to initialize serum tracker:", error);
    setStatus("Serum storage is unavailable in this browser.", true);
  }
});
