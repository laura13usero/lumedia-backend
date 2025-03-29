const express = require('express');
const router = express.Router();
const reaccionController = require('../controllers/reaccion.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.post('/', verificarToken, reaccionController.darReaccion);
router.get('/video/:id', reaccionController.obtenerConteo);

module.exports = router;
