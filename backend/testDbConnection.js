// testDbConnection.js
const db = require('./src/database/db');  // Asegúrate de que la ruta sea correcta

// Realizamos una consulta simple para comprobar que la conexión funciona
db.query('SELECT NOW()', [])
  .then(result => {
    console.log('Conexión exitosa:', result.rows);  // Deberías ver la fecha y hora de la base de datos
  })
  .catch(err => {
    console.error('Error de conexión:', err);  // Si hay un error, lo verás aquí
  });

