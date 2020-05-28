const express = require('express');
const router = express.Router();

const controller = require('../controllers/productsController')

/* Listado de productos */ 
router.get('/products', controller.products);

/* Formulario de creacion de productos */
router.get('/products/create', controller.create);

/* Detalle de un producto en particular */
router.get('/products/:id', controller.detail);

/* Accion de creacion de productos, a donde se envia el formulario */ 
router.post('/products', controller.create_form);

/* Formulario de edicion de productos */ 
router.get('/products/:id/edit', controller.edit);

/* Accion de edicion, a donde se envia el formulario */
router.put('/products/:id', controller.edit_form);

/* Accion de borrado de producto */
router.delete('/products/:id', controller.delete);


module.exports = router;
