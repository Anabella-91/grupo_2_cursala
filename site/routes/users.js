var express = require('express');
var router = express.Router();
var { check, validationResult, body} = require('express-validator');

const controller = require('../controllers/usersController');

/* user registro . */
router.get('/registro', controller.registro);
router.post('/registro',[
    check('name').notEmpty().withMessage('Tu nombre debe contener al menos dos letras'),
    check('email').isEmail().withMessage('Email invalido'),
    check('password').notEmpty().withMessage('La contrasena debe contener 8 caracteres')
], controller.registroUser);

/* user login . */
router.get('/login', controller.login);
router.post('/login',[
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min:8}).withMessage('La contrasena debe contener 8 caracteres')
], controller.processLogin);

/* user edit */
router.get('/edit/:idUser', controller.edit);
router.put('/edit', function(req, res){
    res.send('Fui por put');
});

router.get('/profile', controller.perfil);
/*Rutas del carrito */
/* user carrito . */
router.get('/carrito', controller.carrito);

router.post('/eliminarProducto', controller.eliminarProducto);

/*Rutas admnistrador*/
router.get('/admin/administracion_home', controller.administracionHome);

module.exports = router;