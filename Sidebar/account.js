const PROFILE_KEY = "user_profile";

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {
      fullName: "Name",
      email: "Name@email.com",
      phone: "",
      address: "Egypt"
    };
  } catch {
    return { fullName: "Wafa", email: "wafa@email.com", phone: "", address: "" };
  }
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function fillProfileUI(profile) {
  document.getElementById("fullName").value = profile.fullName || "";
  document.getElementById("email").value = profile.email || "";
  document.getElementById("phone").value = profile.phone || "";
  document.getElementById("address").value = profile.address || "";

  const avatar = document.getElementById("avatar");
  const letter = (profile.fullName || "W").trim().charAt(0).toUpperCase();
  avatar.textContent = letter || "W";
}

const ORDERS_KEY = "user_orders";

const DEMO_ORDERS = [
  {
    id: "ORD-1001",
    date: "2026-02-11",
    status: "Processing",
    total: 2850,
    items: [
      { name: "Brown Jacket", price: 950, qty: 1, image: "images/jacket.jpg" },
      { name: "Red Dress", price: 1200, qty: 1, image: "images/dress.jpg" },
      { name: "Handbag", price: 700, qty: 1, image: "images/bag.jpg" },
    ]
  }
];

function loadOrders() {
  const raw = localStorage.getItem(ORDERS_KEY);
  if (!raw) return DEMO_ORDERS;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEMO_ORDERS;
  } catch {
    return DEMO_ORDERS;
  }
}

function formatEGP(n){ return `${n} EG`; }

function renderOrders(orders) {
  const wrap = document.getElementById("ordersList");
  const count = document.getElementById("ordersCount");
  if (!wrap) return;

  count.textContent = orders.length;

  if (orders.length === 0) {
    wrap.innerHTML = `<div class="empty">No orders yet.</div>`;
    return;
  }

  wrap.innerHTML = orders.map(o => `
    <div class="order">
      <div class="order-top">
        <div>
          <div class="order-id">${o.id}</div>
          <div class="muted">${o.date}</div>
        </div>
        <span class="badge">${o.status}</span>
      </div>

      <div class="order-items">
        ${o.items.map(it => `
          <div class="order-item">
            <img src="${it.image}" alt="${it.name}">
            <div>
              <div style="font-weight:700">${it.name}</div>
              <div class="muted" style="font-size:12px">${it.qty} × ${formatEGP(it.price)}</div>
            </div>
            <div style="font-weight:800">${formatEGP(it.price * it.qty)}</div>
          </div>
        `).join("")}
      </div>

      <div class="order-total">
        <span>Total</span>
        <span>${formatEGP(o.total)}</span>
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  loadSidebar();

  const profile = loadProfile();
  fillProfileUI(profile);

  document.getElementById("saveProfileBtn").addEventListener("click", () => {
    const newProfile = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      address: document.getElementById("address").value.trim(),
    };
    saveProfile(newProfile);
    fillProfileUI(newProfile);
    alert("Profile saved ✅");
  });

  const orders = loadOrders();
  renderOrders(orders);
});