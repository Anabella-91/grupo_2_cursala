const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController')
const { check, validationResult, body} = require('express-validator');


/* Formulario de creacion de productos */
router.get('/create', controller.createProduct);
router.post('/', controller.saveProduct);

/* Detalle de un producto */
router.get('/:id', controller.detailProduct);

/* Actualizacion de producto para el admin */ 
router.get('/:id', controller.editProduct);
router.post('/:id', controller.updateProduct);

/* Accion de borrado de producto */
router.delete('/delete/:id', controller.deleteProduct);


module.exports = router;
