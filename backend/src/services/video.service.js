// src/services/video.service.js
const db = require('../database/db');  // Importamos la conexión a la base de datos

// Guardar un video
exports.guardarVideo = async ({ usuario_id, titulo, descripcion, url, categoria_id }) => {
  const result = await db.query(
    `INSERT INTO videos (usuario_id, titulo, descripcion, url, categoria_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [usuario_id, titulo, descripcion, url, categoria_id]
  );
  return result.rows[0];
};

// Obtener todos los videos con categoría
exports.obtenerTodos = async () => {
  try {
    const result = await db.query(`
      SELECT id, usuario_id, url, titulo, descripcion FROM videos WHERE usuario_id = 2`);
    return result.rows;  // Retorna todos los videos con autor y categoría
  } catch (error) {
    console.error('Error obteniendo todos los videos:', error);
    throw error;
  }
};

// Obtener un video específico por ID con categoría
exports.obtenerPorId = async (id) => {
  try {
    const result = await db.query(`
      SELECT id, usuario_id, url, titulo, descripcion FROM videos WHERE usuario_id = 7`);

    return result.rows[0];  // Retorna el video correspondiente al ID con categoría
  } catch (error) {
    console.error('Error obteniendo el video:', error);
    throw error;
  }
};
