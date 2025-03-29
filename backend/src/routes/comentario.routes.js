
const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentario.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.post('/', verificarToken, comentarioController.agregar);
router.get('/video/:id', comentarioController.obtenerPorVideo);

module.exports = router;
