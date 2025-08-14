const pool = require('../config/db');

// Obtener todas las marcass
exports.obtenerTodas = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre FROM marcas');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las marcass' });
  }
};

// Crear una nueva marcas
exports.crearMarca = async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await pool.query('INSERT INTO marcas (nombre) VALUES ($1) RETURNING id, nombre', [nombre]);
    res.json({"mensaje": "Marca creada exitosamente", "marca": result.rows[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la marcas' });
  }
};

// Obtener una marcas por su ID
exports.obtenerMarcaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT id, nombre FROM marcas WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ mensaje: 'Marca no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la marcas' });
  }
};

// Actualizar una marcas por su ID
exports.actualizarMarca = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const result = await pool.query('UPDATE marcas SET nombre = $1 WHERE id = $2 RETURNING id, nombre', [nombre, id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ mensaje: 'Marca no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la marcas' });
  }
};

// Eliminar una marcas por su ID
exports.eliminarMarca = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM marcas WHERE id = $1 RETURNING id, nombre', [id]);
    if (result.rows.length > 0) {
      res.json({ mensaje: 'Marca eliminada correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Marca no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la marcas' });
  }
};
