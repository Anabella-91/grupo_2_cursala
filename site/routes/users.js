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

<<<<<<< HEAD
=======
/* user edit */
router.get('/edit/:idUser', controller.edit);
router.put('/edit', function(req, res){
    res.send('Fui por put');
});


/* user carrito . */
router.get('/carrito', controller.carrito);

>>>>>>> c67559ac5bf4c778ac646abed04261c070e47e5a
/*users carrito nuevo */
router.get("/carrito", controller.carrito);

module.exports = router;
