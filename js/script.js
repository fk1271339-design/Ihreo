// Navigation
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

if (navbar) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });
}

// Contact Form - Disabled: EmailJS handles form submission in contact.html
// const contactForm = document.getElementById('contactForm');
// if (contactForm) {
//     contactForm.addEventListener('submit', function (e) {
//         e.preventDefault();
//         alert('Thank you for your message!');
//         contactForm.reset();
//     });
// }

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 60fps
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = Math.floor(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Intersection Observer for Stats Animation
const statNumbers = document.querySelectorAll(".stat-number[data-target]");
if (statNumbers.length > 0) {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animated")
      ) {
        entry.target.classList.add("animated");
        const target = parseInt(entry.target.getAttribute("data-target"));
        animateCounter(entry.target, target);
      }
    });
  }, observerOptions);

  statNumbers.forEach((stat) => {
    observer.observe(stat);
  });
}

// Testimonial Slider
const testimonialCards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");
const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");

if (testimonialCards.length > 0) {
  let currentSlide = 0;

  function showSlide(index) {
    testimonialCards.forEach((card) => card.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    if (testimonialCards[index]) {
      testimonialCards[index].classList.add("active");
    }
    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide =
      (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
    showSlide(currentSlide);
  }

  // Arrow navigation
  if (nextArrow) {
    nextArrow.addEventListener("click", nextSlide);
  }
  if (prevArrow) {
    prevArrow.addEventListener("click", prevSlide);
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-rotate every 5 seconds
  setInterval(nextSlide, 5000);
}

// Google Reviews Carousel Animation
const reviewsCarousel = document.querySelector(".reviews-carousel");
if (reviewsCarousel) {
  const reviewCards = reviewsCarousel.querySelectorAll(".review-card");

  // Clone cards for infinite scroll
  reviewCards.forEach((card) => {
    const clone = card.cloneNode(true);
    reviewsCarousel.appendChild(clone);
  });
}
