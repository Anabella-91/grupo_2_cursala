const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController')
const { check, validationResult, body} = require('express-validator');


/* Formulario de creacion de productos */
router.get('/create', controller.formCreate);
router.post('/', controller.save);


/* Detalle de un producto */
router.get('/:id', controller.detail);

/* Actualizacion de producto para el admin */ 
router.get('/:id', controller.edit);
router.post('/:id', controller.update);

/* Accion de borrado de producto */
router.delete('/delete/:id', controller.delete);


module.exports = router;
