document.addEventListener('DOMContentLoaded', () => {
  // URL del video estático
  const videoUrl = "https://lumedia-videos.s3.us-east-1.amazonaws.com/ramen.mp4";

  // Obtener el contenedor donde se va a insertar el video
  const contenedor = document.getElementById('mis-videos-list');

  // Crear el HTML para el video (con la etiqueta <video>)
  contenedor.innerHTML = `
      <div class="video-card">
          <h3>Mi Video: Ramen</h3>
          <p>Este es un video de ejemplo de ramen.</p>
          <video width="560" height="315" controls>
              <source src="${videoUrl}" type="video/mp4">
              Tu navegador no soporta el formato de video.
          </video>
      </div>
  `;
});