// src/controllers/video.controller.js
const videoService = require('../services/video.service');  // Importamos el servicio para gestionar videos

// Subir un video
exports.subir = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const { titulo, descripcion, categoria_id } = req.body;  // Asegúrate de que se obtiene el categoria_id
    const url = req.file.location;

    const result = await videoService.guardarVideo({
      usuario_id,
      titulo,
      descripcion,
      url,
      categoria_id  // Se pasa el categoria_id a la función de servicio
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir el vídeo' });
  }
};

// Obtener todos los videos
exports.obtenerTodos = async (_req, res) => {
  try {
    const videos = await videoService.obtenerTodos();
    res.json(videos);  // Responde con los videos, que ya incluyen autor y categoría
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener vídeos' });
  }
};

// Obtener un video específico por ID
exports.obtenerPorId = async (req, res) => {
  try {
    const video = await videoService.obtenerPorId(req.params.id);
    if (!video) return res.status(404).json({ error: 'Vídeo no encontrado' });
    res.json(video);  // Responde con el vídeo que incluye autor y categoría
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el vídeo' });
  }
};
