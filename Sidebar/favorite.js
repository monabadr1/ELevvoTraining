const DEMO_ITEMS = [
  { id: 1, name: "Brown Jacket", price: 950, image: "images/jacket.jpg" },
  { id: 2, name: "Red Dress", price: 1200, image: "images/dress.jpg" },
  { id: 3, name: "Handbag", price: 700, image: "images/bag.jpg" },
];

const FAVORITES_KEY = "favorite_items";

function loadFavorites() {
  const raw = localStorage.getItem(FAVORITES_KEY);
  if (!raw) return DEMO_ITEMS;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEMO_ITEMS;
  } catch {
    return DEMO_ITEMS;
  }
}

function saveFavorites(items) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
}

let favorites = loadFavorites();

function formatEGP(n) {
  return `${n} EGP`;
}

function renderFavorites() {
  const list = document.getElementById("favoriteList");
  if (!list) return;

  if (favorites.length === 0) {
    list.innerHTML = `<div class="empty">Your favorites list is empty.</div>`;
    return;
  }

  list.innerHTML = favorites.map(it => `
    <article class="favorite-item">
      <img src="${it.image}" alt="${it.name}" />

      <div>
        <h3 class="item-title">${it.name}</h3>
        <div class="item-price">${formatEGP(it.price)}</div>
      </div>

      <div class="item-actions">
        <button class="fav-heart" data-action="remove" data-id="${it.id}" aria-label="Remove from favorites">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
    </article>
  `).join("");

  saveFavorites(favorites);
}

function removeFavorite(id) {
  favorites = favorites.filter(it => it.id !== id);
  renderFavorites();
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;
  const id = Number(btn.dataset.id);

  if (action === "remove") removeFavorite(id);
});

document.addEventListener("DOMContentLoaded", renderFavorites);