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
/* ===== PROJECT MODAL DATA & FUNCTIONS ===== */
const projectsData = [
  {
    title: "UI/UX Designer | Aplikasi Laundry Family",
    role: "UI/UX Designer - Project Based Learning",
    date: "2024",
    team: "Team Project",
    description: "Aplikasi Laundry Family adalah platform digital untuk memudahkan pengguna dalam mencatat data laundry. Proyek ini dirancang dengan fokus pada kemudahan penggunaan dan pengalaman pengguna yang optimal.",
    responsibilities: [
      "Melakukan riset pengguna untuk memahami kebutuhan",
      "Membuat wireframe dan user flow aplikasi",
      "Merancang visual interface & mockup menggunakan Canva", 
      "Menyusun prototype interaktif untuk presentasi & testing",
      "Melakukan usability testing dan iterasi desain"
],
    technologies: ["Canva", "UI/UX Basics", "Wireframing", "User Research", "Presentation Design"],
    images: ["proyek1-screen1.jpg", "proyek1-screen2.jpg", "proyek1-screen3.jpg", "proyek1-screen4.jpg"],
    liveLink: "#",
    githubLink: "#"
  },
  {
    title: "UI/UX Designer | Aplikasi E-Konter",
    role: "UI/UX Designer - Project Based Learning",
    date: "2025",
    team: "Team Project",
    description: "Aplikasi E-Konter adalah solusi digital untuk manajemen konter pulsa dan pembayaran. Dirancang untuk memudahkan pengguna dalam mencatat laporan pemasukan dan pengeluaran.",
    responsibilities: [
      "Analisis kebutuhan bisnis dan user",
      "Desain interface yang clean dan profesional",
      "Pembuatan design system untuk konsistensi",
      "Prototyping fitur-fitur utama",
      "Kolaborasi dengan developer untuk implementasi"
    ],
    technologies: ["Figma", "Wireframing", "User Research", "Design System"],
    images: ["proyek2-screen1.jpg", "proyek2-screen2.jpg", "proyek2-screen3.jpg", "proyek2-screen4.jpg", "proyek2-screen5.jpg", "proyek2-screen6.jpg", "proyek2-screen7.jpg", "proyek2-screen8.jpg", "proyek2-screen9.jpg", "proyek2-screen10.jpg"],
    liveLink: "#",
    githubLink: "#"
  },
  {
    title: "Tester | Aplikasi SI-KUNIR",
    role: "Quality Assurance Tester - Project Based Learning",
    date: "2025",
    team: "Team Project",
    description: "SI-KUNIR adalah aplikasi sistem informasi yang memerlukan pengujian menyeluruh untuk memastikan kualitas dan kinerja yang optimal sebelum dirilis.",
    responsibilities: [
      "Membuat test plan dan test case",
      "Melakukan functional testing",
      "Menemukan dan mendokumentasikan bug",
      "Melakukan regression testing",
      "Bekerjasama dengan developer untuk perbaikan bug",
      "Melakukan user acceptance testing (UAT)"
    ],
    technologies: ["Manual Testing", "Bug Tracking", "Test Case", "QA"],
    images: ["proyek3-screen1.jpg", "proyek3-screen2.jpg", "proyek3-screen3.jpg"],
    liveLink: "#",
    githubLink: "#"
  },
  {
    title: "UI/UX Designer | Aplikasi posCare",
    role: "UI/UX Designer - Project Based Learning",
    date: "2025",
    team: "Team Project",
    description: "posCare adalah aplikasi posyandu yang dirancang untuk memudahkan kader dalam mencatat data balita dan lansia, selain itu juga untuk memudahkan orang tua yang memiliki balita dalam memantau perkembangan balita. Fokus pada kemudahan akses dan kenyamanan pengguna.",
    responsibilities: [
      "Riset tentang kebutuhan aplikasi posyandu",
      "Desain user interface yang calming dan trustworthy",
      "Pembuatan user journey untuk berbagai skenario",
      "Testing dan validasi desain"
    ],
    technologies: ["Figma", "Mobile Design", "Healthcare UI", "Prototyping"],
    images: ["proyek4-screen1.jpg", "proyek4-screen2.jpg", "proyek4-screen3.jpg", "proyek4-screen4.jpg", "proyek4-screen5.jpg", "proyek4-screen6.jpg", "proyek4-screen7.jpg", "proyek4-screen8.jpg", "proyek4-screen9.jpg", "proyek4-screen10.jpg", "proyek4-screen11.jpg", "proyek4-screen12.jpg", "proyek4-screen13.jpg", "proyek4-screen14.jpg"],
    liveLink: "#",
    githubLink: "#"
  }
];

let currentImageIndex = 0;

function openProjectModal(projectIndex) {
  const modal = document.getElementById('projectModal');
  const project = projectsData[projectIndex];
  
  document.getElementById('projectTitle').textContent = project.title;
  document.getElementById('projectRole').textContent = project.role;
  document.getElementById('projectDate').textContent = project.date;
  document.getElementById('projectTeam').textContent = project.team;
  document.getElementById('projectDesc').textContent = project.description;
  
  const responsibilitiesList = document.getElementById('projectResponsibilities');
  responsibilitiesList.innerHTML = project.responsibilities.map(resp => `<li>${resp}</li>`).join('');
  
  const techStack = document.getElementById('projectTech');
  techStack.innerHTML = project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('');
  
  const imagesContainer = document.getElementById('projectImages');
  imagesContainer.innerHTML = '';
  
  if (project.images && project.images.length > 0) {
    project.images.forEach((img, index) => {
      const imgElement = document.createElement('img');
      imgElement.src = img;
      imgElement.alt = `Screenshot ${index + 1}`;
      imgElement.className = `project-image-slide ${index === 0 ? 'active' : ''}`;
      imagesContainer.appendChild(imgElement);
    });
    
    imagesContainer.innerHTML += `
      <button class="project-image-nav prev" onclick="changeImage(-1)"><i class="fas fa-chevron-left"></i></button>
      <button class="project-image-nav next" onclick="changeImage(1)"><i class="fas fa-chevron-right"></i></button>
      <div class="project-image-dots">
        ${project.images.map((_, index) => `<span class="dot ${index === 0 ? 'active' : ''}" onclick="goToImage(${index})"></span>`).join('')}
      </div>
    `;
    currentImageIndex = 0;
  } else {
    imagesContainer.innerHTML = '<p class="text-center py-8" style="color: var(--text-secondary)">No screenshots available</p>';
  }
  
  const liveLink = document.getElementById('projectLive');
  const githubLink = document.getElementById('projectGithub');
  
  if (project.liveLink && project.liveLink !== '#') {
    liveLink.href = project.liveLink;
    liveLink.style.display = 'inline-flex';
  } else {
    liveLink.style.display = 'none';
  }
  
  if (project.githubLink && project.githubLink !== '#') {
    githubLink.href = project.githubLink;
    githubLink.style.display = 'inline-flex';
  } else {
    githubLink.style.display = 'none';
  }
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal(event) {
  if (!event || event.target.id === 'projectModal' || event.target.classList.contains('modal-close')) {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function changeImage(direction) {
  const slides = document.querySelectorAll('.project-image-slide');
  const dots = document.querySelectorAll('.dot');
  if (slides.length === 0) return;
  
  slides[currentImageIndex].classList.remove('active');
  dots[currentImageIndex].classList.remove('active');
  
  currentImageIndex = (currentImageIndex + direction + slides.length) % slides.length;
  
  slides[currentImageIndex].classList.add('active');
  dots[currentImageIndex].classList.add('active');
}

function goToImage(index) {
  const slides = document.querySelectorAll('.project-image-slide');
  const dots = document.querySelectorAll('.dot');
  if (slides.length === 0) return;
  
  slides[currentImageIndex].classList.remove('active');
  dots[currentImageIndex].classList.remove('active');
  
  currentImageIndex = index;
  
  slides[currentImageIndex].classList.add('active');
  dots[currentImageIndex].classList.add('active');
}

// Update keyboard handler to include project modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const projectModal = document.getElementById('projectModal');
    if (projectModal.classList.contains('active')) closeProjectModal();
    const modal = document.getElementById('modal');
    if (modal.style.display === 'block') closeModal();
    const navMenu = document.getElementById('navMenu');
    if (navMenu.classList.contains('active')) toggleMobileMenu();
  }
});