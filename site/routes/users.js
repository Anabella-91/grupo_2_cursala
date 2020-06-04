var express = require('express');
var router = express.Router();
var { check, validationResult, body} = require('express-validator');

const controller = require('../controllers/usersController');

/* user registro . */
router.get('/registro', controller.registro);
router.post('/registro',[
    check('name').isLength({min:2}).withMessage('Tu nombre debe contener al menos dos letras'),
    check('email').isEmail().withMessage('Email invalido')
], controller.registroUser);

/* user login . */
router.get('/login', controller.login);
router.post('/login',[
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min:8}).withMessage('La contrasena debe contener 8 caracteres')
], controller.processLogin);

/*users carrito nuevo */
router.get("/carrito", controller.carrito);

module.exports = router;
