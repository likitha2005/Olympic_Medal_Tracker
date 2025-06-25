document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // You can replace this with real validation from backend or database
  const adminUser = "admin";
  const adminPass = "admin123";

  if (username === adminUser && password === adminPass) {
    window.location.href = "admin-dashboard.html"; // Redirect to admin dashboard
  } else {
    document.getElementById("error-msg").innerText = "Invalid credentials!";
  }
});