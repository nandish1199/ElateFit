const mixerCatalog = [
    ["campFire.mp3", "Campfire"], ["carDriveBy.mp3", "Car Drive By"], ["distantThunder.mp3", "Distant Thunder"], ["FactoryHard.mp3", "Factory Hard"], ["factoryMorning.mp3", "Factory Morning"], ["hero.mp3", "Soft Atmosphere"], ["highway1.mp3", "Highway One"], ["highway2.mp3", "Highway Two"], ["hit.mp3", "Soft Pulse"], ["IceRain.mp3", "Ice Rain"], ["KidsPlaying.mp3", "Kids Playing"], ["LakeWindAmbience.mp3", "Lake Wind"], ["rainOnCarHeavy.mp3", "Heavy Rain on Car"], ["rainOnRoof.mp3", "Rain on Roof"], ["RainOnRooftop.mp3", "Rain on Rooftop"], ["rainWaterDrop.mp3", "Rain Drops"], ["silver.mp3", "Silver Ambience"], ["windForest.mp3", "Forest Wind"], ["windQuietCreaks.mp3", "Quiet Wind"], ["WoodDanHenig.mp3", "Wooden Strings"]
].map(([file, name]) => ({ file, name }));

const MIXER_STORAGE_KEY = "elateFitSleepMixFavorites";
const audioTracks = new Map();
let favorites = loadFavorites();

function loadFavorites() {
    try { return JSON.parse(localStorage.getItem(MIXER_STORAGE_KEY) || "[]"); } catch (error) { return []; }
}

function saveFavorites() { localStorage.setItem(MIXER_STORAGE_KEY, JSON.stringify(favorites)); }

function selectedMix() {
    return [...document.querySelectorAll(".trackCard.is-selected")].map(card => ({
        file: card.dataset.file,
        name: card.dataset.name,
        volume: Number(card.querySelector(".trackVolume input").value)
    }));
}

function setStatus(message, error = false) {
    const status = document.getElementById("mixerStatus");
    status.textContent = message;
    status.style.color = error ? "#a45e4c" : "#687873";
}

function updatePlayingStatus() {
    const playing = [...document.querySelectorAll(".trackCard.is-playing .trackName")].map(item => item.textContent);
    if (playing.length) setStatus(`${playing.length} track${playing.length === 1 ? " is" : "s are"} playing: ${playing.join(", ")}.`);
}

async function previewTrack(card) {
    const audio = audioTracks.get(card.dataset.file);
    if (!audio) return;
    stopMix();
    audio.volume = Number(card.querySelector(".trackVolume input").value);
    try {
        await audio.play();
        setStatus(`Previewing ${card.dataset.name}. Adjust the volume, then select it for your mix.`);
    } catch (error) {
        setStatus(`Tap the preview again to allow ${card.dataset.name} to play.`, true);
    }
}

function renderCatalog() {
    const grid = document.getElementById("trackGrid");
    grid.innerHTML = mixerCatalog.map(track => `
        <article class="trackCard" data-file="${track.file}" data-name="${track.name}">
            <button type="button" class="trackToggle" aria-label="Select ${track.name}" aria-pressed="false"><i class="fa-solid fa-plus"></i></button>
            <div><span class="trackName">${track.name}</span><span class="trackFile">${track.file}</span><span class="trackState">Ready</span></div>
            <label class="trackVolume">Volume <input type="range" min="0" max="1" step="0.01" value="0.35"><output>35%</output></label>
            <audio preload="none" loop src="music/${track.file}"></audio>
        </article>`).join("");

    grid.addEventListener("click", event => {
        const toggle = event.target.closest(".trackToggle");
        if (toggle) {
            const card = toggle.closest(".trackCard");
            const selected = card.classList.toggle("is-selected");
            toggle.setAttribute("aria-pressed", String(selected));
            toggle.innerHTML = `<i class="fa-solid fa-${selected ? "check" : "plus"}"></i>`;
            if (selected) {
                playSelectedTrack(card);
            } else {
                const audio = audioTracks.get(card.dataset.file);
                if (audio) { audio.pause(); audio.currentTime = 0; }
            }
            return;
        }
        const card = event.target.closest(".trackCard");
        if (card && !event.target.closest(".trackVolume")) previewTrack(card);
    });

    grid.addEventListener("input", event => {
        if (!event.target.matches(".trackVolume input")) return;
        const output = event.target.parentElement.querySelector("output");
        output.textContent = `${Math.round(Number(event.target.value) * 100)}%`;
        const card = event.target.closest(".trackCard");
        const track = audioTracks.get(card.dataset.file);
        if (track) track.volume = Number(event.target.value);
    });

    grid.querySelectorAll("audio").forEach(audio => {
        const card = audio.closest(".trackCard");
        audioTracks.set(card.dataset.file, audio);
        audio.addEventListener("play", () => {
            card.classList.add("is-playing");
            card.querySelector(".trackState").textContent = "Playing now";
            updatePlayingStatus();
        });
        audio.addEventListener("pause", () => {
            card.classList.remove("is-playing");
            card.querySelector(".trackState").textContent = "Paused";
            updatePlayingStatus();
        });
        audio.addEventListener("ended", () => {
            card.classList.remove("is-playing");
            card.querySelector(".trackState").textContent = "Finished";
        });
    });
}

async function playSelectedTrack(card) {
    const audio = audioTracks.get(card.dataset.file);
    if (!audio) return;
    audio.volume = Number(card.querySelector(".trackVolume input").value);
    try {
        await audio.play();
    } catch (error) {
        setStatus(`Tap the plus button again to allow ${card.dataset.name} to play.`, true);
    }
}

function stopMix() {
    audioTracks.forEach(audio => { audio.pause(); audio.currentTime = 0; });
}

async function playMix(mix = selectedMix()) {
    if (!mix.length) { setStatus("Select at least one track to play a mix.", true); return; }
    stopMix();
    const failed = [];
    await Promise.all(mix.map(async item => {
        const audio = audioTracks.get(item.file);
        if (!audio) return;
        audio.volume = item.volume;
        try { await audio.play(); } catch (error) { failed.push(item.name); }
    }));
    setStatus(failed.length ? `Browser blocked playback for: ${failed.join(", ")}. Tap Play again to allow audio.` : `${mix.length} tracks are playing together.`);
}

function renderFavorites() {
    const list = document.getElementById("favoriteList");
    list.innerHTML = favorites.length ? favorites.map((favorite, index) => `
        <div class="favoriteItem"><div><strong>${favorite.name}</strong><small>${favorite.tracks.length} tracks · saved mix</small></div><div class="favoriteActions"><button type="button" data-action="play" data-index="${index}" aria-label="Play ${favorite.name}"><i class="fa-solid fa-play"></i></button><button type="button" data-action="load" data-index="${index}" aria-label="Load ${favorite.name}"><i class="fa-solid fa-arrow-rotate-left"></i></button><button type="button" data-action="delete" data-index="${index}" aria-label="Delete ${favorite.name}"><i class="fa-solid fa-xmark"></i></button></div></div>`).join("") : '<div class="emptyFavorite">No favourite mixes yet. Select a few tracks, set their volumes, and save the mix.</div>';
}

function loadMix(mix) {
    stopMix();
    document.querySelectorAll(".trackCard").forEach(card => {
        const item = mix.find(track => track.file === card.dataset.file);
        const selected = Boolean(item);
        card.classList.toggle("is-selected", selected);
        const toggle = card.querySelector(".trackToggle");
        toggle.setAttribute("aria-pressed", String(selected));
        toggle.innerHTML = `<i class="fa-solid fa-${selected ? "check" : "plus"}"></i>`;
        if (item) {
            const input = card.querySelector(".trackVolume input");
            input.value = item.volume;
            card.querySelector("output").textContent = `${Math.round(item.volume * 100)}%`;
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    renderCatalog();
    renderFavorites();
    document.getElementById("playMix").addEventListener("click", () => playMix());
    document.getElementById("stopMix").addEventListener("click", () => { stopMix(); setStatus("Mix stopped."); });
    document.getElementById("saveFavorite").addEventListener("click", function() {
        const tracks = selectedMix();
        if (!tracks.length) { setStatus("Select at least one track before saving a favourite.", true); return; }
        const name = prompt("Name this favourite mix:", `Sleep mix ${favorites.length + 1}`);
        if (!name || !name.trim()) return;
        favorites.push({ name: name.trim(), tracks });
        saveFavorites(); renderFavorites(); setStatus(`Saved favourite mix: ${name.trim()}.`);
    });
    document.getElementById("favoriteList").addEventListener("click", event => {
        const button = event.target.closest("button[data-action]");
        if (!button) return;
        const favorite = favorites[Number(button.dataset.index)];
        if (button.dataset.action === "play") playMix(favorite.tracks);
        if (button.dataset.action === "load") { loadMix(favorite.tracks); setStatus(`Loaded favourite mix: ${favorite.name}.`); }
        if (button.dataset.action === "delete") { if (!confirm(`Delete favourite mix ${favorite.name}?`)) return; favorites.splice(Number(button.dataset.index), 1); saveFavorites(); renderFavorites(); }
    });
});
