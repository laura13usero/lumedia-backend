const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        // Usuario de PostgreSQL (asegúrate de que sea correcto)
  host: 'lumedia.cmvygq66k57c.us-east-1.rds.amazonaws.com',       // RDS endpoint
  database: 'postgres',     // Nombre de la base de datos que quieres usar
  password: 'lumedia123',        // Contraseña que me mencionaste
  port: 5432,              // Puerto por defecto de PostgreSQL
  ssl: {
    rejectUnauthorized: false, // Puedes intentar agregar esto para no rechazar los certificados no autorizados (solo en desarrollo)
  }
});

module.exports = pool;
