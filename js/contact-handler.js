// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: this.querySelector('[name="name"]')?.value || this.querySelectorAll('.form-input')[0].value,
                email: this.querySelector('[name="email"]')?.value || this.querySelectorAll('.form-input')[1].value,
                subject: this.querySelector('[name="subject"]')?.value || this.querySelectorAll('.form-input')[2].value,
                message: this.querySelector('[name="message"]')?.value || this.querySelectorAll('.form-input')[3].value,
                timestamp: new Date().toLocaleString(),
                id: Date.now()
            };

            // Get existing messages from localStorage
            let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

            // Add new message
            messages.push(formData);

            // Save to localStorage
            localStorage.setItem('contactMessages', JSON.stringify(messages));

            // Show success message
            if (formSuccess) {
                formSuccess.style.display = 'block';
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            } else {
                alert('✅ Thank you! Your message has been sent successfully.');
            }

            // Reset form
            contactForm.reset();

            // Scroll to success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
