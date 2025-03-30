let todosLosVideos = [];
let categoriaSeleccionada = 'all';
let paginaActual = 1;
let rankingVideos = [];

const videosPorPagina = 6;

document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.getElementById('video-list');
  const buscador = document.getElementById('buscador');
  const categoriaSelect = document.getElementById('categoria-select');
  const resultadoTexto = document.getElementById('resultado-busqueda');

  // Cargar categorías
  const cats = await fetch('http://13.218.77.33:3000/api/categorias').then(r => r.json());
  cats.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.nombre;
    categoriaSelect.appendChild(option);
  });

  // Añadir opción de "Ranking" al select de categorías
  const optionRanking = document.createElement('option');
  optionRanking.value = 'ranking';
  optionRanking.textContent = '🔥 Ranking';
  categoriaSelect.appendChild(optionRanking);

  // Cargar todos los vídeos
  todosLosVideos = await fetch('http://13.218.77.33:3000/api/videos').then(r => r.json());
  renderPagina();

  buscador.addEventListener('input', renderPagina);
  
  // Evento para manejar el cambio de categoría
  categoriaSelect.addEventListener('change', () => {
    categoriaSeleccionada = categoriaSelect.value;
    paginaActual = 1; // Siempre volvemos a la primera página cuando cambiamos la categoría

    if (categoriaSeleccionada === 'ranking') {
      // Si se selecciona 'ranking', obtener los vídeos ordenados por likes
      fetch('http://13.218.77.33:3000/api/videos/ranking')
        .then(r => r.json())
        .then(data => {
          rankingVideos = data;  // Guardamos los vídeos del ranking
          renderPagina();  // Renderizamos la página con los vídeos del ranking
        });
    } else {
      renderPagina();  // Si no es ranking, simplemente renderizamos la página normalmente
    }
  });

  document.getElementById('anterior').addEventListener('click', () => {
    if (paginaActual > 1) {
      paginaActual--;
      renderPagina();
    }
  });

  document.getElementById('siguiente').addEventListener('click', () => {
    const totalPaginas = Math.ceil(filtrarVideos().length / videosPorPagina);
    if (paginaActual < totalPaginas) {
      paginaActual++;
      renderPagina();
    }
  });
});

function filtrarVideos() {
  const texto = document.getElementById('buscador').value.toLowerCase().trim();

  // Determinamos si estamos usando los vídeos del ranking o los vídeos generales
  const fuente = (categoriaSeleccionada === 'ranking') ? rankingVideos : todosLosVideos;

  return fuente.filter(v =>
    v.titulo.toLowerCase().includes(texto) &&
    (categoriaSeleccionada === 'all' || categoriaSeleccionada === 'ranking' || v.categoria_id == categoriaSeleccionada)
  );
}

function renderPagina() {
  const contenedor = document.getElementById('video-list');
  const resultadoTexto = document.getElementById('resultado-busqueda');
  const videos = filtrarVideos();  // Obtenemos los vídeos filtrados según búsqueda y categoría

  const inicio = (paginaActual - 1) * videosPorPagina;  // Calcular el índice de inicio para la paginación
  const paginados = videos.slice(inicio, inicio + videosPorPagina);  // Obtener solo los vídeos para la página actual

  renderizarVideos(paginados, contenedor);  // Renderizamos los vídeos en la página

  if (videos.length === 0) {
    resultadoTexto.textContent = `❌ No se encontraron vídeos para: "${document.getElementById('buscador').value}"`;
  } else {
    resultadoTexto.textContent = `🎥 ${videos.length} vídeo(s) encontrados - Página ${paginaActual}`;
  }

  document.getElementById('pagina-actual').textContent = `Página ${paginaActual}`;
}

function renderizarVideos(videos, contenedor) {
    contenedor.innerHTML = videos.length === 0
      ? '<p>No se encontraron vídeos.</p>'
      : '';
  
    videos.forEach(video => {
      const card = document.createElement('div');
      card.classList.add('video-card');
  
      // Solo mostramos los likes si estamos en el contexto de "ranking" y el vídeo tiene likes
      const mostrarLikes = (categoriaSeleccionada === 'ranking' && video.likes !== undefined);
      const likesHTML = mostrarLikes ? `<p>👍 ${video.likes} likes</p>` : '';
  
      // Aquí se agrega el HTML para mostrar el vídeo y la información
      card.innerHTML = `
        <a href="video.html?id=${video.id}">
          <video src="${video.url}" muted></video>
          <div class="info">
            <h3>${video.titulo}</h3>
            <p>${video.descripcion || ''}</p>
            ${likesHTML} <!-- Mostrar los likes si es el ranking -->
            <small>Subido por <strong>${video.autor}</strong></small>
          </div>
        </a>
      `;
  
      contenedor.appendChild(card);
    });
  }
