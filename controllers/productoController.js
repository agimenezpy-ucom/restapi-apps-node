const pool = require('../config/db');

// Obtener todos los productos
exports.obtenerTodos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos LIMIT 150');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los productos' });
  }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
  const { nombre, precio, categoria_id, marca_id} = req.body;
  try {
    const result = await pool.query('INSERT INTO productos (nombre, precio, categoria_id, marca_id) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, precio, categoria_id, marca_id]);
    res.json({"mensaje": "Producto creada exitosamente", "producto": result.rows[0]});
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el producto' });
  }
};

// Obtener un producto por su ID
exports.obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el producto' });
  }
};

// Actualizar un producto por su ID
exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, categoria_id, marca_id } = req.body;
  try {
    const result = await pool.query('UPDATE productos SET nombre = $1, precio = $2, categoria_id = $3, marca_id = $4 WHERE id = $5 RETURNING *', [nombre, precio, categoria_id, marca_id, id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto por su ID
exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.json({ mensaje: 'Producto eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto' });
  }
};
