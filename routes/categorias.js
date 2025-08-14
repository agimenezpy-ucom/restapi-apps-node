const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Obtener todas las categorías
router.get('/', categoriaController.obtenerTodas);

// Crear una nueva categoría
router.post('/', categoriaController.crearCategoria);

// Obtener una categoría por su ID
router.get('/:id', categoriaController.obtenerCategoriaPorId);

// Actualizar una categoría por su ID
router.put('/:id', categoriaController.actualizarCategoria);

// Eliminar una categoría por su ID
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
