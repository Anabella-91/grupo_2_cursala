const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController')

// Lectura
router.get('/index', controller.index);

// Formulario de creacion de productos 
router.get('/create', controller.createProduct);
router.post('/create', controller.saveProduct);

// Detalle de un producto 
router.get('/:id', controller.detailProduct);

// Actualizacion de producto para el admin 
router.get('/edit/:id', controller.editProduct);
router.put('/edit/:id', controller.updateProduct);

// Accion de borrado de producto 
router.post('/delete/:id', controller.deleteProduct);


module.exports = router;
