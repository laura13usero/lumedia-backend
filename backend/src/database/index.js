const { Client } = require('pg');

// Configuración de la conexión a PostgreSQL
const client = new Client({
  host: 'localhost', // Dirección del servidor (en tu caso, local)
  port: 5432,        // Puerto por defecto de PostgreSQL
  user: 'postgres', // Reemplaza con tu nombre de usuario
  password: '1234', // Reemplaza con tu contraseña
  database: 'lumedia', // Reemplaza con el nombre de tu base de datos
});

async function conectar() {
  try {
    // Conexión al servidor PostgreSQL
    await client.connect();
    console.log("Conexión exitosa a la base de datos PostgreSQL.");

    // Aquí puedes realizar tus consultas a la base de datos, por ejemplo:
    const res = await client.query('SELECT NOW()');
    console.log(res.rows);

  } catch (err) {
    console.error("Error al conectar a la base de datos:", err.stack);
  } finally {
    // Cerrar la conexión
    await client.end();
  }
}

// Llamar a la función de conexión
conectar();