const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');
const { check, validationResult, body} = require('express-validator');



// Formulario de creacion de productos 
router.get('/create', controller.createProduct);
router.post('/create', [
    check('nombre', 'El nombre del curso debe tener al menos 5 caracteres').isLength({min:5}),
    check('descripcion', 'La descripción debe tener al menos 10 caracteres').isLength({min: 10}),
    check('precio', 'El precio debe ser un número').isNumeric()
], controller.saveProduct);

// Detalle de un producto vista del usuario
router.get('/:id', controller.detailProduct);

// Actualizacion de producto para el admin 
router.get('/edit/:id', controller.editProduct);
router.put('/edit/:id', [
    check('nombre', 'El nombre del curso debe tener al menos 5 caracteres').isLength({min:5}),
    check('descripcion', 'La descripción debe tener al menos 10 caracteres').isLength({min: 10}),
    check('precio', 'El precio debe ser un número').isNumeric()
], controller.updateProduct);

// Accion de borrado de producto 
router.delete('/delete/:id', controller.deleteProduct);


module.exports = router;
