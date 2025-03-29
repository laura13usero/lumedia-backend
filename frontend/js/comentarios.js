async function cargarComentarios(video_id) {
    const contenedor = document.getElementById('comentarios-list');
    contenedor.innerHTML = 'Cargando comentarios...';
  
    try {
      const res = await fetch(`http://localhost:3000/api/comentarios/video/${video_id}`);
      const comentarios = await res.json();
  
      contenedor.innerHTML = comentarios.length === 0
        ? '<p>No hay comentarios aún.</p>'
        : comentarios.map(c => `
            <div class="comentario">
              <strong>${c.autor}</strong>
              <p>${c.texto}</p>
            </div>
          `).join('');
    } catch (err) {
      contenedor.innerHTML = '<p>Error al cargar comentarios.</p>';
    }
  }
  
  function manejarFormularioComentario(video_id) {
    const form = document.getElementById('comentario-form');
    const textarea = form.querySelector('textarea');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const texto = textarea.value.trim();
      if (!texto) return;
  
      const token = localStorage.getItem('token');
      if (!token) return alert('Debes iniciar sesión para comentar');
  
      try {
        const res = await fetch(`http://localhost:3000/api/comentarios`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ video_id, texto })
        });
  
        if (res.ok) {
          textarea.value = '';
          cargarComentarios(video_id);
        } else {
          const err = await res.json();
          alert(err.error || 'Error al comentar');
        }
      } catch (err) {
        alert('Error al enviar comentario');
      }
    });
  }
  