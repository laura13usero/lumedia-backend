document.addEventListener('DOMContentLoaded', async () => {
  // Recuperar el token desde localStorage
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Debes iniciar sesión');
    window.location.href = 'login.html';  // Redirigir si no hay token
    return;
  }

  // Cargar categorías
  const categoriaSelect = document.getElementById('categoria-select');
  const cats = await fetch('http://3.88.175.169:3000/api/categorias').then(r => r.json());
  cats.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.nombre;
    categoriaSelect.appendChild(option);
  });

  // Formulario
  const form = document.getElementById('upload-form');
  const mensaje = document.getElementById('mensaje');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();  // Evita que el formulario se envíe de forma tradicional
    alert('Formulario enviado');
    
    const formData = new FormData(form);

    try {
      const res = await fetch('http://3.88.175.169:3000/api/videos/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Incluir el token en la cabecera Authorization
        },
        body: formData // El contenido del formulario
      });

      if (!res.ok) {
        // Cuando la respuesta no es ok, es necesario extraer y mostrar el error correctamente
        const err = await res.json(); // Intentar extraer el objeto JSON de error
        alert('Error al subir el vídeo: ' + (err.error || err.message || 'Error desconocido'));
        throw new Error(err.error || err.message || 'Error desconocido');
      }

      alert('¡Vídeo subido correctamente!');
      form.reset();
      setTimeout(() => window.location.href = 'perfil.html', 1500); // Redirige después de subir el vídeo
    } catch (err) {
      // Captura el error de la solicitud y muestra un mensaje claro
      alert('Error al subir el vídeo: ' + err.message);
      mensaje.textContent = `❌ ${err.message}`;
    }
  });
});
