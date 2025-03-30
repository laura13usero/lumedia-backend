document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión');
      window.location.href = 'login.html';
      return;
    }
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.id;
    const userEmail = payload.email;
  
    // Mostrar avatar + correo
    document.getElementById('user-email').innerText = userEmail;
    document.getElementById('avatar').innerText = userEmail.charAt(0).toUpperCase();
  
    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    });
  
    // Cargar favoritos
    const favoritos = await fetch('http://3.88.175.169:3000/api/favoritos', {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(res => res.json());
  
    document.getElementById('count-favoritos').innerText = favoritos.length;
    mostrarVideos(favoritos, document.getElementById('favoritos-list'));
  
    // Búsqueda en favoritos
    const inputBusqueda = document.getElementById('busqueda-favoritos');
    inputBusqueda?.addEventListener('input', () => {
      const texto = inputBusqueda.value.toLowerCase();
      const filtrados = favoritos.filter(v => v.titulo.toLowerCase().includes(texto));
      mostrarVideos(filtrados, document.getElementById('favoritos-list'));
    });
  
    // Cargar todos los vídeos y filtrar por usuario
    /*const todos = await fetch('http://3.88.175.169:3000/api/videos').then(r => r.json());
    const propios = todos.filter(v => v.usuario_id === userId);
    document.getElementById('count-videos').innerText = propios.length;*/
    mostrarVideos(propios, 'https://lumedia-videos.s3.us-east-1.amazonaws.com/ramen.mp4');
  });
  
  // Función para mostrar vídeos en un contenedor
  function mostrarVideos(videos, url) {
    contenedor.innerHTML = videos.map(video => `
      <div class="video-card">
        <h3>titulo</h3>
        <p>aaa</p>
        <a href="${url}" target="_blank">Ver vídeo</a>
      </div>
    `).join('');
  }


  /*nction mostrarVideos(videos, contenedor) {
    contenedor.innerHTML = videos.map(video => {
      // Aquí creamos un iframe para mostrar el video
      const videoElement = `
        <div class="video-card">
          <h3>${video.titulo}</h3>
          <p>${video.descripcion}</p>
          <iframe src="${video.url}
                  width="560" height="315" frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen></iframe>
        </div>
      `;
      return videoElement;
    }).join('');
  }*/
  