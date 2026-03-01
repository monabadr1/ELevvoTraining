function setActiveLink() {
  const currentPage = location.pathname.split("/").pop() || "home.html";
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(a => {
    const href = a.getAttribute("href");
    if (href === currentPage) a.classList.add("active");
    else a.classList.remove("active");
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
  console.log("menu clicked");

  menuToggle.addEventListener("click", () => {
    const isOpen = submenuWrapper.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

  });
}

document.addEventListener("DOMContentLoaded", loadSidebar);
