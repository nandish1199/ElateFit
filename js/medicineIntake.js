const MEDICINE_DB = "elateFitMedicineTrackerDB";
const MEDICINE_VERSION = 1;
const MEDICINE_STORE = "medicines";
const INTAKE_STORE = "intakes";
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PERIODS = [
  { label: "7 days", value: 7 },
  { label: "15 days", value: 15 },
  { label: "1 month", value: 30 },
  { label: "3 months", value: 90 },
];

let db;
let medicines = [];
let intakes = [];
let activePeriod = 7;
let editingId = null;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(MEDICINE_DB, MEDICINE_VERSION);
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(MEDICINE_STORE)) {
        const store = database.createObjectStore(MEDICINE_STORE, {
          keyPath: "id",
        });
        store.createIndex("name", "name");
        store.createIndex("updatedAt", "updatedAt");
      }
      if (!database.objectStoreNames.contains(INTAKE_STORE)) {
        const store = database.createObjectStore(INTAKE_STORE, {
          keyPath: "id",
        });
        store.createIndex("medicineId", "medicineId");
        store.createIndex("dayKey", "dayKey");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
function readAll(storeName) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(storeName, "readonly")
      .objectStore(storeName)
      .getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}
function save(storeName, record) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(storeName, "readwrite")
      .objectStore(storeName)
      .put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = () => reject(request.error);
  });
}
function remove(storeName, id) {
  return new Promise((resolve, reject) => {
    const request = db
      .transaction(storeName, "readwrite")
      .objectStore(storeName)
      .delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
function id() {
  return window.crypto?.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}
function key(date) {
  const value = new Date(date);
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
}
function dateLabel(value) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}
function status(message, error = true) {
  const element = document.getElementById("medicineStatus");
  element.textContent = message;
  element.style.color = error ? "#d86d59" : "#167b78";
}
function daysLabel(days) {
  return days.length === 7
    ? "Daily"
    : `${days.length} day${days.length === 1 ? "" : "s"}`;
}
function today() {
  return key(new Date());
}

function formValues() {
  return {
    name: document.getElementById("medicineName").value.trim(),
    dosage: document.getElementById("medicineDosage").value.trim(),
    formType: document.getElementById("medicineFormType").value,
    route: document.getElementById("medicineRoute").value,
    frequency: document.getElementById("medicineFrequency").value,
    time: document.getElementById("medicineTime").value,
    meal: document.getElementById("medicineMeal").value,
    startDate: document.getElementById("medicineStartDate").value,
    endDate: document.getElementById("medicineEndDate").value,
    notes: document.getElementById("medicineNotes").value.trim(),
    days: [...document.querySelectorAll(".medicineDay input:checked")].map(
      (input) => input.value,
    ),
  };
}
function fillForm(medicine = null) {
  editingId = medicine?.id || null;
  document.getElementById("medicineFormTitle").textContent = medicine
    ? "Update medicine"
    : "Add medicine";
  document.getElementById("saveMedicineBtn").innerHTML = medicine
    ? '<i class="fa-solid fa-floppy-disk"></i> Update medicine'
    : '<i class="fa-solid fa-plus"></i> Add medicine';
  const values = {
    medicineName: medicine?.name || "",
    medicineDosage: medicine?.dosage || "",
    medicineTime: medicine?.time || "",
    medicineStartDate: medicine?.startDate || "",
    medicineEndDate: medicine?.endDate || "",
    medicineNotes: medicine?.notes || "",
  };
  Object.entries(values).forEach(([field, value]) => {
    document.getElementById(field).value = value;
  });
  document.getElementById("medicineFormType").value =
    medicine?.formType || "Tablet";
  document.getElementById("medicineRoute").value =
    medicine?.route || "By mouth";
  document.getElementById("medicineFrequency").value =
    medicine?.frequency || "Once daily";
  document.getElementById("medicineMeal").value = medicine?.meal || "Any time";
  document.querySelectorAll(".medicineDay input").forEach((input) => {
    input.checked = medicine ? medicine.days.includes(input.value) : true;
  });
}
function isScheduled(medicine, date = new Date()) {
  const dateKey = key(date);
  return (
    medicine.active !== false &&
    medicine.days.includes(WEEKDAYS[date.getDay()]) &&
    dateKey >= medicine.startDate &&
    (!medicine.endDate || dateKey <= medicine.endDate)
  );
}
function takenToday() {
  return new Set(
    intakes
      .filter((item) => item.dayKey === today())
      .map((item) => item.medicineId),
  );
}

function renderMedicines() {
  const list = document.getElementById("medicineList");
  if (!medicines.length) {
    list.innerHTML =
      '<div class="medicineEmpty">No medicines added yet. Add your first schedule to begin tracking.</div>';
    return;
  }
  list.innerHTML = medicines
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .map(
      (item) =>
        `<div class="medicineItem"><div class="medicineItemHeader"><div><div class="medicineItemName">${item.name}</div><div class="medicineItemMeta">${item.dosage} · ${item.formType} · ${item.frequency}</div><div class="medicineItemMeta">${item.time} · ${item.meal} · ${daysLabel(item.days)}</div></div><div class="medicinePill">${item.active ? "Active" : "Paused"}</div></div><div class="medicineItemMeta">${item.notes || "No extra instructions saved."}</div><div class="medicineItemActions"><button type="button" class="editMedicine" data-id="${item.id}"><i class="fa-solid fa-pen"></i> Edit</button><button type="button" class="toggleMedicine" data-id="${item.id}"><i class="fa-solid fa-power-off"></i> ${item.active ? "Pause" : "Activate"}</button><button type="button" class="deleteMedicine" data-id="${item.id}"><i class="fa-solid fa-trash"></i> Delete</button></div></div>`,
    )
    .join("");
}
function renderChecklist() {
  const scheduled = medicines.filter((item) => isScheduled(item));
  const taken = takenToday();
  const takenCount = scheduled.filter((item) => taken.has(item.id)).length;
  document.getElementById("todayScheduledCount").textContent = scheduled.length;
  document.getElementById("todayTakenCount").textContent = takenCount;
  document.getElementById("todayPendingCount").textContent = Math.max(
    scheduled.length - takenCount,
    0,
  );
  document.getElementById("todayLabel").textContent = dateLabel(today());
  const checklist = document.getElementById("dailyMedicineChecklist");
  if (!scheduled.length) {
    checklist.innerHTML =
      '<div class="medicineEmpty">Nothing is scheduled for today. Add a medicine or update its schedule above.</div>';
    return;
  }
  checklist.innerHTML = scheduled
    .map((item) => {
      const isTaken = taken.has(item.id);
      return `<label class="medicineChecklistItem ${isTaken ? "is-taken" : ""}"><input type="checkbox" class="markMedicineTaken" data-id="${item.id}" ${isTaken ? "checked" : ""} /><div><div class="medicineChecklistHeader"><div><div class="medicineChecklistName">${item.name}</div><div class="medicineChecklistMeta">${item.dosage} · ${item.time} · ${item.meal}</div></div><div class="medicinePill">${isTaken ? "Taken" : "Pending"}</div></div><div class="medicineChecklistMeta">${item.route}${item.notes ? ` · ${item.notes}` : ""}</div><small>${item.frequency} · scheduled for ${WEEKDAYS[new Date().getDay()]}</small></div></label>`;
    })
    .join("");
}
function periodData() {
  const values = [];
  const end = new Date();
  for (let offset = activePeriod - 1; offset >= 0; offset -= 1) {
    const date = new Date(end);
    date.setDate(end.getDate() - offset);
    const dateKey = key(date);
    values.push({
      date,
      dateKey,
      count: intakes.filter((item) => item.dayKey === dateKey).length,
    });
  }
  return values;
}
function drawChart(data) {
  const canvas = document.getElementById("medicineChart");
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
  const max = Math.max(1, ...data.map((item) => item.count));
  context.font = "11px Segoe UI, sans-serif";
  context.strokeStyle = "#e1ebe7";
  context.fillStyle = "#68777a";
  context.textAlign = "center";
  for (let tick = 0; tick <= 4; tick += 1) {
    const y = pad.top + chartHeight - (chartHeight * tick) / 4;
    context.beginPath();
    context.moveTo(pad.left, y);
    context.lineTo(width - pad.right, y);
    context.stroke();
    context.fillText(Math.round((max * tick) / 4), 8, y + 4);
  }
  data.forEach((item, index) => {
    const x = pad.left + (chartWidth * index) / Math.max(1, data.length - 1);
    const barWidth = Math.max(10, chartWidth / Math.max(8, data.length * 2));
    const barHeight = (chartHeight * item.count) / max;
    context.fillStyle = "#167b78";
    context.fillRect(
      x - barWidth / 2,
      pad.top + chartHeight - barHeight,
      barWidth,
      barHeight,
    );
    const step = data.length > 15 ? 4 : data.length > 8 ? 2 : 1;
    if (index % step === 0 || index === data.length - 1) {
      context.fillStyle = "#68777a";
      context.fillText(
        new Intl.DateTimeFormat(undefined, {
          month: "short",
          day: "numeric",
        }).format(item.date),
        x,
        height - 12,
      );
    }
  });
}
function updateStats() {
  const data = periodData();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - activePeriod + 1);
  const taken = intakes.filter(
    (item) => new Date(item.takenAt) >= start,
  ).length;
  const scheduled = data.reduce(
    (total, item) =>
      total +
      medicines.filter((medicine) => isScheduled(medicine, item.date)).length,
    0,
  );
  document.getElementById("periodTaken").textContent = taken;
  document.getElementById("periodScheduled").textContent = scheduled;
  document.getElementById("adherenceRate").textContent =
    `${scheduled ? Math.round((taken / scheduled) * 100) : 0}%`;
  drawChart(data);
}
function renderPeriodButtons() {
  document.getElementById("medicinePeriodButtons").innerHTML = PERIODS.map(
    (period) =>
      `<button type="button" class="${period.value === activePeriod ? "active" : ""}" data-period="${period.value}">${period.label}</button>`,
  ).join("");
}
async function refresh() {
  medicines = await readAll(MEDICINE_STORE);
  intakes = await readAll(INTAKE_STORE);
  renderMedicines();
  renderChecklist();
  renderPeriodButtons();
  updateStats();
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    db = await openDatabase();
    fillForm();
    document.getElementById("medicineStartDate").value = today();
    await refresh();
    document
      .getElementById("medicineForm")
      .addEventListener("submit", async (event) => {
        event.preventDefault();
        const values = formValues();
        if (
          !values.name ||
          !values.dosage ||
          !values.time ||
          !values.startDate
        ) {
          status("Please add the medicine name, dose, time, and start date.");
          return;
        }
        if (!values.days.length) {
          status("Please select at least one scheduled day.");
          return;
        }
        if (values.endDate && values.endDate < values.startDate) {
          status("End date cannot be before the start date.");
          return;
        }
        const existing = medicines.find((item) => item.id === editingId);
        await save(MEDICINE_STORE, {
          ...values,
          id: editingId || id(),
          active: existing ? existing.active !== false : true,
          updatedAt: new Date().toISOString(),
        });
        fillForm();
        document.getElementById("medicineStartDate").value = today();
        status("Medicine saved successfully.", false);
        await refresh();
      });
    document
      .getElementById("medicineList")
      .addEventListener("click", async (event) => {
        const button = event.target.closest("button");
        if (!button) return;
        const medicine = medicines.find(
          (item) => item.id === button.dataset.id,
        );
        if (!medicine) return;
        if (button.classList.contains("editMedicine")) {
          fillForm(medicine);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        if (button.classList.contains("toggleMedicine")) {
          medicine.active = !medicine.active;
          medicine.updatedAt = new Date().toISOString();
          await save(MEDICINE_STORE, medicine);
          await refresh();
          return;
        }
        if (confirm(`Delete medicine ${medicine.name}?`)) {
          await remove(MEDICINE_STORE, medicine.id);
          await Promise.all(
            intakes
              .filter((item) => item.medicineId === medicine.id)
              .map((item) => remove(INTAKE_STORE, item.id)),
          );
          if (editingId === medicine.id) fillForm();
          status(`Deleted ${medicine.name}.`, false);
          await refresh();
        }
      });
    document
      .getElementById("dailyMedicineChecklist")
      .addEventListener("change", async (event) => {
        const checkbox = event.target.closest(".markMedicineTaken");
        if (!checkbox) return;
        const dateKey = today();
        const existing = intakes.find(
          (item) =>
            item.medicineId === checkbox.dataset.id && item.dayKey === dateKey,
        );
        if (checkbox.checked && !existing) {
          const medicine = medicines.find(
            (item) => item.id === checkbox.dataset.id,
          );
          await save(INTAKE_STORE, {
            id: `${checkbox.dataset.id}-${dateKey}`,
            medicineId: checkbox.dataset.id,
            medicineName: medicine.name,
            dayKey: dateKey,
            takenAt: new Date().toISOString(),
          });
        } else if (!checkbox.checked && existing)
          await remove(INTAKE_STORE, existing.id);
        await refresh();
      });
    document
      .getElementById("medicinePeriodButtons")
      .addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button) return;
        activePeriod = Number(button.dataset.period);
        renderPeriodButtons();
        updateStats();
      });
    document
      .getElementById("resetMedicineBtn")
      .addEventListener("click", () => {
        fillForm();
        document.getElementById("medicineStartDate").value = today();
        status("Form cleared.", false);
      });
    window.addEventListener("resize", updateStats);
  } catch (error) {
    console.error("Unable to initialize medicine tracker:", error);
    status("Medicine storage is unavailable in this browser.");
  }
});
