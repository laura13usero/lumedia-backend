const reaccionService = require('../services/reaccion.service');

exports.darReaccion = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const { video_id, tipo } = req.body;

    const reaccion = await reaccionService.darReaccion({ usuario_id, video_id, tipo });
    res.status(201).json(reaccion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar la reacción' });
  }
};

exports.obtenerConteo = async (req, res) => {
  try {
    const conteo = await reaccionService.obtenerConteo(req.params.id);
    res.json(conteo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener conteo' });
  }
};
