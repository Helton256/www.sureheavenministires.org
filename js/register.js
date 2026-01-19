const API_BASE_URL = "https://sure-heaven-backend.onrender.com/api";

// Add event listener to the registration form
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get form values
  const fullname = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Validate password strength
  if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
    alert("Password must be at least 8 characters long and include at least one special character (!@#$%^&*).");
    return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    // Send registration data to the server
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message || "Registration successful!");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Registration failed. Please try again.");
    }
  } catch (error) {
    // Handle network or unexpected errors
    console.error("Error during registration:", error);
    alert("An error occurred. Please check your internet connection and try again.");
  }
});
