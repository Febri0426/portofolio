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
const fades = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

fades.forEach(el => observer.observe(el));

// Dark mode
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Mobile Menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});
