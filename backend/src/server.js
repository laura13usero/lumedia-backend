const app = require('./app');
const PORT = process.env.PORT || 3000;
const express = require('express');
const pool = require('./database/db');  // El archivo db.js que ya tienes

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});



// Middleware para servir archivos estáticos (como tu HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint para obtener la URL del video
app.get('/api/videos', async (req, res) => {
  try {
    // Realizamos la consulta a la base de datos para obtener todos los videos
    const result = await pool.query('SELECT id, url, titulo, descripcion FROM videos');
    if (result.rows.length > 0) {
      res.json(result.rows);  // Enviamos todos los videos como respuesta en formato JSON
    } else {
      res.status(404).json({ error: 'No se encontraron videos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});