const comentarioService = require('../services/comentario.service');

exports.agregar = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const { video_id, texto } = req.body;
    const nuevoComentario = await comentarioService.agregar({ usuario_id, video_id, texto });
    res.status(201).json(nuevoComentario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar comentario' });
  }
};

exports.obtenerPorVideo = async (req, res) => {
  try {
    const comentarios = await comentarioService.obtenerPorVideo(req.params.id);
    res.json(comentarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener comentarios' });
  }
};
