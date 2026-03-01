document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});

const toggleBtn = document.getElementById("darkToggle");

function setLightMode(isLight) {
  document.body.classList.toggle("light-mode", isLight);
  localStorage.setItem("light-mode", isLight ? "1" : "0");

  if (toggleBtn) {
    toggleBtn.innerHTML = isLight
      ? `<i class="fa-solid fa-moon"></i><span>Dark</span>`
      : `<i class="fa-solid fa-sun"></i><span>Light</span>`;
  }

  console.log("Light mode:", isLight, "Body classes:", document.body.className);
}

const saved = localStorage.getItem("light-mode");
setLightMode(saved === "1");

toggleBtn?.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light-mode");
  setLightMode(!isLight);
});

function animateCount(el, to){
  const isFloat = String(to).includes(".");
  const duration = 900;
  const start = performance.now();

  function tick(t){
    const p = Math.min(1, (t - start) / duration);
    const val = isFloat ? (to * p) : Math.floor(to * p);
    el.textContent = isFloat ? val.toFixed(1) : val.toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statNums = document.querySelectorAll(".stat__num");
const statsSection = document.querySelector(".stats");

if (statsSection && statNums.length) {
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      statNums.forEach(n => animateCount(n, Number(n.dataset.count)));
      statsObs.disconnect();
    });
  }, { threshold: 0.35 });

  statsObs.observe(statsSection);
}

const demoText = document.getElementById("demoText");
const demoOut = document.getElementById("demoOut");
const runDemo = document.getElementById("runDemo");

function makeMockSummary(txt){
  const cleaned = txt.trim().replace(/\s+/g, " ");
  if (!cleaned) return null;

  const sentences = cleaned.split(/[.!?]\s+/).filter(Boolean);
  const take = sentences.slice(0, Math.min(2, sentences.length));
  const keywords = cleaned
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF\s]/g, "")
    .split(/\s+/)
    .filter(w => w.length >= 5)
    .slice(0, 6);

  return { take, keywords };
}

runDemo?.addEventListener("click", () => {
  const txt = demoText?.value || "";
  const res = makeMockSummary(txt);

  if (!res) {
    demoOut.innerHTML = `<div class="demo__empty">Please paste some text first ✨</div>`;
    return;
  }

  demoOut.innerHTML = `
    <div style="display:grid; gap:12px;">
      <div>
        <strong>Summary</strong>
        <ul style="margin-top:8px; padding-left:18px; color:#a1a1aa; line-height:1.7;">
          ${res.take.map(s => `<li>${s}</li>`).join("")}
        </ul>
      </div>

      <div>
        <strong>Quick Quiz</strong>
        <div style="margin-top:8px; color:#a1a1aa; line-height:1.7;">
          1) What is the main idea of the text?<br/>
          2) Mention two key points from the summary.<br/>
          3) Explain one concept in simple words.
        </div>
      </div>

      <div>
        <strong>Keywords</strong>
        <div style="margin-top:8px; display:flex; flex-wrap:wrap; gap:8px;">
          ${res.keywords.map(k => `<span style="border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.04); padding:6px 10px; border-radius:999px; color:#a1a1aa; font-size:12px;">${k}</span>`).join("")}
        </div>
      </div>
    </div>
  `;
});