const favoritoService = require('../services/favorito.service');

exports.agregar = async (req, res) => {
  const usuario_id = req.user.id;
  const { video_id } = req.body;
  const fav = await favoritoService.agregar(usuario_id, video_id);
  res.status(201).json(fav);
};

exports.eliminar = async (req, res) => {
  const usuario_id = req.user.id;
  const { video_id } = req.params;
  await favoritoService.eliminar(usuario_id, video_id);
  res.json({ mensaje: 'Eliminado de favoritos' });
};

exports.esFavorito = async (req, res) => {
  const usuario_id = req.user.id;
  const { video_id } = req.params;
  const resultado = await favoritoService.esFavorito(usuario_id, video_id);
  res.json({ favorito: resultado });
};

exports.obtenerFavoritosUsuario = async (req, res) => {
  const usuario_id = req.user.id;
  const lista = await favoritoService.obtenerFavoritosUsuario(usuario_id);
  res.json(lista);
};
