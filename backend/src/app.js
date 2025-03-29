const express = require('express');
const cors = require('cors');
const path = require('path'); // Añade esta línea para manejar rutas de archivos
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde el directorio frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rutas de la API
app.use('/api/auth', authRoutes);

// Ruta por defecto para servir index.html (opcional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend', 'index.html'));
});

module.exports = app;