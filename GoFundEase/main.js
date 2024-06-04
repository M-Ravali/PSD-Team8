document.addEventListener('DOMContentLoaded', function () {
    // Login form validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (validateEmail(email) && password) {
                try {
                    const res = await fetch('http://localhost:5000/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Set content type to JSON
                        },
                        body: JSON.stringify({ email, password }), // Send JSON data
                    });

                    const data = await res.json();
                    if (res.ok) {
                        alert('Login successful');
                        redirectToCharityIndex();
                        // Handle successful login, e.g., store token, redirect, etc.
                        console.log('Login successful:', data);
                        // Example: localStorage.setItem('token', data.token);
                        // Redirect to another page: window.location.href = '/dashboard';
                    } else {
                        alert('Login failed: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                }
            } else {
                alert('Please enter a valid email and password');
            }
        });
    }

    // Register form validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (name && validateEmail(email) && password && password === confirmPassword) {
                try {
                    const res = await fetch('http://localhost:5000/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Set content type to JSON
                        },
                        body: JSON.stringify({ name, email, password }), // Send JSON data
                    });

                    const data = await res.json();
                    if (res.ok) {
                        alert('Account created successfully');
                        redirectToCharityIndex();
                        // Handle successful registration, e.g., store token, redirect, etc.
                        console.log('Registration successful:', data);
                        // Example: localStorage.setItem('token', data.token);
                        // Redirect to another page: window.location.href = '/login';
                    } else {
                        alert('Registration failed: ' + data.message);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                }
            } else {
                alert('Please enter valid details and ensure passwords match');
            }
        });
    }
});

// Helper function to validate email
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
}

// redirecting
function redirectToCharityIndex() {
    window.location.href = 'helper/charity/index.html';
}
