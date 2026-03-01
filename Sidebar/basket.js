const DEMO_ITEMS = [
  { id: 1, name: "Brown Jacket", price: 950, qty: 1, image: "images/jacket.jpg" },
  { id: 2, name: "red Dress", price: 1200, qty: 2, image: "images/dress.jpg" },
  { id: 3, name: "Handbag", price: 700, qty: 1, image: "images/bag.jpg" },
];

const STORAGE_KEY = "basket_items";

function loadBasket() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEMO_ITEMS; 
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEMO_ITEMS;
  } catch {
    return DEMO_ITEMS;
  }
}

function saveBasket(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

let basketItems = loadBasket();

function formatEGP(n) {
  return `${n} EG`;
}

function calcTotals(items) {
  let count = 0;
  let total = 0;
  items.forEach(it => {
    count += it.qty;
    total += it.price * it.qty;
  });
  return { count, total };
}

function renderBasket() {
  const list = document.getElementById("basketList");
  const itemsCount = document.getElementById("itemsCount");
  const totalPrice = document.getElementById("totalPrice");

  if (!list) return;

  if (basketItems.length === 0) {
    list.innerHTML = `<div class="empty">Your basket is empty.</div>`;
  } else {
    list.innerHTML = basketItems.map(it => `
      <article class="basket-item">
        <img src="${it.image}" alt="${it.name}" />

        <div>
          <h3 class="item-title">${it.name}</h3>
          <div class="item-price">${formatEGP(it.price)}</div>

          <div class="qty">
            <button data-action="dec" data-id="${it.id}">-</button>
            <span>${it.qty}</span>
            <button data-action="inc" data-id="${it.id}">+</button>
          </div>
        </div>

        <div class="item-actions">
          <button class="remove-btn" data-action="remove" data-id="${it.id}">
            Remove
          </button>
        </div>
      </article>
    `).join("");
  }

  const { count, total } = calcTotals(basketItems);
  itemsCount.textContent = count;
  totalPrice.textContent = formatEGP(total);

  saveBasket(basketItems);
}

function updateQty(id, delta) {
  basketItems = basketItems.map(it => {
    if (it.id !== id) return it;
    const newQty = Math.max(1, it.qty + delta);
    return { ...it, qty: newQty };
  });
  renderBasket();
}

function removeItem(id) {
  basketItems = basketItems.filter(it => it.id !== id);
  renderBasket();
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;

  const action = btn.dataset.action;
  const id = Number(btn.dataset.id);

  if (action === "inc") updateQty(id, +1);
  if (action === "dec") updateQty(id, -1);
  if (action === "remove") removeItem(id);
});

document.addEventListener("DOMContentLoaded", () => {
  loadSidebar();
  renderBasket();

  const clearBtn = document.getElementById("clearBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      basketItems = [];
      renderBasket();
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Checkout coming soon");
    });
  }
});