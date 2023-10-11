const { Pool } = require('pg');

let pool;

// Verificar si la aplicación se está ejecutando en Docker
if (process.env.DOCKER === 'true') {
  // Si está en Docker, utiliza las variables de entorno proporcionadas por Docker Compose
  pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  });
} else {
  // Si no está en Docker, utiliza la configuración local
  pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "students",
    password: "12345",
    port: 5432,
  });
}

module.exports = pool;