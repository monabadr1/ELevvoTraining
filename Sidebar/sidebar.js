function setActiveLink() {
  const currentPage = location.pathname.split("/").pop() || "home.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === currentPage);
  });
}

function bindSidebarUI() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");
  const toggleIcon = document.getElementById("toggleIcon");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("expanded");
      const expanded = sidebar.classList.contains("expanded");
      if (toggleIcon) {
        toggleIcon.className = expanded
          ? "fa-solid fa-angles-left"
          : "fa-solid fa-angles-right";
      }
    });
  }

  const overlay = document.getElementById("overlay");
  const mobileOpen = document.getElementById("mobileOpen");

  if (mobileOpen && overlay) {
    mobileOpen.addEventListener("click", () => {
      sidebar.classList.add("active");
      overlay.classList.add("active");
    });

    function closeMobileSidebar() {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    }

    overlay.addEventListener("click", closeMobileSidebar);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileSidebar();
    });
  }
}

function bindSubmenu() {
  const menuToggle = document.getElementById("menuToggle");
  if (!menuToggle) return;

  const submenuWrapper = menuToggle.closest(".has-submenu");
  if (!submenuWrapper) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = submenuWrapper.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

async function loadSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  try {
    const res = await fetch("sidebar.html");
    if (!res.ok) throw new Error("sidebar.html not found: " + res.status);

    sidebar.innerHTML = await res.text();

    bindSidebarUI();
    bindSubmenu();
    setActiveLink();
  } catch (e) {
    console.error(e);
    sidebar.innerHTML = "<p style='padding:12px'>Sidebar failed to load</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadSidebar);