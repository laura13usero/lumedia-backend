const express = require('express');
const router = express.Router();
const favoritoController = require('../controllers/favorito.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

// Añadir a favoritos
router.post('/', verificarToken, favoritoController.agregar);

// Quitar de favoritos
router.delete('/:video_id', verificarToken, favoritoController.eliminar);

// Verificar si es favorito
router.get('/video/:video_id', verificarToken, favoritoController.esFavorito);

// Listar todos los favoritos del usuario
router.get('/', verificarToken, favoritoController.obtenerFavoritosUsuario);

module.exports = router;
