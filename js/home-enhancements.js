// ===== HOME PAGE ENHANCED ENHANCEMENTS =====

// Simple AOS-like Animation Observer
function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translate(0, 0) scale(1) rotate(0)';
                }, delay);

                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        const animation = el.getAttribute('data-aos');
        el.style.opacity = '0';
        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

        // Set initial states based on animation type
        if (animation === 'fade-up') {
            el.style.transform = 'translateY(30px)';
        } else if (animation === 'fade-right') {
            el.style.transform = 'translateX(-30px)';
        } else if (animation === 'fade-left') {
            el.style.transform = 'translateX(30px)';
        } else if (animation === 'zoom-in') {
            el.style.transform = 'scale(0.8)';
        } else if (animation === 'flip-left') {
            el.style.transform = 'perspective(1000px) rotateY(-15deg)';
        }

        observer.observe(el);
    });
}

// Enhanced Stats Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-item .stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2500; // 2.5 seconds for smoother animation
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
                // Add a little bounce effect when complete
                stat.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    stat.style.transform = 'scale(1)';
                }, 200);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Observe stats section with enhanced animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const rightsSection = document.querySelector('.rights-section');
if (rightsSection) {
    statsObserver.observe(rightsSection);
}

// Enhanced Testimonials Slider with Auto-play
let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let testimonialInterval;

function showSlide(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
    showSlide(currentSlide);
}

function startTestimonialAutoPlay() {
    testimonialInterval = setInterval(nextSlide, 2000); // Change every 2 seconds
}

function stopTestimonialAutoPlay() {
    clearInterval(testimonialInterval);
}

// Initialize testimonials slider
if (testimonialCards.length > 0) {
    startTestimonialAutoPlay();

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopTestimonialAutoPlay();
            startTestimonialAutoPlay();
        });
    });

    // Arrow button handlers
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');

    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            prevSlide();
            stopTestimonialAutoPlay();
            startTestimonialAutoPlay();
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            nextSlide();
            stopTestimonialAutoPlay();
            startTestimonialAutoPlay();
        });
    }

    // Pause auto-play on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', stopTestimonialAutoPlay);
        testimonialSlider.addEventListener('mouseleave', startTestimonialAutoPlay);
    }
}

// Google Reviews Animation on Scroll
const reviewCards = document.querySelectorAll('.review-card');
const reviewObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0) translateY(0)';
            }, index * 100);
            reviewObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

reviewCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px) translateY(20px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    reviewObserver.observe(card);
});

// Enhanced Back to Top Button
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Newsletter Form with Enhanced Feedback
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input');
        const email = emailInput.value;
        const button = newsletterForm.querySelector('button');

        // Visual feedback
        button.textContent = 'Subscribing...';
        button.style.background = '#764ba2';

        setTimeout(() => {
            button.textContent = '✓ Subscribed!';
            button.style.background = '#4caf50';

            setTimeout(() => {
                button.textContent = 'Subscribe';
                button.style.background = '';
                newsletterForm.reset();
            }, 2000);
        }, 1000);
    });
}

// Add parallax effect to mission and rights sections
function addParallaxEffect() {
    const missionSection = document.querySelector('.mission-section');
    const rightsSection = document.querySelector('.rights-section');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (missionSection) {
            const missionTop = missionSection.offsetTop;
            const missionHeight = missionSection.offsetHeight;

            if (scrolled > missionTop - window.innerHeight && scrolled < missionTop + missionHeight) {
                const offset = (scrolled - missionTop + window.innerHeight) * 0.3;
                const beforeElement = missionSection.querySelector('::before');
                if (missionSection.style) {
                    missionSection.style.backgroundPosition = `center ${offset}px`;
                }
            }
        }
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    addParallaxEffect();

    // Add smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Animate elements on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
