// ===== ADMIN AUTHENTICATION SYSTEM =====

// Default admin credentials (aap ye change kar sakte hain)
const ADMIN_CREDENTIALS = {
    username: 'IHREO',
    password: 'IHREO123'
};

// Check if user is logged in
function isAdminLoggedIn() {
    return sessionStorage.getItem('adminLoggedIn') === 'true';
}

// Login function
function adminLogin(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        return true;
    }
    return false;
}

// Logout function
function adminLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'home.html';
}

// Show login modal
function showLoginModal() {
    // Create modal HTML
    const modalHTML = `
        <div class="login-modal-overlay" id="loginModalOverlay">
            <div class="login-modal">
                <div class="login-modal-header">
                    <h2>🔐 Admin Login</h2>
                    <button class="close-modal" id="closeModal">&times;</button>
                </div>
                <form class="login-form" id="loginForm">
                    <div class="login-form-group">
                        <label for="adminUsername">Username</label>
                        <input type="text" id="adminUsername" class="login-input" placeholder="Enter username" required autocomplete="username">
                    </div>
                    <div class="login-form-group">
                        <label for="adminPassword">Password</label>
                        <input type="password" id="adminPassword" class="login-input" placeholder="Enter password" required autocomplete="current-password">
                    </div>
                    <div class="login-error" id="loginError"></div>
                    <button type="submit" class="btn btn-primary login-btn">Login</button>
                </form>
              
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get elements
    const overlay = document.getElementById('loginModalOverlay');
    const closeBtn = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    // Close modal on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', () => {
        overlay.remove();
    });

    // Handle form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;

        if (adminLogin(username, password)) {
            overlay.remove();
            window.location.href = 'admin.html';
        } else {
            loginError.textContent = '❌ Invalid username or password';
            loginError.style.display = 'block';

            // Shake animation
            loginForm.classList.add('shake');
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 500);
        }
    });

    // Focus on username input
    setTimeout(() => {
        document.getElementById('adminUsername').focus();
    }, 100);
}

// Handle admin link click
document.addEventListener('DOMContentLoaded', () => {
    const adminLink = document.getElementById('adminLink');

    if (adminLink) {
        adminLink.addEventListener('click', (e) => {
            e.preventDefault();

            if (isAdminLoggedIn()) {
                window.location.href = 'admin.html';
            } else {
                showLoginModal();
            }
        });
    }
});

// Add CSS for login modal
const loginModalStyles = `
<style>
.login-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.login-modal {
    background: white;
    border-radius: 1.5rem;
    padding: 2.5rem;
    max-width: 450px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.login-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.login-modal-header h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.8rem;
    color: #1e40af;
    margin: 0;
}

.close-modal {
    background: none;
    border: none;
    font-size: 2rem;
    color: #94a3b8;
    cursor: pointer;
    transition: 0.3s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.close-modal:hover {
    background: #f8fafc;
    color: #1e40af;
    transform: rotate(90deg);
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.login-form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.login-form-group label {
    font-weight: 600;
    color: #0f172a;
    font-size: 0.95rem;
}

.login-input {
    padding: 1rem 1.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    transition: 0.3s ease;
    background: #f8fafc;
}

.login-input:focus {
    outline: none;
    border-color: #1e40af;
    background: white;
    box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
}

.login-error {
    display: none;
    background: #fee2e2;
    color: #dc2626;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
}

.login-btn {
    width: 100%;
    padding: 1rem;
    margin-top: 0.5rem;
}

.login-info {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 0.75rem;
    border-left: 4px solid #1e40af;
}

.login-info p {
    margin: 0.5rem 0;
    color: #475569;
    font-size: 0.9rem;
}

.login-info strong {
    color: #1e40af;
}

.login-info code {
    background: white;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    color: #1e40af;
    font-family: 'Courier New', monospace;
    font-weight: 600;
}

.shake {
    animation: shake 0.5s;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}

@media (max-width: 640px) {
    .login-modal {
        padding: 2rem;
        width: 95%;
    }
    
    .login-modal-header h2 {
        font-size: 1.5rem;
    }
}
</style>
`;

// Add styles to document
document.head.insertAdjacentHTML('beforeend', loginModalStyles);
