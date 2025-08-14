const API_URL = "http://localhost:3000/api/auth/profile"; // Ruta protegida del backend
const token = localStorage.getItem("token");

if (!token) {
  alert("No tienes permiso para acceder. Inicia sesión.");
  window.location.href = "login.html";
}

async function getProfile() {
  try {
    const res = await fetch(API_URL, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Error al obtener perfil");
      window.location.href = "login.html";
      return;
    }

    // Mostrar datos en la página
    document.getElementById("profileData").innerHTML = `
      <h4>Usuario ID: ${data.userData.id}</h4>
      <p>Token emitido: ${new Date(data.userData.iat * 1000).toLocaleString()}</p>
      <p>Expira: ${new Date(data.userData.exp * 1000).toLocaleString()}</p>
    `;
  } catch (error) {
    console.error(error);
    alert("Error al conectar con el servidor.");
  }
}

getProfile();

// Botón de cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});
