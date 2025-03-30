document.addEventListener('DOMContentLoaded', async () => {
  try {
      // Hacemos una solicitud GET para obtener la URL del video desde el servidor
      const response = await fetch('/api/video');
      if (response.ok) {
          const data = await response.json();
          const videoUrl = data.url;

          // Obtener el contenedor donde se va a insertar el video
          const contenedor = document.getElementById('mis-videos-list');

          // Insertar el video en el contenedor
          contenedor.innerHTML = `
              <div class="video-card">
                  <h3>Mi Video</h3>
                  <p>Este es un video de ejemplo.</p>
                  <video width="560" height="315" controls>
                      <source src="${videoUrl}" type="video/mp4">
                      Tu navegador no soporta el formato de video.
                  </video>
              </div>
          `;
      } else {
          console.error('No se pudo obtener la URL del video');
      }
  } catch (error) {
      console.error('Error al hacer la solicitud:', error);
  }
});