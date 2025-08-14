const API_URL = "http://localhost:3000/api/auth"; // Cambia si tu backend usa otro puerto

// Registro
if (document.getElementById("registerForm")) {
  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value
    };
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    alert(result.message || result.error);
    if (res.ok) window.location.href = "login.html";
  });
}

// Login
if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) {
      localStorage.setItem("token", result.token);
      alert("Inicio de sesión exitoso");
      window.location.href = "profile.html";
    } else {
      alert(result.error);
    }
  });
}
// Cerrar sesión