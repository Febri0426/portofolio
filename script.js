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
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));

// Dark Mode
const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkToggle.innerHTML = "🌙";
  } else {
    darkToggle.innerHTML = "☀️";
  }
});

// klik sertifikat
function openImage(src) {
  const win = window.open();
  win.document.write(`<img src="${src}" style="width:100%">`);
}


// Mobile Menu
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navMenu").classList.toggle("show");
});
