document.addEventListener('DOMContentLoaded', () => {
  // Asegúrate de que el DOM esté completamente cargado
  
  const form = document.getElementById('upload-form');
  const token = localStorage.getItem('token');

  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
  
      alert('Subiendo vídeo...');
      /*for (let pair of formData.entries()) {
        alert(pair[0], pair[1]); // 👈 Verifica que los datos están correctos
      }*/

      try {
        const res = await fetch('http://3.88.175.169:3000/api/videos/upload', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token
          },
          body: formData
        });
  
        if (!res.ok) {
          const err = await res.json();
          alert('Error al subir el vídeo: ' + err + err.error);
          throw new Error(err.error || 'Error al subir el vídeo');
        }
  
        
        alert('¡Vídeo subido correctamente!');
        form.reset();
        setTimeout(() => window.location.href = 'perfil.html', 1500);
      } catch (err) {
        alert('Error al subir el vídeo2: ' + err + err.error);
        mensaje.textContent = `❌ ${err.message}`;
      }
    });
});
