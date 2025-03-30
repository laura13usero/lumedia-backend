document.addEventListener('DOMContentLoaded', () => {
  // Asegúrate de que el DOM esté completamente cargado
  const form = document.getElementById('upload-form');
  const token = localStorage.getItem('token');
  //alert('token: ' + token);
  //const mensaje = document.getElementById('mensaje'); // Suponiendo que quieras mostrar mensajes de error aquí

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    const formData = new FormData(form);
  
    // Verificar qué datos están siendo enviados
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Muestra todos los datos del formulario
    }

    formData.append('userId', token);

    try {
      const res = await fetch('http://3.88.175.169:3000/api/videos/upload', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      });
  
      // Verificar si la respuesta es correcta
      if (!res.ok) {
        const err = await res.json();
        alert('Error al subir el vídeo: ' + (err.error || 'Error desconocido'));
        throw new Error(err.error || 'Error desconocido');
      }
  
      alert('¡Vídeo subido correctamente!');
      form.reset();
      setTimeout(() => window.location.href = 'perfil.html', 1500);
  
    } catch (err) {
      alert('Error al subir el vídeo: ' + err.message);
    }
  });
});
