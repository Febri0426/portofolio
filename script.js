// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const btn = document.querySelector('.theme-toggle');
  const icon = document.getElementById('themeIcon');
  if (document.body.classList.contains('light-mode')) {
    icon.classList.remove('fa-sun'); icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  } else {
    icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  }
}

window.addEventListener('load', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('themeIcon').classList.remove('fa-sun');
    document.getElementById('themeIcon').classList.add('fa-moon');
  }
});

function toggleMobileMenu() {
  const navMenu = document.getElementById('navMenu');
  const mobileToggle = document.getElementById('mobileToggle');
  navMenu.classList.toggle('active');
  mobileToggle.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navMenu').classList.remove('active');
    document.getElementById('mobileToggle').classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
  });
});

function scrollToSection(id) {
  const target = document.getElementById(id);
  if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
}

function openModal(img) {
  document.getElementById('modal').style.display = 'block';
  document.getElementById('modal-img').src = img.src;
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  if (!event || event.target.id === 'modal' || event.target.className === 'close') {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 200) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) link.classList.add('active');
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.section, .skill-item, .project-card, .experience-card, .certificate-card').forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => { if(window.innerWidth > 768) item.style.transform = 'translateY(-10px) scale(1.05)'; });
  item.addEventListener('mouseleave', () => { if(window.innerWidth > 768) item.style.transform = 'translateY(0) scale(1)'; });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if(document.getElementById('modal').style.display === 'block') closeModal();
    if(document.getElementById('projectModal').classList.contains('active')) closeProjectModal();
    if(document.getElementById('navMenu').classList.contains('active')) toggleMobileMenu();
  }
});

document.getElementById('modal-img').addEventListener('click', e => e.stopPropagation());

document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', function() { this.style.opacity = '1'; });
  img.style.opacity = '0'; img.style.transition = 'opacity 0.3s';
});

let touchStartY = 0, touchEndY = 0;
document.addEventListener('touchstart', e => { touchStartY = e.changedTouches[0].screenY; }, {passive: true});
document.addEventListener('touchend', e => {
  touchEndY = e.changedTouches[0].screenY;
  if (touchStartY - touchEndY < -100 && document.getElementById('navMenu').classList.contains('active')) toggleMobileMenu();
}, {passive: true});

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px;border-radius:50%;background:rgba(255,255,255,0.6);transform:scale(0);animation:ripple 0.6s ease-out;pointer-events:none;`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const style = document.createElement('style');
style.textContent = `.btn{position:relative;overflow:hidden;} .ripple{animation:ripple 0.6s ease-out;} @keyframes ripple{to{transform:scale(4);opacity:0;}}`;
document.head.appendChild(style);

/* ===== PROJECT MODAL DATA (ENGLISH) ===== */
const projectsData = [
  {
    title: "UI/UX Designer | Laundry Family App",
    role: "UI/UX Designer - Project-Based Learning",
    date: "2024",
    team: "Team Project",
    description: "Laundry Family is a digital platform designed to help users easily track and manage laundry orders. The project focuses on usability and an optimized user experience.",
    responsibilities: [
      "Conducted user research to understand target audience needs",
      "Created wireframes and application user flows",
      "Designed visual interfaces & mockups using Canva",
      "Developed interactive prototypes for presentation & testing",
      "Performed usability testing and design iterations"
    ],
    technologies: ["Canva", "UI/UX Basics", "Wireframing", "User Research", "Prototyping"],
    images: ["proyek1-screen1.jpg", "proyek1-screen2.jpg", "proyek1-screen3.jpg", "proyek1-screen4.jpg"],
    liveLink: "#", githubLink: "#"
  },
  {
    title: "UI/UX Designer | E-Konter App",
    role: "UI/UX Designer - Project-Based Learning",
    date: "2025",
    team: "Team Project",
    description: "E-Konter is a digital solution for managing pulse counters and payments. Designed to simplify income and expense reporting for small business owners.",
    responsibilities: [
      "Analyzed business and user requirements",
      "Designed clean and professional interfaces",
      "Built a design system for consistency",
      "Prototyped core features",
      "Collaborated with developers for implementation"
    ],
    technologies: ["Figma", "Wireframing", "User Research", "Design System"],
    images: Array.from({length: 10}, (_, i) => `proyek2-screen${i+1}.jpg`),
    liveLink: "#", githubLink: "#"
  },
  {
    title: "Tester | SI-KUNIR App",
    role: "Quality Assurance Tester - Project-Based Learning",
    date: "2025",
    team: "Team Project",
    description: "SI-KUNIR is an information system application that required comprehensive testing to ensure optimal quality and performance before release.",
    responsibilities: [
      "Created test plans and test cases",
      "Conducted functional testing",
      "Identified and documented bugs",
      "Performed regression testing",
      "Collaborated with developers for bug fixes",
      "Conducted User Acceptance Testing (UAT)"
    ],
    technologies: ["Manual Testing", "Bug Tracking", "Test Cases", "QA"],
    images: ["proyek3-screen1.jpg", "proyek3-screen2.jpg", "proyek3-screen3.jpg"],
    liveLink: "#", githubLink: "#"
  },
  {
    title: "UI/UX Designer | posCare App",
    role: "UI/UX Designer - Project-Based Learning",
    date: "2025",
    team: "Team Project",
    description: "posCare is a community health center (posyandu) app designed to help cadres record toddler and elderly data, while enabling parents to monitor child development. Focuses on accessibility and user comfort.",
    responsibilities: [
      "Researched posyandu application requirements",
      "Designed a calming and trustworthy UI",
      "Mapped user journeys for various scenarios",
      "Conducted testing and design validation"
    ],
    technologies: ["Figma", "Mobile Design", "Healthcare UI", "Prototyping"],
    images: Array.from({length: 14}, (_, i) => `proyek4-screen${i+1}.jpg`),
    liveLink: "#", githubLink: "#"
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
  
  document.getElementById('projectResponsibilities').innerHTML = project.responsibilities.map(r => `<li>${r}</li>`).join('');
  document.getElementById('projectTech').innerHTML = project.technologies.map(t => `<span class="tag">${t}</span>`).join('');
  
  const imagesContainer = document.getElementById('projectImages');
  imagesContainer.innerHTML = '';
  
  if (project.images && project.images.length > 0) {
    project.images.forEach((img, index) => {
      const imgEl = document.createElement('img');
      imgEl.src = img; imgEl.alt = `Screenshot ${index + 1}`;
      imgEl.className = `project-image-slide ${index === 0 ? 'active' : ''}`;
      imagesContainer.appendChild(imgEl);
    });
    imagesContainer.innerHTML += `
      <button class="project-image-nav prev" onclick="changeImage(-1)"><i class="fas fa-chevron-left"></i></button>
      <button class="project-image-nav next" onclick="changeImage(1)"><i class="fas fa-chevron-right"></i></button>
      <div class="project-image-dots">${project.images.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" onclick="goToImage(${i})"></span>`).join('')}</div>
    `;
    currentImageIndex = 0;
  } else {
    imagesContainer.innerHTML = '<p class="text-center py-8" style="color: var(--text-secondary)">No screenshots available</p>';
  }
  
  const liveLink = document.getElementById('projectLive');
  const githubLink = document.getElementById('projectGithub');
  liveLink.href = project.liveLink; liveLink.style.display = project.liveLink !== '#' ? 'inline-flex' : 'none';
  githubLink.href = project.githubLink; githubLink.style.display = project.githubLink !== '#' ? 'inline-flex' : 'none';
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal(event) {
  if (!event || event.target.id === 'projectModal' || event.target.classList.contains('modal-close')) {
    document.getElementById('projectModal').classList.remove('active');
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

/* ===== MOUSE GLOW EFFECT FOR CARDS ===== */
document.querySelectorAll('.skill-item, .project-card, .experience-card, .certificate-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

/* ===== SCROLL PROGRESS BAR ===== */
window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  document.documentElement.style.setProperty('--scroll-progress', `${scrolled}%`);
});