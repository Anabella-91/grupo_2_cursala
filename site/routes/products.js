const express = require('express');
const router = express.Router();


const controller = require('../controllers/productsController')

/* Listado de productos */ 
router.get('/products', controller.list);

/* Formulario de creacion de productos */
router.get('/create', controller.create);

/* Detalle de un producto en particular */
router.get('/:id', controller.detail);

/* Accion de creacion de productos, a donde se envia el formulario */ 
router.post('/products', controller.create_form);

/* Formulario de edicion de productos */ 
router.get('/:id/edit', controller.edit);

/* Accion de edicion, a donde se envia el formulario */
router.put('/:id', controller.edit_form);

/* Accion de borrado de producto */
router.delete('/:id', controller.delete);


module.exports = router;
