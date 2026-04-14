// Add animated background slideshow to hero section
document.addEventListener('DOMContentLoaded', function () {
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        // Create background container
        const bgContainer = document.createElement('div');
        bgContainer.className = 'hero-background';

        // Create 4 background slides
        for (let i = 0; i < 4; i++) {
            const slide = document.createElement('div');
            slide.className = 'hero-bg-slide';
            bgContainer.appendChild(slide);
        }

        // Insert at the beginning of hero section
        heroSection.insertBefore(bgContainer, heroSection.firstChild);

        console.log('Hero background slideshow initialized successfully');
    }
});
