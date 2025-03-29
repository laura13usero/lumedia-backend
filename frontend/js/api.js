const API_URL = 'http://3.88.175.169:3000/api'; // Cambiar a IP pública en producción

export async function obtenerVideos() {
  const res = await fetch(`${API_URL}/videos`);
  const data = await res.json();
  return data;
}

// Si no usas módulos, haz que la función sea global
window.obtenerVideos = async function () {
  const res = await fetch('http://3.88.175.169:3000/api/videos');
  return await res.json();
};
