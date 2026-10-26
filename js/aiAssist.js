const AI_ASSIST_DATABASES = {
  profile: { db: "elateFitUserProfileDB", store: "profiles", version: 1 },
  nutrition: { db: "elateFitNutritionDB", store: "foodEntries", version: 1 },
  cardio: { db: "elateFitCardioDB", store: "plans", version: 1 },
  workout: { db: "elateFitWorkoutDB", store: "workouts", version: 1 },
  stretch: { db: "elateFitStretchDB", store: "plans", version: 1 },
  weight: { db: "elateFitWeightTrackerDB", version: 2 },
};

const AI_ASSIST_COMPLETION_KEYS = {
  cardio: "elateFitCardioCompletedDays",
  breathing: "elateFitBreatheCompletedDays",
  stretch: "elateFitStretchCompletedDays",
};

const aiAssistDialog = document.getElementById("aiAssistDialog");
const aiAssistButton = document.getElementById("aiAssistButton");
const aiAssistLoading = document.getElementById("aiAssistLoading");
const aiAssistReport = document.getElementById("aiAssistReport");
let aiCalendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let aiCalendarEvents = [];

function openAiDatabase(config) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(config.db, config.version);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error || new Error(`Unable to open ${config.db}.`));
  });
}

function readAiStore(db, storeName, key) {
  return new Promise((resolve, reject) => {
    if (!db.objectStoreNames.contains(storeName)) {
      resolve(key === undefined ? [] : null);
      return;
    }
    const store = db.transaction(storeName, "readonly").objectStore(storeName);
    const request = key === undefined ? store.getAll() : store.get(key);
    request.onsuccess = () =>
      resolve(request.result || (key === undefined ? [] : null));
    request.onerror = () =>
      reject(request.error || new Error(`Unable to read ${storeName}.`));
  });
}

async function readAiDatabase(config, requests) {
  const db = await openAiDatabase(config);
  try {
    const values = {};
    for (const request of requests) {
      values[request.name] = await readAiStore(
        db,
        request.store,
        request.key,
      );
    }
    return values;
  } finally {
    db.close();
  }
}

function readAiDates(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch (error) {
    console.error(`Unable to read ${key}.`, error);
    return new Set();
  }
}

function aiNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function aiDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function aiRecent(records, dateField, days = 7) {
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000;
  return records.filter((record) => {
    const date = aiDate(record[dateField]);
    return date && date.getTime() >= threshold;
  });
}

function aiAverage(records, field) {
  if (!records.length) return 0;
  return (
    records.reduce((sum, record) => sum + aiNumber(record[field]), 0) /
    records.length
  );
}

function aiFormatNumber(value, decimals = 0) {
  return Number(value).toLocaleString(undefined, {
    maximumFractionDigits: decimals,
  });
}

function aiEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function aiList(items, emptyText) {
  return items.length
    ? `<ul>${items.map((item) => `<li>${aiEscape(item)}</li>`).join("")}</ul>`
    : `<p class="aiAssistEmpty">${aiEscape(emptyText)}</p>`;
}

function aiLocalKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function aiDateKey(value) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }
  const date = aiDate(value);
  return date ? aiLocalKey(date) : null;
}

function aiCurrentStreak(dateSets) {
  const completed = new Set([...dateSets].flatMap((set) => [...set]));
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  let streak = 0;
  while (completed.has(aiLocalKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function aiCompletionCount(days, period = 7) {
  const threshold = new Date();
  threshold.setHours(0, 0, 0, 0);
  threshold.setDate(threshold.getDate() - period + 1);
  return [...days].filter((value) => {
    const date = aiDate(value);
    return date && date >= threshold;
  }).length;
}

function calculateAiInsights(data) {
  const profile = data.profile;
  const nutrition = aiRecent(data.nutrition, "createdAt");
  const workouts = aiRecent(data.workout, "createdAt");
  const weights = data.weights
    .filter((entry) => Number.isFinite(Number(entry.weight)))
    .sort((a, b) => aiDate(a.recordedAt) - aiDate(b.recordedAt));
  const recentWeights = aiRecent(weights, "recordedAt", 30);
  const latestWeight = weights[weights.length - 1];
  const firstRecentWeight = recentWeights[0];
  const cardioDays = readAiDates(AI_ASSIST_COMPLETION_KEYS.cardio);
  const breathingDays = readAiDates(AI_ASSIST_COMPLETION_KEYS.breathing);
  const stretchDays = readAiDates(AI_ASSIST_COMPLETION_KEYS.stretch);
  const currentCardio = data.cardio.find((plan) => plan.id === "current");
  const currentStretch = data.stretch.find((plan) => plan.id === "current");
  const avgCalories = aiAverage(nutrition, "calories");
  const avgProtein = aiAverage(nutrition, "protein");
  const targetCalories = aiNumber(profile?.calorieTarget);
  const weight = aiNumber(latestWeight?.weight || profile?.weight);
  const targetWeight = aiNumber(profile?.targetWeight || data.goal?.targetWeight);
  const height = aiNumber(profile?.height);
  const profileFields = [
    "username",
    "age",
    "height",
    "weight",
    "targetWeight",
    "target",
    "activityLevel",
  ];
  const profileComplete = profile
    ? profileFields.filter((field) => profile[field] !== undefined && profile[field] !== "").length
    : 0;
  const status = [];
  const missing = [];
  const next = [];

  if (!profile) {
    missing.push(
      "Complete your user profile so calorie, weight, and activity guidance can be personalized.",
    );
  } else {
    status.push(
      `${profile.username || "Your"} profile is available with a ${profile.target || "personal"} goal.`,
    );
  }
  if (profile) {
    status.push(
      `Your profile setup is ${profileComplete}/${profileFields.length} key fields complete.`,
    );
    if (profileComplete < profileFields.length) {
      missing.push("Some profile fields are incomplete, so parts of your guidance are estimated.");
      next.push("Complete the remaining profile fields to improve your personalized recommendations.");
    }
  }

  if (nutrition.length) {
    status.push(
      `You logged ${nutrition.length} food entr${nutrition.length === 1 ? "y" : "ies"} in the last 7 days, averaging ${aiFormatNumber(avgCalories)} calories and ${aiFormatNumber(avgProtein)} g protein per logged entry.`,
    );
    if (targetCalories && avgCalories < targetCalories * 0.8) {
      next.push(
        `Your logged calories are well below your ${aiFormatNumber(targetCalories)} calorie target; review portions and avoid unintentionally under-fueling.`,
      );
    } else if (targetCalories && avgCalories > targetCalories * 1.2) {
      next.push(
        `Your logged calories are above your ${aiFormatNumber(targetCalories)} calorie target; review high-calorie entries and portion sizes.`,
      );
    }
  } else {
    missing.push("No food entries were found for the last 7 days.");
    next.push(
      "Log meals consistently for the next 7 days so calorie and protein guidance is meaningful.",
    );
  }

  if (weight) {
    const change = firstRecentWeight
      ? weight - aiNumber(firstRecentWeight.weight)
      : 0;
    status.push(
      `Your latest recorded weight is ${aiFormatNumber(weight, 1)} kg${recentWeights.length > 1 ? `, ${change >= 0 ? "+" : ""}${aiFormatNumber(change, 1)} kg over the last 30 days` : ""}.`,
    );
    if (targetWeight) {
      const remaining = targetWeight - weight;
      status.push(
        `Your target is ${aiFormatNumber(targetWeight, 1)} kg (${remaining >= 0 ? `${aiFormatNumber(remaining, 1)} kg to gain` : `${aiFormatNumber(Math.abs(remaining), 1)} kg to lose`}).`,
      );
    }
  } else {
    missing.push("No weight measurement is available.");
    next.push(
      "Record your current weight to establish a baseline and make progress measurable.",
    );
  }

  if (workouts.length) {
    const volume = workouts.reduce(
      (sum, entry) =>
        sum + aiNumber(entry.volume || aiNumber(entry.reps) * aiNumber(entry.weight)),
      0,
    );
    status.push(
      `${workouts.length} workout entries were recorded in the last 7 days (${aiFormatNumber(volume)} kg total logged volume).`,
    );
  } else {
    missing.push("No strength workout entries were found in the last 7 days.");
    next.push(
      "Schedule at least two manageable strength sessions this week and record the exercises, reps, and load.",
    );
  }

  const cardioCount = aiCompletionCount(cardioDays);
  const breathingCount = aiCompletionCount(breathingDays);
  const stretchCount = aiCompletionCount(stretchDays);
  if (currentCardio?.items?.length) {
    status.push(
      `Your cardio plan contains ${currentCardio.items.length} configured activity${currentCardio.items.length === 1 ? "" : "ies"}.`,
    );
  }
  if (currentStretch?.items?.length) {
    status.push(
      `Your stretching routine contains ${currentStretch.items.length} configured stretch${currentStretch.items.length === 1 ? "" : "es"}.`,
    );
  }
  if (data.breathingPlan?.techniques?.length) {
    status.push(
      `Your saved breathing plan contains ${data.breathingPlan.techniques.length} technique${data.breathingPlan.techniques.length === 1 ? "" : "s"}.`,
    );
  }
  status.push(
    `Last 7 days: ${cardioCount} cardio, ${breathingCount} breathing, and ${stretchCount} stretching session${cardioCount + breathingCount + stretchCount === 1 ? "" : "s"} completed.`,
  );
  if (!cardioCount)
    next.push("Add a cardio session this week and use the cardio calendar to build consistency.");
  if (!breathingCount)
    next.push("Take a short breathing session today to support recovery and stress management.");
  if (!stretchCount)
    next.push("Add a brief stretching routine after training or on a recovery day.");
  if (!currentCardio?.items?.length)
    missing.push("No cardio plan is currently configured.");
  if (!currentStretch?.items?.length)
    missing.push("No stretching routine is currently configured.");
  if (!data.breathingPlan) missing.push("No saved breathing plan is available.");

  if (profile?.age && profile?.height && weight) {
    const heightMeters = aiNumber(profile.height) / 100;
    const bmi = heightMeters > 0 ? weight / (heightMeters * heightMeters) : 0;
    if (bmi)
      status.push(
        `Estimated BMI is ${aiFormatNumber(bmi, 1)}; use this as a screening measure, not a diagnosis.`,
      );
  }
  if (weight && !avgProtein) {
    next.push(
      `Track protein more consistently; a general training range is about ${aiFormatNumber(weight * 1.2)}-${aiFormatNumber(weight * 1.6)} g/day, subject to your individual needs.`,
    );
  }
  if (!next.length)
    next.push("Keep logging consistently, review your weekly trend, and adjust one habit at a time.");

  const activityDates = [
    ...nutrition.map((entry) => aiDate(entry.createdAt)).filter(Boolean),
    ...workouts.map((entry) => aiDate(entry.createdAt)).filter(Boolean),
  ];
  const movementCount = cardioCount + breathingCount + stretchCount + (workouts.length ? 1 : 0);
  const trackingAreas = [
    Boolean(profile),
    Boolean(nutrition.length),
    Boolean(weight),
    Boolean(workouts.length),
    Boolean(cardioCount),
    Boolean(breathingCount),
    Boolean(stretchCount),
  ].filter(Boolean).length;
  const consistencyScore = Math.round((trackingAreas / 7) * 100);
  const movementScore = Math.min(100, Math.round((movementCount / 5) * 100));
  const activityLevel = String(profile?.activityLevel || "").toLowerCase();
  const activityFactor =
    activityLevel.includes("very") ? 1.725 :
      activityLevel.includes("high") ? 1.55 :
        activityLevel.includes("moderate") ? 1.375 : 1.2;
  let bmr = 0;
  if (profile?.age && height && weight) {
    bmr = 10 * weight + 6.25 * height - 5 * aiNumber(profile.age);
    if (String(profile.gender || "").toLowerCase().startsWith("m")) bmr += 5;
    if (String(profile.gender || "").toLowerCase().startsWith("f")) bmr -= 161;
  }
  const bmi = height && weight ? weight / ((height / 100) ** 2) : 0;
  const bmiCategory =
    bmi < 18.5 ? "below the usual screening range" :
      bmi < 25 ? "within the usual screening range" :
        bmi < 30 ? "above the usual screening range" : "in the higher screening range";
  const proteinTarget = weight ? `${aiFormatNumber(weight * 1.2)}-${aiFormatNumber(weight * 1.6)} g` : "Set a weight first";
  const streak = aiCurrentStreak([cardioDays, breathingDays, stretchDays]);
  const calendarEvents = [
    ...nutrition
      .map((entry) => ({
        date: aiDateKey(entry.createdAt),
        type: "calorie",
        icon: "fa-bowl-food",
        label: "Calories logged",
      }))
      .filter((event) => event.date),
    ...workouts
      .map((entry) => ({
        date: aiDateKey(entry.createdAt),
        type: "workout",
        icon: "fa-dumbbell",
        label: "Workout logged",
      }))
      .filter((event) => event.date),
    ...[...cardioDays].map((date) => ({
      date: aiDateKey(date),
      type: "cardio",
      icon: "fa-person-running",
      label: "Cardio completed",
    })),
    ...[...breathingDays].map((date) => ({
      date: aiDateKey(date),
      type: "breathing",
      icon: "fa-wind",
      label: "Breathing completed",
    })),
    ...[...stretchDays].map((date) => ({
      date: aiDateKey(date),
      type: "stretch",
      icon: "fa-person-walking",
      label: "Stretching completed",
    })),
  ].filter((event) => event.date);
  const metrics = [
    {
      label: "Profile setup",
      value: `${profileComplete}/${profileFields.length}`,
      detail: profile ? "key personal fields complete" : "profile not created",
      progress: Math.round((profileComplete / profileFields.length) * 100),
      tone: profileComplete === profileFields.length ? "good" : "warm",
    },
    {
      label: "Calories logged",
      value: nutrition.length ? aiFormatNumber(avgCalories) : "—",
      detail: targetCalories
        ? `7-day average · target ${aiFormatNumber(targetCalories)} kcal`
        : "7-day average · set a calorie target",
      progress: targetCalories
        ? Math.min(100, Math.round((avgCalories / targetCalories) * 100))
        : 0,
      tone: nutrition.length ? "good" : "neutral",
    },
    {
      label: "Consistency",
      value: `${consistencyScore}%`,
      detail: `${trackingAreas}/7 tracking signals active`,
      progress: consistencyScore,
      tone: consistencyScore >= 70 ? "good" : "warm",
    },
    {
      label: "Movement this week",
      value: `${movementCount}`,
      detail: "sessions or logged training days",
      progress: movementScore,
      tone: movementScore >= 60 ? "good" : "warm",
    },
    {
      label: "Current streak",
      value: `${streak} day${streak === 1 ? "" : "s"}`,
      detail: streak ? "Keep the rhythm going" : "Start with one small action today",
      progress: Math.min(100, streak * 20),
      tone: streak ? "good" : "neutral",
    },
    {
      label: "Protein guide",
      value: proteinTarget,
      detail: "general daily training range",
      progress: 0,
      tone: "neutral",
    },
    {
      label: "Strength workouts",
      value: `${workouts.length}`,
      detail: "entries recorded in the last 7 days",
      progress: Math.min(100, workouts.length * 25),
      tone: workouts.length >= 2 ? "good" : "warm",
    },
    {
      label: "Cardio",
      value: `${cardioCount}/7`,
      detail: currentCardio?.items?.length
        ? `${currentCardio.items.length} activities in your plan`
        : "no cardio plan configured",
      progress: Math.min(100, cardioCount * 20),
      tone: cardioCount ? "good" : "warm",
    },
    {
      label: "Breathing",
      value: `${breathingCount}/7`,
      detail: data.breathingPlan?.techniques?.length
        ? `${data.breathingPlan.techniques.length} saved techniques`
        : "no saved plan configured",
      progress: Math.min(100, breathingCount * 20),
      tone: breathingCount ? "good" : "warm",
    },
    {
      label: "Stretching",
      value: `${stretchCount}/7`,
      detail: currentStretch?.items?.length
        ? `${currentStretch.items.length} stretches in your routine`
        : "no routine configured",
      progress: Math.min(100, stretchCount * 20),
      tone: stretchCount ? "good" : "warm",
    },
  ];
  if (bmr) {
    metrics.push({
      label: "Energy guide",
      value: `${aiFormatNumber(bmr)} kcal`,
      detail: `estimated BMR · TDEE about ${aiFormatNumber(bmr * activityFactor)} kcal`,
      progress: 0,
      tone: "neutral",
    });
  }
  if (bmi) {
    metrics.push({
      label: "BMI screening",
      value: aiFormatNumber(bmi, 1),
      detail: bmiCategory,
      progress: Math.min(100, Math.round((bmi / 35) * 100)),
      tone: bmi >= 18.5 && bmi < 25 ? "good" : "warm",
    });
  }
  if (targetWeight && weight) {
    const startWeight = aiNumber(data.goal?.startWeight || weights[0]?.weight);
    const totalChange = targetWeight - startWeight;
    const currentChange = weight - startWeight;
    const goalProgress = totalChange
      ? Math.max(0, Math.min(100, Math.round((currentChange / totalChange) * 100)))
      : 0;
    metrics.push({
      label: "Weight goal",
      value: `${aiFormatNumber(weight, 1)} kg`,
      detail: `target ${aiFormatNumber(targetWeight, 1)} kg`,
      progress: goalProgress,
      tone: Math.abs(targetWeight - weight) < 1 ? "good" : "neutral",
    });
  } else {
    metrics.push({
      label: "Weight goal",
      value: weight ? `${aiFormatNumber(weight, 1)} kg` : "—",
      detail: targetWeight
        ? `target ${aiFormatNumber(targetWeight, 1)} kg`
        : "record a weight and set a target",
      progress: 0,
      tone: "neutral",
    });
  }
  return {
    status,
    missing,
    next,
    metrics,
    focus: next[0],
    loggedDays: new Set(activityDates.map(aiLocalKey)).size,
    calendarEvents,
  };
}

async function collectAiAssistData() {
  const [
    profileData,
    nutritionData,
    cardioData,
    workoutData,
    stretchData,
    weightData,
  ] = await Promise.all([
    readAiDatabase(AI_ASSIST_DATABASES.profile, [
      { name: "profile", store: "profiles", key: "profile" },
    ]),
    readAiDatabase(AI_ASSIST_DATABASES.nutrition, [
      { name: "entries", store: "foodEntries" },
    ]),
    readAiDatabase(AI_ASSIST_DATABASES.cardio, [
      { name: "plans", store: "plans" },
    ]),
    readAiDatabase(AI_ASSIST_DATABASES.workout, [
      { name: "entries", store: "workouts" },
    ]),
    readAiDatabase(AI_ASSIST_DATABASES.stretch, [
      { name: "plans", store: "plans" },
    ]),
    readAiDatabase(AI_ASSIST_DATABASES.weight, [
      { name: "entries", store: "weightEntries" },
      { name: "goal", store: "goalMapState", key: "goal" },
    ]),
  ]);
  let breathingPlan = null;
  try {
    breathingPlan = JSON.parse(
      localStorage.getItem("elateFitBreathingPlan") || "null",
    );
  } catch (error) {
    console.error("Unable to read the saved breathing plan.", error);
  }
  return {
    profile: profileData.profile,
    nutrition: nutritionData.entries,
    cardio: cardioData.plans,
    workout: workoutData.entries,
    stretch: stretchData.plans,
    weights: weightData.entries,
    goal: weightData.goal,
    breathingPlan,
  };
}

function renderAiAssistReport(insights) {
  aiAssistReport.innerHTML = `
    <section class="aiAssistWelcome">
      <div class="aiAssistPulse"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
      <div>
        <p class="aiAssistKicker">YOUR PERSONAL SNAPSHOT</p>
        <h3>${aiEscape(insights.focus || "Keep building healthy habits one day at a time.")}</h3>
        <p>Generated from your saved activity, nutrition, profile, and progress data.</p>
      </div>
    </section>
    <div class="aiAssistMetricGrid">
      ${insights.metrics
        .map(
          (metric) => `
            <article class="aiAssistMetric aiAssistMetric-${metric.tone}">
              <span>${aiEscape(metric.label)}</span>
              <strong>${aiEscape(metric.value)}</strong>
              <small>${aiEscape(metric.detail)}</small>
              ${metric.progress ? `<div class="aiAssistProgress"><i style="--progress:${metric.progress}%"></i></div>` : ""}
            </article>`,
        )
        .join("")}
    </div>
    <section class="aiAssistSection">
      <h3><i class="fa-solid fa-chart-line"></i> Current status</h3>
      ${aiList(insights.status, "Not enough data is available yet.")}
    </section>
    <section class="aiAssistSection aiAssistMissing">
      <h3><i class="fa-solid fa-clipboard-question"></i> What is missing</h3>
      ${aiList(insights.missing, "Your main tracking areas are populated.")}
    </section>
    <section class="aiAssistSection aiAssistNext">
      <h3><i class="fa-solid fa-forward"></i> What to do next</h3>
      ${aiList(insights.next, "Keep your plan consistent and review it weekly.")}
    </section>
    <section class="aiAssistSection aiAssistMegaCalendar">
      <div class="aiAssistCalendarHeader">
        <div>
          <h3><i class="fa-solid fa-calendar-days"></i> Mega activity calendar</h3>
          <p>See every logged nutrition, workout, cardio, breathing, and stretching activity together.</p>
        </div>
        <div class="aiAssistCalendarNavigation" aria-label="Change activity calendar month">
          <button type="button" id="aiAssistCalendarPrevious" aria-label="Previous month"><i class="fa-solid fa-chevron-left"></i></button>
          <span id="aiAssistCalendarMonth"></span>
          <button type="button" id="aiAssistCalendarNext" aria-label="Next month"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
      <div class="aiAssistCalendarWeekdays" aria-hidden="true">
        <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
      </div>
      <div class="aiAssistCalendarGrid" id="aiAssistCalendarGrid" role="grid" aria-label="Monthly health activity calendar"></div>
      <div class="aiAssistCalendarLegend">
        <span><i class="fa-solid fa-bowl-food aiAssistCalendarIcon-calorie"></i> Calories</span>
        <span><i class="fa-solid fa-dumbbell aiAssistCalendarIcon-workout"></i> Workout</span>
        <span><i class="fa-solid fa-person-running aiAssistCalendarIcon-cardio"></i> Cardio</span>
        <span><i class="fa-solid fa-wind aiAssistCalendarIcon-breathing"></i> Breathing</span>
        <span><i class="fa-solid fa-person-walking aiAssistCalendarIcon-stretch"></i> Stretching</span>
      </div>
    </section>`;
  aiCalendarEvents = insights.calendarEvents;
  renderAiActivityCalendar();
}

function renderAiActivityCalendar() {
  const monthLabel = document.getElementById("aiAssistCalendarMonth");
  const grid = document.getElementById("aiAssistCalendarGrid");
  if (!monthLabel || !grid) return;

  const year = aiCalendarMonth.getFullYear();
  const month = aiCalendarMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayKey = aiLocalKey(new Date());
  const eventsByDate = new Map();
  aiCalendarEvents.forEach((event) => {
    if (!eventsByDate.has(event.date)) eventsByDate.set(event.date, []);
    eventsByDate.get(event.date).push(event);
  });

  monthLabel.textContent = new Intl.DateTimeFormat(undefined, {
    month: "long",
    year: "numeric",
  }).format(aiCalendarMonth);

  const cells = [];
  for (let index = 0; index < firstDay; index += 1) {
    cells.push('<div class="aiAssistCalendarDay aiAssistCalendarEmpty" aria-hidden="true"></div>');
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const dateKey = aiLocalKey(date);
    const events = eventsByDate.get(dateKey) || [];
    const eventTypes = [...new Set(events.map((event) => event.type))];
    const labels = events.map((event) => event.label).join(", ");
    const classes = ["aiAssistCalendarDay"];
    if (dateKey === todayKey) classes.push("aiAssistCalendarToday");
    if (events.length) classes.push("aiAssistCalendarActive");
    cells.push(`
      <div class="${classes.join(" ")}" title="${aiEscape(labels || "No activity logged")}">
        <span>${day}</span>
        <div class="aiAssistCalendarIcons">
          ${eventTypes
            .map((type) => {
              const event = events.find((item) => item.type === type);
              return `<i class="fa-solid ${event.icon} aiAssistCalendarIcon-${type}" aria-label="${aiEscape(event.label)}"></i>`;
            })
            .join("")}
        </div>
      </div>`);
  }
  grid.innerHTML = cells.join("");
  document.getElementById("aiAssistCalendarPrevious").onclick = () => {
    aiCalendarMonth = new Date(year, month - 1, 1);
    renderAiActivityCalendar();
  };
  document.getElementById("aiAssistCalendarNext").onclick = () => {
    aiCalendarMonth = new Date(year, month + 1, 1);
    renderAiActivityCalendar();
  };
}

async function showAiAssist() {
  aiAssistDialog.hidden = false;
  aiAssistLoading.hidden = false;
  aiAssistLoading.textContent = "Reading your saved health data...";
  aiAssistReport.innerHTML = "";
  aiAssistButton.disabled = true;
  try {
    const data = await collectAiAssistData();
    renderAiAssistReport(calculateAiInsights(data));
    aiAssistLoading.hidden = true;
  } catch (error) {
    console.error("Unable to generate AI Assist report.", error);
    aiAssistLoading.textContent =
      "Your health data could not be read. Check browser storage permissions and try again.";
  } finally {
    aiAssistButton.disabled = false;
  }
}

aiAssistButton.addEventListener("click", showAiAssist);
aiAssistDialog.addEventListener("click", (event) => {
  if (event.target.matches("[data-ai-close]")) aiAssistDialog.hidden = true;
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !aiAssistDialog.hidden) {
    aiAssistDialog.hidden = true;
  }
});
