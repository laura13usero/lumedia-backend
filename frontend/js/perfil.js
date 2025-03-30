document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Hacemos una solicitud GET para obtener todos los videos desde el servidor
    const response = await fetch('/api/videos');
    if (response.ok) {
      const videos = await response.json();

      // Obtener el contenedor donde se van a insertar los videos
      const contenedor = document.getElementById('mis-videos-list');

      // Limpiamos cualquier contenido anterior en el contenedor
      contenedor.innerHTML = '';

      // Insertamos cada video en el contenedor
      videos.forEach(video => {
        contenedor.innerHTML += `
          <div class="video-card">
            <h3>${video.titulo}</h3>
            <p>${video.descripcion}</p>
            <video width="560" height="315" controls>
              <source src="${video.url}" type="video/mp4">
              Tu navegador no soporta el formato de video.
            </video>
          </div>
        `;
      });
    } else {
      console.error('No se pudieron obtener los videos');
    }
  } catch (error) {
    console.error('Error al hacer la solicitud:', error);
  }
});