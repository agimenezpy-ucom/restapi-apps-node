const pool = require('../config/db');

// Obtener todas las categorías
exports.obtenerTodas = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre FROM categorias');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las categorías' });
  }
};

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await pool.query('INSERT INTO categorias (nombre) VALUES ($1) RETURNING id, nombre', [nombre]);
    res.json({"mensaje": "Categoría creada exitosamente", "categoria": result.rows[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
};

// Obtener una categoría por su ID
exports.obtenerCategoriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT id, nombre FROM categorias WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la categoría' });
  }
};

// Actualizar una categoría por su ID
exports.actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const result = await pool.query('UPDATE categorias SET nombre = $1 WHERE id = $2 RETURNING id, nombre', [nombre, id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la categoría' });
  }
};

// Eliminar una categoría por su ID
exports.eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM categorias WHERE id = $1 RETURNING id, nombre', [id]);
    if (result.rows.length > 0) {
      res.json({ mensaje: 'Categoría eliminada correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la categoría' });
  }
};
