const soundCatalog = [
  ["campFire.mp3", "Campfire", "Nature", "fa-fire"],
  ["distantThunder.mp3", "Distant Thunder", "Nature", "fa-cloud-bolt"],
  ["LakeWindAmbience.mp3", "Lake Wind", "Nature", "fa-wind"],
  ["windForest.mp3", "Forest Wind", "Nature", "fa-tree"],
  ["windQuietCreaks.mp3", "Quiet Wind", "Nature", "fa-leaf"],
  ["deepForestBirds.mp3", "Deep Forest Birds", "Nature", "fa-dove"],
  ["forestBirds.mp3", "Forest Birds", "Nature", "fa-dove"],
  ["mountainBirds.mp3", "Mountain Birds", "Nature", "fa-dove"],
  ["riverWind.mp3", "River Wind", "Nature", "fa-wind"],
  ["windChimesOf Shells.mp3", "Shell Wind Chimes", "Nature", "fa-bell"],
  ["IceRain.mp3", "Ice Rain", "Rain & Water", "fa-cloud-rain"],
  [
    "rainOnCarHeavy.mp3",
    "Heavy Rain on Car",
    "Rain & Water",
    "fa-cloud-showers-heavy",
  ],
  ["rainOnRoof.mp3", "Rain on Roof", "Rain & Water", "fa-cloud-rain"],
  ["RainOnRooftop.mp3", "Rain on Rooftop", "Rain & Water", "fa-cloud-rain"],
  ["rainWaterDrop.mp3", "Rain Drops", "Rain & Water", "fa-droplet"],
  ["nightRiver.mp3", "Night River", "Rain & Water", "fa-water"],
  ["streamWater.mp3", "Stream Water", "Rain & Water", "fa-water"],
  ["carDriveBy.mp3", "Car Drive By", "Travel & City", "fa-car"],
  ["highway1.mp3", "Highway One", "Travel & City", "fa-road"],
  ["highway2.mp3", "Highway Two", "Travel & City", "fa-road"],
  ["FactoryHard.mp3", "Factory Hard", "Travel & City", "fa-city"],
  ["factoryMorning.mp3", "Factory Morning", "Travel & City", "fa-city"],
  ["KidsPlaying.mp3", "Kids Playing", "Life", "fa-people-group"],
  ["fluteMusic.mp3", "Flute Music", "Meditation & Music", "fa-music"],
  [
    "fluteSitarTabla.mp3",
    "Flute, Sitar and Tabla",
    "Meditation & Music",
    "fa-music",
  ],
  ["fluteTabla.mp3", "Flute and Tabla", "Meditation & Music", "fa-music"],
  ["sitarTabla.mp3", "Sitar and Tabla", "Meditation & Music", "fa-music"],
  ["windMusic.mp3", "Wind Music", "Meditation & Music", "fa-music"],
].map(([file, name, category, icon]) => ({ file, name, category, icon }));

const FAVORITES_KEY = "elateFitMusicMixerFavorites";
const USER_TRACK_DB_NAME = "elateFitMusicMixerDB";
const USER_TRACK_DB_VERSION = 1;
const USER_TRACK_STORE = "userTracks";
const audioMap = new Map();
let favorites = loadFavorites();
let activeCategory = "All sounds";
let statusTimer;
let userTrackDb;

function openUserTrackDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(USER_TRACK_DB_NAME, USER_TRACK_DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(USER_TRACK_STORE)) {
        database.createObjectStore(USER_TRACK_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => {
      request.result.onversionchange = () => request.result.close();
      resolve(request.result);
    };
    request.onerror = () =>
      reject(request.error || new Error("Unable to open saved audio storage."));
    request.onblocked = () =>
      reject(new Error("Saved audio storage is blocked by another page."));
  });
}

function getUserTracks() {
  return new Promise((resolve, reject) => {
    const request = userTrackDb
      .transaction(USER_TRACK_STORE, "readonly")
      .objectStore(USER_TRACK_STORE)
      .getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () =>
      reject(request.error || new Error("Unable to read saved audio."));
  });
}

function saveUserTrack(track) {
  if (!userTrackDb) {
    return Promise.reject(new Error("Saved audio storage is unavailable."));
  }
  return new Promise((resolve, reject) => {
    const transaction = userTrackDb.transaction(USER_TRACK_STORE, "readwrite");
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error || new Error("Unable to save audio file."));
    transaction.onabort = () =>
      reject(transaction.error || new Error("Audio file save was cancelled."));
    transaction.objectStore(USER_TRACK_STORE).put(track);
  });
}

function deleteSavedUserTrack(id) {
  if (!userTrackDb) {
    return Promise.reject(new Error("Saved audio storage is unavailable."));
  }
  return new Promise((resolve, reject) => {
    const transaction = userTrackDb.transaction(USER_TRACK_STORE, "readwrite");
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error || new Error("Unable to delete saved audio."));
    transaction.onabort = () =>
      reject(
        transaction.error || new Error("Audio file deletion was cancelled."),
      );
    transaction.objectStore(USER_TRACK_STORE).delete(id);
  });
}

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
    return Array.isArray(saved)
      ? saved.map((favorite) => ({
          ...favorite,
          sounds: favorite.sounds || favorite.tracks || [],
        }))
      : [];
  } catch (error) {
    return [];
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    setStatus("Favourite storage is unavailable in this browser.", true);
    return false;
  }
}

function setStatus(message, error = false) {
  const status = document.getElementById("mixerStatus");
  clearTimeout(statusTimer);
  status.textContent = message;
  status.style.color = error ? "#a45e4c" : "#708784";
  status.classList.add("is-visible");
  statusTimer = setTimeout(() => status.classList.remove("is-visible"), 2000);
}

function selectedSounds() {
  return [...document.querySelectorAll(".soundCard.is-selected")].map(
    (card) => ({
      file: card.dataset.file,
      name: card.dataset.name,
      volume: Number(card.querySelector(".soundVolume input").value),
      isUserUpload: card.dataset.userUpload === "true",
    }),
  );
}

function renderCategories() {
  const categories = [
    "All sounds",
    ...new Set(soundCatalog.map((sound) => sound.category)),
  ];
  if (document.querySelector(".userSoundCard")) categories.push("Your music");
  document.getElementById("categoryTabs").innerHTML = categories
    .map(
      (category) =>
        `<button type="button" class="categoryTab ${category === activeCategory ? "active" : ""}" data-category="${category}">${category}</button>`,
    )
    .join("");
}

function registerSoundCard(card) {
  const audio = card.querySelector("audio");
  if (!audio) return;

  audioMap.set(card.dataset.file, audio);
  audio.addEventListener("play", () => {
    card.classList.add("is-playing");
    card.querySelector(".soundStatus").textContent = "Playing now";
  });
  audio.addEventListener("pause", () => {
    card.classList.remove("is-playing");
    card.querySelector(".soundStatus").textContent = "Paused";
  });
  audio.addEventListener("error", () => {
    setStatus(
      `Unable to play ${card.dataset.name}. Choose a browser-supported audio file.`,
      true,
    );
  });
}

function createUserSoundCard(track) {
  const fileKey = `user:${track.id}`;
  const objectUrl = URL.createObjectURL(track.blob);
  const card = document.createElement("article");
  card.className = "soundCard userSoundCard";
  card.dataset.file = fileKey;
  card.dataset.name = track.name;
  card.dataset.category = "Your music";
  card.dataset.userUpload = "true";
  card.dataset.trackId = track.id;
  card.dataset.objectUrl = objectUrl;

  const top = document.createElement("div");
  top.className = "soundTop";
  const orb = document.createElement("span");
  orb.className = "soundOrb";
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-music";
  orb.append(icon);

  const description = document.createElement("div");
  const name = document.createElement("span");
  name.className = "soundName";
  name.textContent = track.name;
  const category = document.createElement("span");
  category.className = "soundCategory";
  category.textContent = "Your music";
  description.append(name, category);

  const selectButton = document.createElement("button");
  selectButton.type = "button";
  selectButton.className = "soundSelect";
  selectButton.setAttribute("aria-label", `Add ${track.name} to mix`);
  selectButton.setAttribute("aria-pressed", "false");
  selectButton.innerHTML = '<i class="fa-solid fa-plus"></i>';

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "removeUserSound";
  removeButton.setAttribute("aria-label", `Remove ${track.name}`);
  removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  top.append(orb, description, selectButton, removeButton);

  const status = document.createElement("span");
  status.className = "soundStatus";
  status.textContent = "Ready to preview";

  const volumeLabel = document.createElement("label");
  volumeLabel.className = "soundVolume";
  const volumeText = document.createElement("span");
  volumeText.textContent = "Volume";
  const volume = document.createElement("input");
  volume.type = "range";
  volume.min = "0";
  volume.max = "1";
  volume.step = "0.01";
  volume.value = "0.35";
  const volumeOutput = document.createElement("output");
  volumeOutput.textContent = "35%";
  volumeLabel.append(volumeText, volume, volumeOutput);

  const audio = document.createElement("audio");
  audio.preload = "metadata";
  audio.loop = true;
  audio.src = objectUrl;

  card.append(top, status, volumeLabel, audio);
  registerSoundCard(card);
  return card;
}

async function removeUserSound(card) {
  const name = card.dataset.name;
  if (
    !confirm(
      `Remove ${name} from this device and any saved favourites that use it?`,
    )
  ) {
    return;
  }

  const fileKey = card.dataset.file;
  try {
    await deleteSavedUserTrack(card.dataset.trackId);
  } catch (error) {
    console.error(`Unable to remove ${name} from saved audio:`, error);
    setStatus(`Unable to remove ${name} from your sound library.`, true);
    return;
  }

  let affectedFavorites = 0;
  const updatedFavorites = [];
  favorites.forEach((favorite) => {
    const sounds = favorite.sounds || favorite.tracks || [];
    const remainingSounds = sounds.filter((sound) => sound.file !== fileKey);
    if (remainingSounds.length !== sounds.length) affectedFavorites += 1;
    if (remainingSounds.length) {
      updatedFavorites.push({ ...favorite, sounds: remainingSounds });
    }
  });
  favorites = updatedFavorites;
  const favoritesSaved = !affectedFavorites || saveFavorites();
  if (affectedFavorites) renderFavorites();

  stopSound(card);
  audioMap.delete(fileKey);
  URL.revokeObjectURL(card.dataset.objectUrl);
  card.remove();

  if (
    activeCategory === "Your music" &&
    !document.querySelector(".userSoundCard")
  ) {
    activeCategory = "All sounds";
  }
  renderCategories();
  filterSounds();
  updateMixCount();
  if (!favoritesSaved) {
    setStatus(
      `Removed ${name}, but browser storage could not update saved favourites.`,
      true,
    );
    return;
  }
  setStatus(
    affectedFavorites
      ? `Removed ${name} and updated ${affectedFavorites} saved favourite${affectedFavorites === 1 ? "" : "s"}.`
      : `Removed ${name} from your sound library.`,
  );
}

function filterSounds() {
  const query = document
    .getElementById("soundSearch")
    .value.trim()
    .toLowerCase();
  document.querySelectorAll(".soundCard").forEach((card) => {
    const matchesCategory =
      activeCategory === "All sounds" ||
      card.dataset.category === activeCategory;
    const matchesQuery =
      !query || card.dataset.name.toLowerCase().includes(query);
    card.classList.toggle("is-hidden", !(matchesCategory && matchesQuery));
  });
  document
    .querySelectorAll(".categoryTab")
    .forEach((tab) =>
      tab.classList.toggle("active", tab.dataset.category === activeCategory),
    );
}

function applyVolume(input) {
  const card = input.closest(".soundCard");
  if (!card) return;
  const value = Number(input.value);
  input.parentElement.querySelector("output").textContent =
    `${Math.round(value * 100)}%`;
  const audio = audioMap.get(card.dataset.file);
  if (audio) audio.volume = value;
}

function renderCatalog() {
  const grid = document.getElementById("soundGrid");
  grid.innerHTML = soundCatalog
    .map(
      (sound) => `
        <article class="soundCard" data-file="${sound.file}" data-name="${sound.name}" data-category="${sound.category}">
            <div class="soundTop">
                <span class="soundOrb"><i class="fa-solid ${sound.icon}"></i></span>
                <div><span class="soundName">${sound.name}</span><span class="soundCategory">${sound.category}</span></div>
                <button type="button" class="soundSelect" aria-label="Add ${sound.name} to mix" aria-pressed="false"><i class="fa-solid fa-plus"></i></button>
            </div>
            <span class="soundStatus">Ready to preview</span>
            <label class="soundVolume"><span>Volume</span><input type="range" min="0" max="1" step="0.01" value="0.35"><output>35%</output></label>
            <audio preload="none" loop src="music/${sound.file}"></audio>
        </article>`,
    )
    .join("");

  grid.addEventListener("click", (event) => {
    const removeButton = event.target.closest(".removeUserSound");
    const card = event.target.closest(".soundCard");
    if (removeButton && card) {
      removeUserSound(card);
      return;
    }
    const toggle = event.target.closest(".soundSelect");
    if (toggle && card) {
      const selected = card.classList.toggle("is-selected");
      toggle.setAttribute("aria-pressed", String(selected));
      toggle.innerHTML = `<i class="fa-solid fa-${selected ? "check" : "plus"}"></i>`;
      if (selected) startSound(card);
      else stopSound(card);
      updateMixCount();
      return;
    }
    if (card && !event.target.closest(".soundVolume")) previewSound(card);
  });

  grid.addEventListener("input", (event) => {
    if (event.target.matches(".soundVolume input")) applyVolume(event.target);
  });
  grid.addEventListener("change", (event) => {
    if (event.target.matches(".soundVolume input")) applyVolume(event.target);
  });

  grid.querySelectorAll(".soundCard").forEach(registerSoundCard);
  filterSounds();
}

async function startSound(card) {
  const audio = audioMap.get(card.dataset.file);
  if (!audio) return;
  audio.volume = Number(card.querySelector(".soundVolume input").value);
  try {
    await audio.play();
  } catch (error) {
    setStatus(
      `Tap the selected sound again to allow ${card.dataset.name} to play.`,
      true,
    );
  }
}

function stopSound(card) {
  const audio = audioMap.get(card.dataset.file);
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

function stopAll() {
  audioMap.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}

async function previewSound(card) {
  const audio = audioMap.get(card.dataset.file);
  if (audio && !audio.paused) {
    stopSound(card);
    setStatus(`${card.dataset.name} stopped.`);
    return;
  }
  stopAll();
  await startSound(card);
  setStatus(
    `Previewing ${card.dataset.name}. Click the card again to stop it.`,
  );
}

async function playMix(mix = selectedSounds()) {
  if (!mix.length) {
    setStatus("Choose at least one sound to play your mix.", true);
    return;
  }
  stopAll();
  const blocked = [];
  await Promise.all(
    mix.map(async (item) => {
      const audio = audioMap.get(item.file);
      if (!audio) return;
      audio.volume = item.volume;
      try {
        await audio.play();
      } catch (error) {
        blocked.push(item.name);
      }
    }),
  );
  setStatus(
    blocked.length
      ? `Tap Play again to allow: ${blocked.join(", ")}.`
      : `${mix.length} sounds are playing together.`,
  );
}

function updateMixCount() {
  const count = document.querySelectorAll(".soundCard.is-selected").length;
  document.getElementById("mixCount").textContent = `${count} selected`;
}

function renderFavorites() {
  const list = document.getElementById("favoriteList");
  list.innerHTML = favorites.length
    ? favorites
        .map((favorite, index) => {
          const sounds = favorite.sounds || favorite.tracks || [];
          return `<div class="favoriteItem"><div><strong>${favorite.name}</strong><small>${sounds.length} sounds saved</small></div><div class="favoriteActions"><button type="button" data-action="play" data-index="${index}" aria-label="Play ${favorite.name}"><i class="fa-solid fa-play"></i></button><button type="button" data-action="stop" data-index="${index}" aria-label="Stop ${favorite.name}"><i class="fa-solid fa-stop"></i></button><button type="button" data-action="load" data-index="${index}" aria-label="Load ${favorite.name}"><i class="fa-solid fa-arrow-rotate-left"></i></button><button type="button" data-action="delete" data-index="${index}" aria-label="Delete ${favorite.name}"><i class="fa-solid fa-xmark"></i></button></div></div>`;
        })
        .join("")
    : '<div class="emptyState">No saved mixes yet. Choose a few sounds and save your first calm space.</div>';
}

function loadMix(sounds) {
  stopAll();
  document.querySelectorAll(".soundCard").forEach((card) => {
    const item = sounds.find((sound) => sound.file === card.dataset.file);
    const selected = Boolean(item);
    card.classList.toggle("is-selected", selected);
    const button = card.querySelector(".soundSelect");
    button.setAttribute("aria-pressed", String(selected));
    button.innerHTML = `<i class="fa-solid fa-${selected ? "check" : "plus"}"></i>`;
    if (item) {
      card.querySelector(".soundVolume input").value = item.volume;
      card.querySelector("output").textContent =
        `${Math.round(item.volume * 100)}%`;
    }
  });
  updateMixCount();
}

document.addEventListener("DOMContentLoaded", async function () {
  renderCatalog();
  try {
    userTrackDb = await openUserTrackDatabase();
    const tracks = await getUserTracks();
    const grid = document.getElementById("soundGrid");
    tracks.forEach((track) => {
      if (
        !track ||
        typeof track.id !== "string" ||
        typeof track.name !== "string" ||
        !(track.blob instanceof Blob)
      ) {
        console.error("Skipping an invalid saved audio record:", track);
        return;
      }
      grid.append(createUserSoundCard(track));
    });
  } catch (error) {
    console.error("Unable to restore saved audio files:", error);
    setStatus("Saved audio could not be loaded from this device.", true);
  }
  renderCategories();
  renderFavorites();
  document
    .getElementById("soundSearch")
    .addEventListener("input", filterSounds);
  document.getElementById("categoryTabs").addEventListener("click", (event) => {
    const tab = event.target.closest(".categoryTab");
    if (!tab) return;
    activeCategory = tab.dataset.category;
    filterSounds();
  });
  document.getElementById("playMix").addEventListener("click", () => playMix());
  document
    .getElementById("userMusicFiles")
    .addEventListener("change", async function () {
      const files = Array.from(this.files || []);
      this.value = "";
      if (!files.length) return;

      const supportedAudioExtension =
        /\.(aac|aif|aiff|flac|m4a|mp3|oga|ogg|opus|wav|weba|webm)$/i;
      const errors = [];
      let added = 0;
      const grid = document.getElementById("soundGrid");

      for (const file of files) {
        if (
          !file.size ||
          (!file.type.startsWith("audio/") &&
            !supportedAudioExtension.test(file.name))
        ) {
          errors.push(file.name);
          continue;
        }

        const track = {
          id: crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
          name: file.name,
          type: file.type,
          size: file.size,
          blob: file,
          createdAt: new Date().toISOString(),
        };
        let card;
        try {
          card = createUserSoundCard(track);
          await saveUserTrack(track);
          grid.append(card);
          added += 1;
        } catch (error) {
          console.error(
            `Unable to add ${file.name} to the music mixer:`,
            error,
          );
          if (card) {
            audioMap.delete(card.dataset.file);
            URL.revokeObjectURL(card.dataset.objectUrl);
          }
          errors.push(file.name);
        }
      }

      renderCategories();
      filterSounds();
      updateMixCount();
      if (errors.length) {
        setStatus(
          `${added} file${added === 1 ? "" : "s"} added; unable to add: ${errors.join(", ")}.`,
          true,
        );
      } else {
        setStatus(
          `${added} file${added === 1 ? "" : "s"} added. Select each track to layer it into your mix.`,
        );
      }
    });
  const stopButton = document.getElementById("stopMix");
  if (stopButton)
    stopButton.addEventListener("click", () => {
      stopAll();
      setStatus("Mix stopped.");
    });
  document.getElementById("clearMix").addEventListener("click", () => {
    loadMix([]);
    setStatus("Mix cleared.");
  });
  document
    .getElementById("mobileFavoritesToggle")
    .addEventListener("click", function () {
      const list = document.getElementById("favoriteList");
      const isOpen = list.classList.toggle("is-open");
      this.classList.toggle("is-open", isOpen);
      this.setAttribute("aria-expanded", String(isOpen));
      this.setAttribute(
        "aria-label",
        isOpen ? "Hide saved mixes" : "Show saved mixes",
      );
      this.title = isOpen ? "Hide saved mixes" : "Show saved mixes";
      this.innerHTML =
        '<i class="fa-regular fa-bookmark" aria-hidden="true"></i>';
    });
  document.getElementById("saveFavorite").addEventListener("click", () => {
    const sounds = selectedSounds();
    if (!sounds.length) {
      setStatus("Choose at least one sound before saving a favourite.", true);
      return;
    }
    const defaultName = `Sleep mix ${favorites.length + 1}`;
    const enteredName = window.prompt("Name this favourite mix:", defaultName);
    if (enteredName === null) {
      setStatus("Favourite mix was not saved.");
      return;
    }
    const name = enteredName.trim() || defaultName;
    const savedSounds = sounds.map((sound) => ({
      file: sound.file,
      name: sound.name,
      volume: Number(sound.volume),
    }));
    favorites.push({ name, sounds: savedSounds });
    const stored = saveFavorites();
    renderFavorites();
    setStatus(
      stored
        ? `Saved ${sounds.length} sound${sounds.length === 1 ? "" : "s"} to ${name}.`
        : `Saved ${sounds.length} sound${sounds.length === 1 ? "" : "s"} for this session, but browser storage is unavailable.`,
      !stored,
    );
  });
  document.getElementById("favoriteList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const favorite = favorites[Number(button.dataset.index)];
    const sounds = favorite.sounds || favorite.tracks || [];
    if (button.dataset.action === "play") playMix(sounds);
    if (button.dataset.action === "stop") {
      stopAll();
      setStatus(`Stopped ${favorite.name}.`);
    }
    if (button.dataset.action === "load") {
      loadMix(sounds);
      setStatus(`Loaded ${favorite.name}.`);
    }
    if (button.dataset.action === "delete") {
      if (!confirm(`Delete ${favorite.name}?`)) return;
      favorites.splice(Number(button.dataset.index), 1);
      saveFavorites();
      renderFavorites();
    }
  });
  updateMixCount();
});

window.addEventListener("beforeunload", () => {
  document.querySelectorAll(".userSoundCard").forEach((card) => {
    stopSound(card);
    URL.revokeObjectURL(card.dataset.objectUrl);
  });
});
