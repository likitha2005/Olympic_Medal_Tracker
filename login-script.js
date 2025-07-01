document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => response.text())
    .then(data => {
      if (data === "success") {
        // Absolute path to admin-dashboard.html
        window.location.href = "/admin-dashboard.html";
      } else {
        document.getElementById("error-msg").innerText = data;
      }
    })
    .catch(err => {
      document.getElementById("error-msg").innerText = "Server error!";
    });
});
