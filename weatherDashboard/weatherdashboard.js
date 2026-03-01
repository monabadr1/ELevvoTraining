window.OWM_API_KEY = "2f2b400a9635e9307c0914e051809074";

window.DEFAULT_CITIES = ["Cairo", "Alexandria", "Dubai", "London", "New York"];
const API_KEY = window.OWM_API_KEY;
const DEFAULT_CITIES = window.DEFAULT_CITIES || ["Cairo", "London"];

const grid = document.getElementById("grid");
const chips = document.getElementById("chips");
const toast = document.getElementById("toast");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const refreshBtn = document.getElementById("refreshBtn");



const state = {
  cities: loadCities(),         
  data: new Map(),              
  loading: new Set(),          
};

function saveCities() {
  localStorage.setItem("wd_cities", JSON.stringify(state.cities));
}
function loadCities() {
  try {
    const raw = localStorage.getItem("wd_cities");
    if (!raw) return [...DEFAULT_CITIES];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) return parsed;
    return [...DEFAULT_CITIES];
  } catch {
    return [...DEFAULT_CITIES];
  }
}

function showToast(msg, kind = "good") {
  toast.textContent = msg;
  toast.className = `toast show ${kind}`;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

function iconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
function round1(n) {
  return Math.round(n * 10) / 10;
}
function formatDayLabel(date) {
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

async function fetchJson(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`);
  }
  return res.json();
}

function build3DayForecast(list) {
  const byDay = new Map();
  for (const item of list) {
    const dt = new Date(item.dt * 1000);
    const key = dt.toISOString().slice(0, 10);
    const arr = byDay.get(key) || [];
    arr.push(item);
    byDay.set(key, arr);
  }

  const keysSorted = Array.from(byDay.keys()).sort();
  const todayKey = new Date().toISOString().slice(0, 10);

  const nextKeys = keysSorted.filter(k => k >= todayKey).slice(0, 3);

  return nextKeys.map((k) => {
    const items = byDay.get(k);
    let min = Infinity;
    let max = -Infinity;

    let best = items[0];
    let bestScore = Infinity;

    for (const it of items) {
      const tMin = it.main?.temp_min ?? it.main?.temp ?? 0;
      const tMax = it.main?.temp_max ?? it.main?.temp ?? 0;
      min = Math.min(min, tMin);
      max = Math.max(max, tMax);

      const hour = new Date(it.dt * 1000).getHours();
      const score = Math.abs(hour - 12);
      if (score < bestScore) {
        bestScore = score;
        best = it;
      }
    }

    const d = new Date(k + "T12:00:00");
    return {
      dateLabel: formatDayLabel(d),
      minC: round1(min),
      maxC: round1(max),
      icon: best.weather?.[0]?.icon || "01d",
      desc: best.weather?.[0]?.description || "",
    };
  });
}

function cardSkeleton(city) {
  return `
  <article class="card skeleton" data-city="${escapeHtml(city)}">
    <div class="top">
      <div class="city">
        <div class="skel-line" style="width:140px"></div>
        <div class="skel-line" style="width:100px"></div>
      </div>
      <div class="skel-line" style="width:44px; height:34px; border-radius:12px"></div>
    </div>
    <div class="skel-big"></div>
    <div class="skel-line" style="width:120px"></div>
    <div class="stats">
      <div class="stat"><div class="skel-line"></div><div class="skel-line" style="width:60%"></div></div>
      <div class="stat"><div class="skel-line"></div><div class="skel-line" style="width:60%"></div></div>
      <div class="stat"><div class="skel-line"></div><div class="skel-line" style="width:60%"></div></div>
    </div>
    <div class="forecast">
      <div class="day"><div class="skel-line"></div><div class="skel-line" style="width:70%"></div></div>
      <div class="day"><div class="skel-line"></div><div class="skel-line" style="width:70%"></div></div>
      <div class="day"><div class="skel-line"></div><div class="skel-line" style="width:70%"></div></div>
    </div>
  </article>`;
}

function render() {
  // chips
  chips.innerHTML = state.cities.map(c => `
    <div class="chip">
      <b>${escapeHtml(c)}</b>
      <button title="Remove" data-remove="${escapeHtml(c)}">×</button>
    </div>
  `).join("");

  // grid
  grid.innerHTML = state.cities.map(city => {
    if (state.loading.has(city) || !state.data.has(city)) return cardSkeleton(city);
    return card(state.data.get(city));
  }).join("");
}

function card(w) {
  const updated = new Date(w.updatedAt).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  return `
  <article class="card" data-city="${escapeHtml(w.city)}">
    <div class="top">
      <div class="city">
        <div class="name">${escapeHtml(w.city)}${w.country ? `, ${escapeHtml(w.country)}` : ""}</div>
        <div class="meta">Updated ${updated}</div>
      </div>
      <button class="kebab" data-remove="${escapeHtml(w.city)}">Remove</button>
    </div>

    <div class="now">
      <div>
        <div class="temp">${Math.round(w.tempC)}°</div>
        <div class="desc">${escapeHtml(capitalize(w.description))}</div>
      </div>
      <img class="icon" src="${iconUrl(w.icon)}" alt="${escapeHtml(w.description)}" />
    </div>

    <div class="stats">
      <div class="stat">
        <div class="label">Feels like</div>
        <div class="value">${Math.round(w.feelsLikeC)}°</div>
      </div>
      <div class="stat">
        <div class="label">Humidity</div>
        <div class="value">${w.humidity}%</div>
      </div>
      <div class="stat">
        <div class="label">Wind</div>
        <div class="value">${round1(w.windMps)} m/s</div>
      </div>
    </div>

    <div class="forecast">
      ${w.forecast3.map(d => `
        <div class="day">
          <div class="d">${escapeHtml(d.dateLabel)}</div>
          <div class="mm">
            <div class="range">${Math.round(d.minC)}° / ${Math.round(d.maxC)}°</div>
            <img src="${iconUrl(d.icon)}" alt="${escapeHtml(d.desc)}" />
          </div>
        </div>
      `).join("")}
    </div>
  </article>`;
}

async function fetchCityWeather(city, abortSignal) {
  const q = encodeURIComponent(city);

  const currentUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${API_KEY}&units=metric`;

  const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${API_KEY}&units=metric`;

  const [current, forecast] = await Promise.all([
    fetchJson(currentUrl, abortSignal),
    fetchJson(forecastUrl, abortSignal),
  ]);

  const w = {
    city: current.name || city,
    country: current.sys?.country,
    tempC: current.main?.temp ?? 0,
    feelsLikeC: current.main?.feels_like ?? 0,
    humidity: current.main?.humidity ?? 0,
    windMps: current.wind?.speed ?? 0,
    description: current.weather?.[0]?.description ?? "",
    icon: current.weather?.[0]?.icon ?? "01d",
    updatedAt: Date.now(),
    forecast3: build3DayForecast(forecast.list || []),
  };

  return w;
}

let controller = null;

async function refreshAll() {
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    showToast("Add your API key in config.js", "bad");
    return;
  }

  controller?.abort();
  controller = new AbortController();

  state.cities.forEach(c => state.loading.add(c));
  render();

  await Promise.allSettled(
    state.cities.map(async (city) => {
      try {
        const w = await fetchCityWeather(city, controller.signal);
        state.data.set(city, w);
      } catch (e) {
        console.error(city, e);
        showToast(`Could not load "${city}"`, "bad");
        state.data.delete(city);
      } finally {
        state.loading.delete(city);
        render();
      }
    })
  );
}

function addCity(city) {
  const c = city.trim();
  if (!c) return;

  // prevent duplicates (case-insensitive)
  const exists = state.cities.some(x => x.toLowerCase() === c.toLowerCase());
  if (exists) {
    showToast("City already added", "bad");
    return;
  }

  state.cities.unshift(c);
  saveCities();
  state.loading.add(c);
  render();

  // load it
  controller?.abort();
  controller = new AbortController();
  fetchCityWeather(c, controller.signal)
    .then(w => {
      state.data.set(c, w);
      showToast("Added", "good");
    })
    .catch(err => {
      console.error(err);
      showToast(`City not found: "${c}"`, "bad");
      state.cities = state.cities.filter(x => x !== c);
      saveCities();
    })
    .finally(() => {
      state.loading.delete(c);
      render();
    });
}

function removeCity(city) {
  state.cities = state.cities.filter(c => c !== city);
  state.data.delete(city);
  state.loading.delete(city);
  saveCities();
  render();
}

function capitalize(s) {
  return (s || "").charAt(0).toUpperCase() + (s || "").slice(1);
}
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addCity(searchInput.value);
  searchInput.value = "";
});

refreshBtn.addEventListener("click", refreshAll);

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-remove]");
  if (btn) removeCity(btn.getAttribute("data-remove"));
});

render();
refreshAll();

setInterval(refreshAll, 10 * 60 * 1000);