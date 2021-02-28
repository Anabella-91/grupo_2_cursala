const express = require('express')
const router = express.Router()
const controller = require('../controllers/productsController')
const { check, validationResult, body} = require('express-validator')

// Formulario de creacion de productos 
router.get('/create', controller.createProduct)
router.post('/create', [
    check('nombre', 'El nombre del curso debe tener al menos 5 caracteres').isLength({min:5}),
    check('descripcion', 'La descripción debe tener al menos 10 caracteres').isLength({min: 10}),
    check('precio', 'El precio debe ser un número').isNumeric()
], controller.saveProduct)

// Detalle de un producto --> para user
router.get('/:id', controller.detailProduct)

// Edición de producto -- > para admin
router.get('/edit/:id', controller.editProduct)
router.put('/edit/:id', [
    check('nombre', 'El nombre del curso debe tener al menos 5 caracteres').isLength({min:5}),
    check('descripcion', 'La descripción debe tener al menos 10 caracteres').isLength({min: 10}),
    check('precio', 'El precio debe ser un número').isNumeric()
], controller.updateProduct)

// Accion de borrado de producto 
router.delete('/delete/:id', controller.deleteProduct)

router.post('/addCart/:id', controller.addCarrito)

//Accion de eliminar un producto del carrito
router.post('/delCard', controller.deleteCarrito)

module.exports = router
