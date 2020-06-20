const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController')


/* Formulario de creacion de productos */
router.get('/create', controller.formCreate);
router.post('/', controller.save);

/* Lectura de productos */
router.post('/', controller.list);

/* Detalle de un producto */
router.get('/:id', controller.detail);

/* Actualizacion de producto para el admin */ 
router.get('/edit/:id', controller.edit);
router.post('/edit/:id', controller.update);

/* Accion de borrado de producto */
router.delete('/delete/:id', controller.delete);


module.exports = router;
