// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const btn = document.querySelector('.theme-toggle');
  const icon = document.getElementById('themeIcon');
  
  if (document.body.classList.contains('light-mode')) {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  }
}

// Load saved theme
window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('themeIcon').classList.remove('fa-sun');
    document.getElementById('themeIcon').classList.add('fa-moon');
  }
});

// Mobile Menu Toggle
function toggleMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  const mobileToggle = document.getElementById('mobileToggle');
  navMenu.classList.toggle('active');
  mobileToggle.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll to Section
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) {
    const offsetTop = target.offsetTop - 70;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Modal Functions
function openModal(img) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modal.style.display = 'block';
  modalImg.src = img.src;
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  if (!event || event.target.id === 'modal' || event.target.className === 'close') {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Update active nav link
  updateActiveNav();
});

// Update Active Navigation Link
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

// Scroll Animation with Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .skill-item, .project-card, .experience-card, .certificate-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Add hover effect for skill items (desktop only)
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    if (window.matchMedia('(min-width: 769px)').matches) {
      this.style.transform = 'translateY(-10px) scale(1.05)';
    }
  });
  
  item.addEventListener('mouseleave', function() {
    if (window.matchMedia('(min-width: 769px)').matches) {
      this.style.transform = 'translateY(0) scale(1)';
    }
  });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('modal');
    if (modal.style.display === 'block') {
      closeModal();
    }
    // Close mobile menu
    const navMenu = document.getElementById('navMenu');
    if (navMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
  }
});

// Prevent modal close when clicking on image
document.getElementById('modal-img').addEventListener('click', (e) => {
  e.stopPropagation();
});

// Add loading state for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '1';
  });
  
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.3s';
});

// Touch events for better mobile experience
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
  touchStartY = e.changedTouches[0].screenY;
}, {passive: true});

document.addEventListener('touchend', (e) => {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
}, {passive: true});

function handleSwipe() {
  const swipeThreshold = 100;
  const diff = touchStartY - touchEndY;
  
  // Close mobile menu on swipe left
  const navMenu = document.getElementById('navMenu');
  if (navMenu.classList.contains('active') && diff < -swipeThreshold) {
    toggleMobileMenu();
  }
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);