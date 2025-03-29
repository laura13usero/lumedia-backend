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
      SELECT v.*, u.nombre AS autor, c.nombre AS categoria
      FROM videos v
      JOIN usuarios u ON v.usuario_id = u.id
      LEFT JOIN categorias c ON v.categoria_id = c.id
      ORDER BY v.fecha_subida DESC
    `);
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
      SELECT v.*, u.nombre AS autor, c.nombre AS categoria
      FROM videos v
      JOIN usuarios u ON v.usuario_id = u.id
      LEFT JOIN categorias c ON v.categoria_id = c.id
      WHERE v.id = $1
    `, [id]);

    return result.rows[0];  // Retorna el video correspondiente al ID con categoría
  } catch (error) {
    console.error('Error obteniendo el video:', error);
    throw error;
  }
};
