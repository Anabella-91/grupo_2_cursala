var express = require('express');
var router = express.Router();
var { check, validationResult, body} = require('express-validator');

const controller = require('../controllers/usersController');

/* user registro . */
router.get('/registro', controller.registro);

/* user login . */
router.get('/login', controller.login);
router.post('/login',[
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min:8}).withMessage('La contrasena debe contener 8 caracteres')
], controller.processLogin);

/* user check */
router.get('/check', function(req, res){
    if(req.session.newUser == undefined){
        res.send('No estas logueade');
    }else{
        res.send('Logueade '+ req.session.newUser)
    }
});

/* user carrito . */
router.get('/carrito', controller.carrito);

module.exports = router;
