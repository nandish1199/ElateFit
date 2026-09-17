const soundCatalog = [
    ["campFire.mp3", "Campfire", "Nature", "fa-fire"],
    ["distantThunder.mp3", "Distant Thunder", "Nature", "fa-cloud-bolt"],
    ["LakeWindAmbience.mp3", "Lake Wind", "Nature", "fa-wind"],
    ["windForest.mp3", "Forest Wind", "Nature", "fa-tree"],
    ["windQuietCreaks.mp3", "Quiet Wind", "Nature", "fa-leaf"],
    ["IceRain.mp3", "Ice Rain", "Rain & Water", "fa-cloud-rain"],
    ["rainOnCarHeavy.mp3", "Heavy Rain on Car", "Rain & Water", "fa-cloud-showers-heavy"],
    ["rainOnRoof.mp3", "Rain on Roof", "Rain & Water", "fa-cloud-rain"],
    ["RainOnRooftop.mp3", "Rain on Rooftop", "Rain & Water", "fa-cloud-rain"],
    ["rainWaterDrop.mp3", "Rain Drops", "Rain & Water", "fa-droplet"],
    ["carDriveBy.mp3", "Car Drive By", "Travel & City", "fa-car"],
    ["highway1.mp3", "Highway One", "Travel & City", "fa-road"],
    ["highway2.mp3", "Highway Two", "Travel & City", "fa-road"],
    ["FactoryHard.mp3", "Factory Hard", "Travel & City", "fa-city"],
    ["factoryMorning.mp3", "Factory Morning", "Travel & City", "fa-city"],
    ["KidsPlaying.mp3", "Kids Playing", "Life", "fa-people-group"],
    ["hero.mp3", "Soft Atmosphere", "Ambient", "fa-wand-magic-sparkles"],
    ["hit.mp3", "Soft Pulse", "Ambient", "fa-heart-pulse"],
    ["silver.mp3", "Silver Ambience", "Ambient", "fa-moon"],
    ["WoodDanHenig.mp3", "Wooden Strings", "Ambient", "fa-music"]
].map(([file, name, category, icon]) => ({ file, name, category, icon }));

const FAVORITES_KEY = "elateFitMusicMixerFavorites";
const audioMap = new Map();
let favorites = loadFavorites();
let activeCategory = "All sounds";

function loadFavorites() {
    try {
        const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
        return Array.isArray(saved) ? saved.map(favorite => ({
            ...favorite,
            sounds: favorite.sounds || favorite.tracks || []
        })) : [];
    } catch (error) { return []; }
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
    status.textContent = message;
    status.style.color = error ? "#a45e4c" : "#708784";
}

function selectedSounds() {
    return [...document.querySelectorAll(".soundCard.is-selected")].map(card => ({
        file: card.dataset.file,
        name: card.dataset.name,
        volume: Number(card.querySelector(".soundVolume input").value)
    }));
}

function renderCategories() {
    const categories = ["All sounds", ...new Set(soundCatalog.map(sound => sound.category))];
    document.getElementById("categoryTabs").innerHTML = categories.map(category => `<button type="button" class="categoryTab ${category === activeCategory ? "active" : ""}" data-category="${category}">${category}</button>`).join("");
}

function filterSounds() {
    const query = document.getElementById("soundSearch").value.trim().toLowerCase();
    document.querySelectorAll(".soundCard").forEach(card => {
        const matchesCategory = activeCategory === "All sounds" || card.dataset.category === activeCategory;
        const matchesQuery = !query || card.dataset.name.toLowerCase().includes(query);
        card.classList.toggle("is-hidden", !(matchesCategory && matchesQuery));
    });
    document.querySelectorAll(".categoryTab").forEach(tab => tab.classList.toggle("active", tab.dataset.category === activeCategory));
}

function renderCatalog() {
    const grid = document.getElementById("soundGrid");
    grid.innerHTML = soundCatalog.map(sound => `
        <article class="soundCard" data-file="${sound.file}" data-name="${sound.name}" data-category="${sound.category}">
            <div class="soundTop">
                <span class="soundOrb"><i class="fa-solid ${sound.icon}"></i></span>
                <div><span class="soundName">${sound.name}</span><span class="soundCategory">${sound.category}</span></div>
                <button type="button" class="soundSelect" aria-label="Add ${sound.name} to mix" aria-pressed="false"><i class="fa-solid fa-plus"></i></button>
            </div>
            <span class="soundStatus">Ready to preview</span>
            <label class="soundVolume"><span>Volume</span><input type="range" min="0" max="1" step="0.01" value="0.35"><output>35%</output></label>
            <audio preload="none" loop src="music/${sound.file}"></audio>
        </article>`).join("");

    grid.addEventListener("click", event => {
        const toggle = event.target.closest(".soundSelect");
        const card = event.target.closest(".soundCard");
        if (toggle && card) {
            const selected = card.classList.toggle("is-selected");
            toggle.setAttribute("aria-pressed", String(selected));
            toggle.innerHTML = `<i class="fa-solid fa-${selected ? "check" : "plus"}"></i>`;
            if (selected) startSound(card); else stopSound(card);
            updateMixCount();
            return;
        }
        if (card && !event.target.closest(".soundVolume")) previewSound(card);
    });

    grid.addEventListener("input", event => {
        if (!event.target.matches(".soundVolume input")) return;
        const card = event.target.closest(".soundCard");
        event.target.parentElement.querySelector("output").textContent = `${Math.round(Number(event.target.value) * 100)}%`;
        const audio = audioMap.get(card.dataset.file);
        if (audio) audio.volume = Number(event.target.value);
    });

    grid.querySelectorAll("audio").forEach(audio => {
        const card = audio.closest(".soundCard");
        audioMap.set(card.dataset.file, audio);
        audio.addEventListener("play", () => { card.classList.add("is-playing"); card.querySelector(".soundStatus").textContent = "Playing now"; });
        audio.addEventListener("pause", () => { card.classList.remove("is-playing"); card.querySelector(".soundStatus").textContent = "Paused"; });
    });
    filterSounds();
}

async function startSound(card) {
    const audio = audioMap.get(card.dataset.file);
    if (!audio) return;
    audio.volume = Number(card.querySelector(".soundVolume input").value);
    try { await audio.play(); } catch (error) { setStatus(`Tap the selected sound again to allow ${card.dataset.name} to play.`, true); }
}

function stopSound(card) {
    const audio = audioMap.get(card.dataset.file);
    if (audio) { audio.pause(); audio.currentTime = 0; }
}

function stopAll() { audioMap.forEach(audio => { audio.pause(); audio.currentTime = 0; }); }

async function previewSound(card) {
    stopAll();
    await startSound(card);
    setStatus(`Previewing ${card.dataset.name}. Add it to your mix with the plus button.`);
}

async function playMix(mix = selectedSounds()) {
    if (!mix.length) { setStatus("Choose at least one sound to play your mix.", true); return; }
    stopAll();
    const blocked = [];
    await Promise.all(mix.map(async item => {
        const audio = audioMap.get(item.file);
        if (!audio) return;
        audio.volume = item.volume;
        try { await audio.play(); } catch (error) { blocked.push(item.name); }
    }));
    setStatus(blocked.length ? `Tap Play again to allow: ${blocked.join(", ")}.` : `${mix.length} sounds are playing together.`);
}

function updateMixCount() {
    const count = document.querySelectorAll(".soundCard.is-selected").length;
    document.getElementById("mixCount").textContent = `${count} selected`;
}

function renderFavorites() {
    const list = document.getElementById("favoriteList");
    list.innerHTML = favorites.length ? favorites.map((favorite, index) => {
        const sounds = favorite.sounds || favorite.tracks || [];
        return `<div class="favoriteItem"><div><strong>${favorite.name}</strong><small>${sounds.length} sounds saved</small></div><div class="favoriteActions"><button type="button" data-action="play" data-index="${index}" aria-label="Play ${favorite.name}"><i class="fa-solid fa-play"></i></button><button type="button" data-action="stop" data-index="${index}" aria-label="Stop ${favorite.name}"><i class="fa-solid fa-stop"></i></button><button type="button" data-action="load" data-index="${index}" aria-label="Load ${favorite.name}"><i class="fa-solid fa-arrow-rotate-left"></i></button><button type="button" data-action="delete" data-index="${index}" aria-label="Delete ${favorite.name}"><i class="fa-solid fa-xmark"></i></button></div></div>`;
    }).join("") : '<div class="emptyState">No saved mixes yet. Choose a few sounds and save your first calm space.</div>';
}

function loadMix(sounds) {
    stopAll();
    document.querySelectorAll(".soundCard").forEach(card => {
        const item = sounds.find(sound => sound.file === card.dataset.file);
        const selected = Boolean(item);
        card.classList.toggle("is-selected", selected);
        const button = card.querySelector(".soundSelect");
        button.setAttribute("aria-pressed", String(selected));
        button.innerHTML = `<i class="fa-solid fa-${selected ? "check" : "plus"}"></i>`;
        if (item) {
            card.querySelector(".soundVolume input").value = item.volume;
            card.querySelector("output").textContent = `${Math.round(item.volume * 100)}%`;
        }
    });
    updateMixCount();
}

document.addEventListener("DOMContentLoaded", function() {
    renderCatalog();
    renderCategories();
    renderFavorites();
    document.getElementById("soundSearch").addEventListener("input", filterSounds);
    document.getElementById("categoryTabs").addEventListener("click", event => { const tab = event.target.closest(".categoryTab"); if (!tab) return; activeCategory = tab.dataset.category; filterSounds(); });
    document.getElementById("playMix").addEventListener("click", () => playMix());
    const stopButton = document.getElementById("stopMix");
    if (stopButton) stopButton.addEventListener("click", () => { stopAll(); setStatus("Mix stopped."); });
    document.getElementById("clearMix").addEventListener("click", () => { loadMix([]); setStatus("Mix cleared."); });
    document.getElementById("mobileFavoritesToggle").addEventListener("click", function() {
        const list = document.getElementById("favoriteList");
        const isOpen = list.classList.toggle("is-open");
        this.setAttribute("aria-expanded", String(isOpen));
        this.setAttribute("aria-label", isOpen ? "Hide saved mixes" : "Show saved mixes");
        this.title = isOpen ? "Hide saved mixes" : "Show saved mixes";
        this.innerHTML = `<i class="fa-regular fa-bookmark${isOpen ? "-slash" : ""}" aria-hidden="true"></i>`;
    });
    document.getElementById("saveFavorite").addEventListener("click", () => {
        const sounds = selectedSounds();
        if (!sounds.length) { setStatus("Choose at least one sound before saving a favourite.", true); return; }
        const defaultName = `Sleep mix ${favorites.length + 1}`;
        const enteredName = window.prompt("Name this favourite mix:", defaultName);
        if (enteredName === null) {
            setStatus("Favourite mix was not saved.");
            return;
        }
        const name = enteredName.trim() || defaultName;
        const savedSounds = sounds.map(sound => ({ file: sound.file, name: sound.name, volume: Number(sound.volume) }));
        favorites.push({ name, sounds: savedSounds });
        const stored = saveFavorites();
        renderFavorites();
        setStatus(stored ? `Saved ${sounds.length} sound${sounds.length === 1 ? "" : "s"} to ${name}.` : `Saved ${sounds.length} sound${sounds.length === 1 ? "" : "s"} for this session, but browser storage is unavailable.`, !stored);
    });
    document.getElementById("favoriteList").addEventListener("click", event => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const favorite = favorites[Number(button.dataset.index)];
        const sounds = favorite.sounds || favorite.tracks || [];
        if (button.dataset.action === "play") playMix(sounds);
        if (button.dataset.action === "stop") { stopAll(); setStatus(`Stopped ${favorite.name}.`); }
        if (button.dataset.action === "load") { loadMix(sounds); setStatus(`Loaded ${favorite.name}.`); }
        if (button.dataset.action === "delete") { if (!confirm(`Delete ${favorite.name}?`)) return; favorites.splice(Number(button.dataset.index), 1); saveFavorites(); renderFavorites(); }
    });
    updateMixCount();
});
