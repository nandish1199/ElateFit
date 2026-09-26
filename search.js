const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const folderFilter = document.getElementById("folderFilter");
const searchResults = document.getElementById("searchResults");
const resultCount = document.getElementById("resultCount");
const searchStatus = document.getElementById("searchStatus");

const pagePaths = `
ayurveda/ayurvedaCategories.html
ayurveda/kapha.html
ayurveda/kaphaVata.html
ayurveda/keyTerms.html
ayurveda/pitta.html
ayurveda/pittaKapha.html
ayurveda/tastes.html
ayurveda/vata.html
ayurveda/vataPitta.html
calculators/bmiCalculator.html
calculators/breathingExercise.html
calculators/calcCategories.html
calculators/calorieCalculator.html
calculators/cardioConfigure.html
calculators/dietplanmaker.html
calculators/hwcalculator.html
calculators/medicineIntake.html
calculators/searchWorkoutsByMuscle.html
calculators/testNotification.html
calculators/trackSerumApplication.html
calculators/userProfile.html
calculators/weightTracker.html
calculators/workoutTracker.html
contact.html
fragfooter.html
fragnav.html
fragsearchbar.html
index.html
indexedDB/indexeddb.html
nutrition/fruits/apple.html
nutrition/fruits/banana.html
nutrition/fruits/custard.html
nutrition/fruits/fruitCategories.html
nutrition/fruits/grapes.html
nutrition/fruits/mango.html
nutrition/fruits/orange.html
nutrition/fruits/pineapple.html
nutrition/fruits/pomegranate.html
nutrition/fruits/watermelon.html
nutrition/grains/barley.html
nutrition/grains/corn.html
nutrition/grains/grainCategories.html
nutrition/grains/oats.html
nutrition/grains/rice.html
nutrition/grains/wheat.html
nutrition/millets/barnyardMillet.html
nutrition/millets/fingerMillet.html
nutrition/millets/foxtailMillet.html
nutrition/millets/milletCategories.html
nutrition/millets/pearlMillet.html
nutrition/millets/sorghumMillet.html
nutrition/nutcategories.html
nutrition/others/cowMilk.html
nutrition/others/curd.html
nutrition/others/ghee.html
nutrition/others/otherCategories.html
nutrition/pulses/almomd.html
nutrition/pulses/blackGram.html
nutrition/pulses/chickpeas.html
nutrition/pulses/cowpea.html
nutrition/pulses/greenPeas.html
nutrition/pulses/horseGram.html
nutrition/pulses/mothGram.html
nutrition/pulses/mung.html
nutrition/pulses/peanuts.html
nutrition/pulses/pigeonpea.html
nutrition/pulses/pulseCategories.html
nutrition/spices/cardamom.html
nutrition/spices/chili.html
nutrition/spices/clove.html
nutrition/spices/cumin.html
nutrition/spices/curryleaves.html
nutrition/spices/garlic.html
nutrition/spices/ginger.html
nutrition/spices/mustard.html
nutrition/spices/spiceCategories.html
nutrition/spices/turmeric.html
nutrition/vegetables/beetroot.html
nutrition/vegetables/brinjal.html
nutrition/vegetables/carrot.html
nutrition/vegetables/coriander.html
nutrition/vegetables/cucumber.html
nutrition/vegetables/drumstick.html
nutrition/vegetables/fenugreek.html
nutrition/vegetables/mint.html
nutrition/vegetables/okra.html
nutrition/vegetables/onion.html
nutrition/vegetables/pointedGourd.html
nutrition/vegetables/pumpkin.html
nutrition/vegetables/ridgeGourd.html
nutrition/vegetables/spinach.html
nutrition/vegetables/tomato.html
nutrition/vegetables/vegCategories.html
people/about.html
products/beauty/beautyCategories.html
products/beauty/conditioner/biotique.html
products/beauty/conditioner/conditionerCategory.html
products/beauty/conditioner/earthy.html
products/beauty/conditioner/khadi.html
products/beauty/facewash/aroma.html
products/beauty/facewash/biotique.html
products/beauty/facewash/facewashCategory.html
products/beauty/facewash/khadi.html
products/beauty/hairoil/bboHumble.html
products/beauty/hairoil/biotique.html
products/beauty/hairoil/hairoilCategory.html
products/beauty/hairoil/herbcience.html
products/beauty/shampoo/biotique.html
products/beauty/shampoo/golisoda.html
products/beauty/shampoo/khadi.html
products/beauty/shampoo/shampooCategory.html
products/beauty/soap/ayurmeans.html
products/beauty/soap/neev.html
products/beauty/soap/patanjali.html
products/beauty/soap/soapCategory.html
products/beauty/toothpaste/madyama.html
products/beauty/toothpaste/patanjali.html
products/beauty/toothpaste/toothpasteCategory.html
products/pcategories.html
search.html
sleepmusic/musicMixer.html
vastu/introduction.html
vastu/test.html
vastu/vastuAnalysis.html
vastu/vastuCategories.html
vastu/vastuGeography.html
vastu/vastuInterior.html
yoga/hathayoga.html
yoga/introduction.html
yoga/rajayoga.html
yoga/yogaCategories.html
`
  .trim()
  .split(/\s+/);
let pages = [];

function displayName(path) {
  const filename = path
    .split("/")
    .pop()
    .replace(/\.html$/i, "");
  return filename
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function folderName(path) {
  const folder = path.includes("/") ? path.split("/")[0] : "Root";
  return folder === "Root"
    ? folder
    : folder.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function normalisePath(url) {
  try {
    const parsed = new URL(url, window.location.href);
    const path = decodeURIComponent(parsed.pathname).replace(/^\//, "");
    return path || "index.html";
  } catch {
    return "";
  }
}

function renderFolderOptions() {
  const folders = [...new Set(pages.map((page) => page.folder))].sort();
  folderFilter.innerHTML = '<option value="">All folders</option>';
  folders.forEach((folder) => {
    const option = document.createElement("option");
    option.value = folder;
    option.textContent = folder;
    folderFilter.appendChild(option);
  });
}

function renderResults() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedFolder = folderFilter.value;
  const matches = pages.filter((page) => {
    const searchable =
      `${page.title} ${page.path} ${page.folder}`.toLowerCase();
    return (
      (!query || searchable.includes(query)) &&
      (!selectedFolder || page.folder === selectedFolder)
    );
  });

  resultCount.textContent = `${matches.length} of ${pages.length} pages`;
  searchResults.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "searchEmpty";
    empty.textContent = "No pages match that search.";
    searchResults.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  matches.forEach((page) => {
    const link = document.createElement("a");
    link.className = "searchResult";
    link.href = page.path;
    const title = document.createElement("span");
    title.className = "searchResultTitle";
    title.textContent = page.title;
    const path = document.createElement("span");
    path.className = "searchResultPath";
    path.textContent = page.path;
    link.append(title, path);
    fragment.appendChild(link);
  });
  searchResults.appendChild(fragment);
}

async function loadPages() {
  let availablePaths = pagePaths;
  if (window.location.protocol !== "file:") {
    const checks = await Promise.all(
      pagePaths.map(async (path) => {
        try {
          const response = await fetch(path, {
            method: "HEAD",
            cache: "no-store",
          });
          return response.ok ? path : null;
        } catch {
          return path;
        }
      }),
    );
    availablePaths = checks.filter(Boolean);
  }

  pages = availablePaths
    .filter((path) => path && !path.endsWith("/"))
    .sort((first, second) => first.localeCompare(second))
    .map((path) => ({
      path,
      title: displayName(path),
      folder: folderName(path),
    }));
  searchStatus.textContent = "Current repository pages loaded";
  renderFolderOptions();
  renderResults();
}

searchInput.addEventListener("input", renderResults);
folderFilter.addEventListener("change", renderResults);
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  folderFilter.value = "";
  searchInput.focus();
  renderResults();
});

loadPages();
