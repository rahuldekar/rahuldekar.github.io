// ===== Helpers =====
const $ = (sel) => document.querySelector(sel);

const themeToggle = $("#themeToggle");
const themeIcon = $("#themeIcon");
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");
const yearEl = $("#year");
const scrollProgress = $("#scrollProgress");
const contactForm = $("#contactForm");

// ===== Theme (Dark/Light) =====
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeIcon.textContent = theme === "light" ? "☀️" : "🌙";
}

(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return applyTheme(saved);

  // Default: dark, but respect OS preference
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(prefersLight ? "light" : "dark");
})();

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
});

// ===== Mobile nav =====
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("show");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after clicking a link (mobile)
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("show");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ===== Footer year =====
yearEl.textContent = new Date().getFullYear();

// ===== Scroll progress =====
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
});

// ===== Contact form (no backend) =====
// Opens mail client using mailto:
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(contactForm);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const subject = (data.get("subject") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  const to = "rahul.dekar@email.com"; // Change to your real email
  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n\n` +
    `${message}`;

  const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  contactForm.reset();
});