// ============================================
//   PORTFOLIO – TECHNICIEN INFORMATIQUE
//   script.js
// ============================================

/* ---- Menu hamburger (mobile) ---- */
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  links.classList.toggle('open');
}

// Fermer le menu en cliquant sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

/* ---- Intersection Observer : animations au scroll ---- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

// Ajouter la classe fade-in à tous les éléments animés
const animatedElements = [
  '.skill-card',
  '.project-card',
  '.tl-item',
  '.about-grid',
  '.contact-grid',
  '.stat',
  '.skill-bars'
];

animatedElements.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

/* ---- Barres de compétences animées ---- */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 100);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillBarsSection = document.querySelector('.skill-bars');
if (skillBarsSection) barObserver.observe(skillBarsSection);

/* ---- Navbar : changer de style au scroll ---- */
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 24px rgba(80,70,30,0.18)';
  } else {
    navbar.style.boxShadow = '0 2px 16px rgba(80,70,30,0.1)';
  }
});

/* ---- Formulaire de contact ---- */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-primary');
  const success = document.getElementById('form-success');

  // Simulation d'envoi
  btn.textContent = 'Envoi en cours...';
  btn.style.opacity = '0.7';

  setTimeout(() => {
    e.target.reset();
    btn.textContent = 'Envoyer le message';
    btn.style.opacity = '1';
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 4000);
  }, 1500);
}

/* ---- Lien actif dans la navbar selon la section visible ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ---- Style lien actif (injecté dynamiquement) ---- */
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--olive-dark); } .nav-links a.active::after { width: 100%; }`;
document.head.appendChild(style);
