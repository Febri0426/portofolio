// Load theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

const darkToggle = document.getElementById("darkToggle");

function updateIcon() {
  darkToggle.textContent =
    document.body.classList.contains("dark") ? "🌙" : "☀️";
}
updateIcon();

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
  updateIcon();
});

// Typing Effect
const text = "UI/UX Designer & Web Developer";
let index = 0;
const el = document.querySelector(".typing");

function typingEffect() {
  if (index < text.length) {
    el.textContent += text.charAt(index);
    index++;
    setTimeout(typingEffect, 60);
  }
}
window.addEventListener("load", typingEffect);

// Scroll animation
const faders = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// Mobile menu
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navMenu").classList.toggle("show");
});

// Open certificate
function openImage(src) {
  const win = window.open();
  win.document.write(`<img src="${src}" style="width:100%">`);
}
