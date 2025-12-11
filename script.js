if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Typing Effect
const text = "UI/UX Designer & Web Developer";
let index = 0;
const el = document.querySelector(".typing");

function typingEffect() {
  if (index < text.length) {
    el.innerHTML += text.charAt(index);
    index++;
    setTimeout(typingEffect, 60);
  }
}
window.addEventListener("load", typingEffect);

// Scroll Animation
const faders = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// DARK MODE + ICON TOGGLE
const darkToggle = document.getElementById("darkToggle");

// Set ikon saat page pertama kali dibuka
if (document.body.classList.contains("dark")) {
  darkToggle.textContent = "🌙";
} else {
  darkToggle.textContent = "☀️";
}

// Saat tombol diklik
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkToggle.textContent = "🌙";
  } else {
    darkToggle.textContent = "☀️";
  }
});

// Mobile Menu
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navMenu").classList.toggle("show");
});

// Open Certificate Fullscreen
function openImage(src) {
  const win = window.open();
  win.document.write(`<img src="${src}" style="width:100%">`);
}
