const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController')


// Formulario de creacion de productos 
router.get('/create', controller.createProduct);
router.post('/create', controller.saveProduct);

// Detalle de un producto vista del usuario
router.get('/:id', controller.detailProduct);

// Actualizacion de producto para el admin 
router.get('/edit/:id', controller.editProduct);
router.put('/edit/:id', controller.updateProduct);

// Accion de borrado de producto 
router.post('/delete/:id', controller.deleteProduct);


module.exports = router;
