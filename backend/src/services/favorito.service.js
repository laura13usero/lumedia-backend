const db = require('../database/db');

exports.agregar = async (usuario_id, video_id) => {
  const result = await db.query(
    'INSERT INTO favoritos (usuario_id, video_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *',
    [usuario_id, video_id]
  );
  return result.rows[0];
};

exports.eliminar = async (usuario_id, video_id) => {
  await db.query(
    'DELETE FROM favoritos WHERE usuario_id = $1 AND video_id = $2',
    [usuario_id, video_id]
  );
};

exports.esFavorito = async (usuario_id, video_id) => {
  const result = await db.query(
    'SELECT * FROM favoritos WHERE usuario_id = $1 AND video_id = $2',
    [usuario_id, video_id]
  );
  return result.rows.length > 0;
};

exports.obtenerFavoritosUsuario = async (usuario_id) => {
  const result = await db.query(`
    SELECT v.*
    FROM favoritos f
    JOIN videos v ON f.video_id = v.id
    WHERE f.usuario_id = $1
    ORDER BY v.fecha_subida DESC
  `, [usuario_id]);

  return result.rows;
};
