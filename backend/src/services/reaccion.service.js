const db = require('../database/db');

exports.darReaccion = async ({ usuario_id, video_id, tipo }) => {
  // Upsert (insertar o actualizar si ya existe)
  const result = await db.query(`
    INSERT INTO likes_dislikes (usuario_id, video_id, tipo)
    VALUES ($1, $2, $3)
    ON CONFLICT (usuario_id, video_id)
    DO UPDATE SET tipo = EXCLUDED.tipo
    RETURNING *;
  `, [usuario_id, video_id, tipo]);

  return result.rows[0];
};

exports.obtenerConteo = async (video_id) => {
  const result = await db.query(`
    SELECT
      COUNT(*) FILTER (WHERE tipo = true) AS likes,
      COUNT(*) FILTER (WHERE tipo = false) AS dislikes
    FROM likes_dislikes
    WHERE video_id = $1
  `, [video_id]);

  return result.rows[0];
};
