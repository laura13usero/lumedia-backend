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
app.get('/api/video', async (req, res) => {
  try {
    // Realizamos la consulta a la base de datos para obtener la URL del video
    const result = await pool.query('SELECT url FROM videos WHERE id = 1'); // Cambia "1" por el id adecuado
    if (result.rows.length > 0) {
      const videoUrl = result.rows[0].url;
      res.json({ url: videoUrl });
    } else {
      res.status(404).json({ error: 'Video no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});


