// ========== STICKY HEADER SCROLL ==========
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// ========== TRUST BAR COUNT-UP ==========
const counters = document.querySelectorAll('.trust-item h3');
const animateCounter = (el) => {
  const target = +el.dataset.count;
  let current = 0;
  const step = target / 60;
  const tick = () => {
    current += step;
    if (current < target) {
      el.textContent = Math.floor(current).toLocaleString() + (target === 100 ? '' : '+');
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString() + (target === 100 ? '%' : '+');
    }
  };
  tick();
};

const trustObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      trustObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => trustObserver.observe(c));

// ========== TABS ==========
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const targetPanel = document.getElementById(btn.dataset.tab);
    if (targetPanel) targetPanel.classList.add('active');
  });
});

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    item.classList.toggle('open');
  });
});

// ========== CONTACT FORM ==========
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  msg.textContent = '✅ Thanks! We will reach out within 24 hours.';
  msg.style.color = '#10B981';
  form.reset();
  setTimeout(() => { msg.textContent = ''; }, 5000);
});

// ========== SCROLL SPY — ACTIVE NAV HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

function updateActiveNav() {
  const scrollPos = window.scrollY + 200;
  let currentSection = 'home';

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < bottom) {
      currentSection = id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ========== SMOOTH SCROLL WITH HEADER OFFSET ==========
document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      window.scrollTo({
        top: target.offsetTop - headerHeight - 20,
        behavior: 'smooth'
      });
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});