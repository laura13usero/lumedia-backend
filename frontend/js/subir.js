document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión');
      window.location.href = 'login.html';
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
      e.preventDefault();
      const formData = new FormData(form);
  
      mensaje.textContent = 'Subiendo vídeo...';
  
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
          throw new Error(err.error || 'Error al subir el vídeo');
        }
  
        mensaje.textContent = '✅ ¡Vídeo subido correctamente!';
        form.reset();
        setTimeout(() => window.location.href = 'perfil.html', 1500);
      } catch (err) {
        mensaje.textContent = `❌ ${err.message}`;
      }
    });
  });
  