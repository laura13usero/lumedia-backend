document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (!header) return; // Si no hay <header>, salir.
  
    const token = localStorage.getItem('token');
  
    // Logo siempre presente
    const logo = `<h1><a href="index.html" style="color:white; text-decoration:none;">Lumedia</a></h1>`;
    
    let extra = '';
  
    if (token) {
      // Si hay sesión iniciada, mostrar "Subir", "Perfil" y "Cerrar sesión"
      extra = `
        <nav class="nav-user">
          <a href="subir.html"> Subir</a>
          <a href="perfil.html"> Perfil</a>
          <button id="logout-btn">Cerrar sesión</button>
        </nav>
      `;
    } else {
      // Si NO hay sesión, mostrar "Iniciar sesión" y "Registrarse"
      //        <a href="login.html"><button id="iniciar-sesion" class="ui-btn"><span>Iniciar sesión</span></button></a>
      //<a href="register.html"><button id="register" class="ui-btn"><span>Registrarse</span></button></a>
      extra = `
        <nav class="nav-user">
          <a href="login.html">Iniciar sesión</a>
          <a href="register.html">Registrarse</a>
        </nav>
      `;
    }
  
    // Insertar HTML en el <header>
    header.innerHTML = logo + extra;
  
    // Agregar funcionalidad al botón de "Cerrar sesión"
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token'); // Elimina el token
        window.location.href = 'index.html'; // Redirige a inicio
      });
    }
  });
  