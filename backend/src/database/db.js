const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        // Usuario de PostgreSQL (asegúrate de que sea correcto)
  host: 'localhost',       // Si estás usando PostgreSQL localmente
  database: 'lumedia',     // Nombre de la base de datos que quieres usar
  password: '1234',        // Contraseña que me mencionaste
  port: 5433,              // Puerto por defecto de PostgreSQL
});

module.exports = pool;
