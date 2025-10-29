// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light') {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    updateToggleIcon('light');
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    updateToggleIcon('dark');
  }
}

function toggleMode() {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
    updateToggleIcon('light');
  } else {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    updateToggleIcon('dark');
  }
}

function updateToggleIcon(mode) {
  const toggleBtn = document.querySelector('.toggle-mode');
  if (!toggleBtn) return;
  toggleBtn.textContent = mode === 'dark' ? '☀️' : '🌙';
}

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const confirmation = document.getElementById('confirmation');
    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          confirmation.textContent = "Thanks for reaching out! I'll get back to you soon.";
          confirmation.style.display = 'block';
          confirmation.setAttribute('role', 'alert');
          form.reset();
          setTimeout(() => confirmation.style.display = 'none', 5000);
        } else {
          confirmation.textContent = "There was an error sending your message. Please try again.";
          confirmation.style.display = 'block';
          confirmation.setAttribute('role', 'alert');
        }
      })
      .catch(() => {
        confirmation.textContent = "There was a connection error. Please check your internet connection.";
        confirmation.style.display = 'block';
        confirmation.setAttribute('role', 'alert');
      });
  });
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Image Loading Animation
function initImageLoading() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (img.complete) {
      img.style.opacity = "1";
    } else {
      img.addEventListener("load", () => {
        img.style.opacity = "1";
      });
    }
  });
}

// Intersection Observer for Cards
function initCardAnimations() {
  const cards = document.querySelectorAll('.card');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
}

// Page Load Animations
function initPageAnimations() {
  const header = document.querySelector('header');
  const logo = document.querySelector('.extra-img img');

  if (header) header.classList.add('fade-in');
  if (logo) logo.classList.add('fade-in');
}

// Page Navigation Fade Effect
function initPageTransitions() {
  document.querySelectorAll('a').forEach(link => {
    if (link.hostname === window.location.hostname) {
      link.addEventListener('click', e => {
        const target = e.currentTarget.getAttribute('href');
        if (target && !target.startsWith('#')) {
          e.preventDefault();
          document.body.classList.add('fade-out');
          setTimeout(() => {
            window.location.href = target;
          }, 500);
        }
      });
    }
  });
}

// Initialize Everything on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initContactForm();
  initSmoothScroll();
  initImageLoading();
  initCardAnimations();
  initPageAnimations();
  initPageTransitions();
});