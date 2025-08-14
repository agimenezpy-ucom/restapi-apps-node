// categoriaModel.js
const pool = require('../config/db');

class Categoria {
  static async obtenerTodas() {
    const result = await pool.query('SELECT * FROM categorias');
    return result.rows;
  }

  // Implementa funciones para insertar, actualizar y eliminar categorías según sea necesario
}

module.exports = Categoria;
