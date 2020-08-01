const express = require('express');
const router = express.Router();

const controller = require('../controllers/adminController');

//Vista de los mensajes para el administrador
router.get('/mensajes', controller.mostrar);

//Vista del listado de los cursos
router.get('/listado/productos', controller.productos);

module.exports = router;