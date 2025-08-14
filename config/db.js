const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.APP_USER || 'postgres',
  host: process.env.APP_HOST || 'localhost',
  database: process.env.APP_DATABASE || 'test',
  password: process.env.APP_PASSWORD || 'maiden',
  port: 5432,
});

module.exports = pool;
