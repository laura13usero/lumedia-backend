const db = require('../database/db');

exports.agregar = async ({ usuario_id, video_id, texto }) => {
  const result = await db.query(
    'INSERT INTO comentarios (usuario_id, video_id, texto) VALUES ($1, $2, $3) RETURNING *',
    [usuario_id, video_id, texto]
  );
  return result.rows[0];
};

exports.obtenerPorVideo = async (video_id) => {
  const result = await db.query(`
    SELECT c.*, u.nombre AS autor
    FROM comentarios c
    JOIN usuarios u ON c.usuario_id = u.id
    WHERE c.video_id = $1
    ORDER BY c.fecha ASC
  `, [video_id]);
  return result.rows;
};
