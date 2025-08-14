// categoriaModel.js
const pool = require('../config/db');

class Marca {
  static async obtenerTodas() {
    const result = await pool.query('SELECT * FROM marcas');
    return result.rows;
  }

  // Implementa funciones para insertar, actualizar y eliminar marcas según sea necesario
}

module.exports = Marca;
