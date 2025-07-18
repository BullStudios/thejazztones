function toggleMode() {
  document.body.classList.toggle("light-mode");
  const button = document.querySelector(".toggle-mode");
  button.textContent = document.body.classList.contains("light-mode")
    ? "☀️"
    : "🌙";
}

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = this;
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
        form.reset();
        setTimeout(() => confirmation.style.display = 'none', 5000);
      } else {
        confirmation.textContent = "There was an error sending your message.";
        confirmation.style.display = 'block';
      }
    })
    .catch(() => {
      confirmation.textContent = "There was a connection error.";
      confirmation.style.display = 'block';
    });
});

// Smooth scroll for navigation links
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

// Add loading animation for images
document.addEventListener("DOMContentLoaded", function () {
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
});
