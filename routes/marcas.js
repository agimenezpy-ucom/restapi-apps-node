const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController');

// Obtener todas las marcas
router.get('/', marcaController.obtenerTodas);

// Crear una nueva marcas
router.post('/', marcaController.crearMarca);

// Obtener una marcas por su ID
router.get('/:id', marcaController.obtenerMarcaPorId);

// Actualizar una marcas por su ID
router.put('/:id', marcaController.actualizarMarca);

// Eliminar una marcas por su ID
router.delete('/:id', marcaController.eliminarMarca);

module.exports = router;
