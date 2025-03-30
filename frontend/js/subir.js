document.addEventListener('DOMContentLoaded', () => {
  // Asegúrate de que el DOM esté completamente cargado
  const form = document.getElementById('upload-form');
  const token = localStorage.getItem('token');
  const mensaje = document.getElementById('mensaje'); // Suponiendo que quieras mostrar mensajes de error aquí

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    const formData = new FormData(form);

    alert('Subiendo vídeo...');

    try {
      const res = await fetch('http://3.88.175.169:3000/api/videos/upload', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      });

      if (!res.ok) {
        // Si la respuesta no es ok, manejar el error
        const err = await res.json(); // Obtener el mensaje de error en formato JSON
        alert('Error al subir el vídeo: ' + (err.error || 'Error desconocido')); // Mostrar el mensaje de error
        throw new Error(err.error || 'Error desconocido'); // Lanzar el error para ser capturado en el bloque catch
      }

      alert('¡Vídeo subido correctamente!');
      form.reset();
      setTimeout(() => window.location.href = 'perfil.html', 1500);

    } catch (err) {
      // Manejar errores generados tanto por la API como por otros problemas
      alert('Error al subir el vídeo: ' + err.message); // Mostrar el mensaje de error
      if (mensaje) {
        mensaje.textContent = `❌ ${err.message}`; // Mostrar mensaje de error en el DOM
      }
    }
  });
});
