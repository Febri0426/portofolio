// Typing effect
const text = "Mahasiswa Teknik Informatika | UI/UX Designer & Frontend Developer";
let index = 0;

function typeEffect() {
  const el = document.querySelector(".typing");
  if (index < text.length) {
    el.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 60);
  }
}

window.addEventListener("load", typeEffect);

// Scroll animation
const faders = document.querySelectorAll(".fade-slide");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {threshold: 0.2});

faders.forEach(f => observer.observe(f));

// Dark mode
document.getElementById("darkToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
