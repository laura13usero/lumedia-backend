const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const videoRoutes = require('./routes/video.routes');  // Asegúrate de importar las rutas de video

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde el directorio frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);  // Agregar la ruta para los videos

// Ruta por defecto para servir index.html (opcional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

module.exports = app;