// Typing effect
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

// Scroll animation
const faders = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// Dark / Light mode
const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkToggle.innerHTML = "🌙";
  } else {
    darkToggle.innerHTML = "☀️";
  }
});

// Mobile menu
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navMenu").classList.toggle("show");
});

// Open certificate image fullscreen
function openImage(src) {
  const win = window.open();
  win.document.write(`<title>Preview</title><img src="${src}" style="width:100%">`);
}
