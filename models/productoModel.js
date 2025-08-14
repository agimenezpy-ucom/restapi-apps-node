// productoModel.js
const pool = require('../config/db');

class Producto {
  static async obtenerTodas() {
    const result = await pool.query('SELECT * FROM productos LIMIT 150');
    return result.rows;
  }

  // Implementa funciones para insertar, actualizar y eliminar categorías según sea necesario
}

module.exports = Producto;
