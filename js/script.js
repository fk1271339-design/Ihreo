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
  // Inject Drawer header if it doesn't exist
  if (!document.getElementById('mobile-drawer-header')) {
    const drawerHeader = document.createElement('li');
    drawerHeader.id = 'mobile-drawer-header';
    drawerHeader.className = 'drawer-header';
    drawerHeader.innerHTML = `
      <div style="display:flex; align-items:center; gap: 15px; padding-bottom:1rem; border-bottom:2px solid #f1f5f9;">
          <img src="images/ihreo 2.png" alt="IHREO Logo" style="height:45px; object-fit:contain;" />
          <span style="color:#1e3c72; font-family:'Poppins', sans-serif; font-size:1.5rem; font-weight:800; letter-spacing:1px;">IHREO</span>
          <span id="drawerClose" style="color:#64748b; font-size:32px; line-height:1; padding-left:10px; margin-left:auto; cursor:pointer; font-weight:400; transition:color 0.3s;" onmouseover="this.style.color='#ef4444'" onmouseout="this.style.color='#64748b'">&times;</span>
      </div>
    `;
    navMenu.insertBefore(drawerHeader, navMenu.firstChild);
  }

  // Inject Overlay if it doesn't exist
  let overlay = document.getElementById('drawer-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'drawer-overlay';
    overlay.className = 'drawer-overlay';
    document.body.appendChild(overlay);
  }

  function toggleMenu() {
    navMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
  }

  navToggle.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
  
  const drawerCloseBtn = document.getElementById("drawerClose");
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener("click", toggleMenu);
  }

  // Auto-close drawer if link is clicked
  const navLinks = navMenu.querySelectorAll('.nav-link, .admin-link');
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) toggleMenu();
    });
  });
}

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

// ===================================================
// PAGE TRANSITION LOGIC
// ===================================================
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".pt-overlay");

  if (overlay) {
    // 1. Entry Animation
    setTimeout(() => {
      overlay.classList.add("exit");
    }, 400);

    // 2. Navigation Click Handling
    document.querySelectorAll('a').forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        
        if (href && href.endsWith(".html") && !href.startsWith("http")) {
          e.preventDefault();
          overlay.classList.remove("exit");
          overlay.classList.add("active");

          setTimeout(() => {
            window.location.href = href;
          }, 600);
        }
      });
    });
  }
});
