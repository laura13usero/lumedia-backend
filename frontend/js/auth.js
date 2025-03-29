document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
  
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const contraseña = loginForm.contraseña.value;
  
        try {
          const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, contraseña })
          });
  
          const data = await res.json();
  
          if (!res.ok) {
            document.getElementById('error-msg').innerText = data.error || 'Error al iniciar sesión';
          } else {
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
          }
        } catch {
          document.getElementById('error-msg').innerText = 'Error de conexión';
        }
      });
    }
  
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = registerForm.nombre.value;
        const email = registerForm.email.value;
        const contraseña = registerForm.contraseña.value;
  
        try {
          const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, contraseña })
          });
  
          const data = await res.json();
  
          if (!res.ok) {
            document.getElementById('error-msg').innerText = data.error || 'Error al registrarse';
          } else {
            alert('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
            window.location.href = 'login.html';
          }
        } catch {
          document.getElementById('error-msg').innerText = 'Error de conexión';
        }
      });
    }
  });
  