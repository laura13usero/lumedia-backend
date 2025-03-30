// src/routes/video.routes.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/video.controller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Guarda el archivo en memoria
const { verificarToken } = require('../middlewares/auth.middleware');

// Ruta protegida para subir vídeo
router.post('/upload', upload.single('video'), videoController.subir);


// NUEVAS RUTAS
// Obtener todos los videos (pública)
router.get('/', videoController.obtenerTodos);

// Obtener detalle de un video específico (pública)
router.get('/:id', videoController.obtenerPorId);

// Ruta para el ranking de videos (con likes)
router.get('/ranking', async (_req, res) => {
  try {
    const result = await db.query(`
      SELECT v.*, u.nombre AS autor,
        COUNT(ld.*) FILTER (WHERE ld.tipo = true) AS likes,
        c.nombre AS categoria
      FROM videos v
      JOIN usuarios u ON v.usuario_id = u.id
      LEFT JOIN likes_dislikes ld ON v.id = ld.video_id
      LEFT JOIN categorias c ON v.categoria_id = c.id
      GROUP BY v.id, u.id, c.id
      ORDER BY likes DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ranking' });
  }
});

//router.post('/upload', upload.single('video'), videoController.subir);


module.exports = router;
