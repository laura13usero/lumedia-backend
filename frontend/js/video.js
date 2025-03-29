document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('video-container');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
  
    if (!id) {
      container.innerHTML = '<p>Error: no se especificó un vídeo.</p>';
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:3000/api/videos/${id}`);
      const video = await res.json();
  
      container.innerHTML = `
        <video src="${video.url}" controls autoplay></video>
        <div class="info">
          <h2>${video.titulo}</h2>
          <p>${video.descripcion}</p>
          <p><small>Subido por <strong>${video.autor}</strong></small></p>
          <div class="acciones">
            <button id="like-btn">👍 Like</button>
            <button id="dislike-btn">👎 Dislike</button>
            <button id="fav-btn">⭐ Favorito</button>
          </div>
        </div>
      `;
  
      const likeBtn = document.getElementById('like-btn');
      const dislikeBtn = document.getElementById('dislike-btn');
      const favBtn = document.getElementById('fav-btn');
  
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': 'Bearer ' + token } : {};
  
      // Cargar conteo de likes y dislikes
      const conteoRes = await fetch(`http://localhost:3000/api/reacciones/video/${id}`);
      const conteo = await conteoRes.json();
      likeBtn.innerText = `👍 Like (${conteo.likes})`;
      dislikeBtn.innerText = `👎 Dislike (${conteo.dislikes})`;
  
      // Ver si el video está en favoritos
      if (token) {
        const favRes = await fetch(`http://localhost:3000/api/favoritos/video/${id}`, { headers });
        const fav = await favRes.json();
        if (fav.favorito) {
          favBtn.classList.add('activo');
        }
      }
  
      // Manejar Likes
      likeBtn.addEventListener('click', async () => {
        if (!token) return alert('Inicia sesión para reaccionar');
  
        await fetch(`http://localhost:3000/api/reacciones`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify({ video_id: id, tipo: true })
        });
  
        location.reload();
      });
  
      // Manejar Dislikes
      dislikeBtn.addEventListener('click', async () => {
        if (!token) return alert('Inicia sesión para reaccionar');
  
        await fetch(`http://localhost:3000/api/reacciones`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify({ video_id: id, tipo: false })
        });
  
        location.reload();
      });
  
      // Manejar Favoritos (toggle)
      favBtn.addEventListener('click', async () => {
        if (!token) return alert('Inicia sesión para guardar favoritos');
  
        if (favBtn.classList.contains('activo')) {
          await fetch(`http://localhost:3000/api/favoritos/${id}`, {
            method: 'DELETE',
            headers
          });
          favBtn.classList.remove('activo');
        } else {
          await fetch(`http://localhost:3000/api/favoritos`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...headers
            },
            body: JSON.stringify({ video_id: id })
          });
          favBtn.classList.add('activo');
        }
      });
  
      // Cargar comentarios y manejar formulario
      cargarComentarios(id);
      manejarFormularioComentario(id);
  
    } catch (err) {
      container.innerHTML = '<p>Error al cargar el vídeo.</p>';
    }
  });
  