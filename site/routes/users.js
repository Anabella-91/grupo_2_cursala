var express = require('express');
var router = express.Router();
const path = require('path');
const { check, validationResult, body} = require('express-validator');
const multer = require('multer');
const bcryptjs = require('bcryptjs');
const authMid = require('./../middlewares/auth');
const guestMid = require('./../middlewares/guest');
const controller = require('../controllers/usersController');
const db = require('./../database/models');



/*  Creando almacenamiento de imagenes con Multer */
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        const folder ='public/images/users';
        cb(null, folder);
    },
    filename : (req, file, cb) => {
        return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }, 
});
/* Constante para subir imagen en la ruta */
const upload = multer({storage: storage});

/* user registro . */
router.get('/registro', controller.register);
router.post('/registro', upload.single('imagen'),[
    check('nombre', 'Debes completar tu nombre').notEmpty(),
    check('email', 'Email invalido').isEmail().custom(function(value){
        //validar en la base de datos que no exista
        return db.Users.findOne({where :{email : value}}).then(user => {
            if (user != null){
                return Promise.reject('Este correo se encuentra en uso');
            }
        })
    }),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min:6}).notEmpty().bail(),
], controller.registerUser);

/* user login . */
router.get('/login', controller.login);
router.post('/login', guestMid, [
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min:6}).bail(),
    check('email', 'Email invalido').isEmail().custom((value, { req }) => {
        return db.Users.findOne({where :{email : value}}).then(user => {
            if (user == null) {
                return Promise.reject('Credenciales invalidas');
            } else if (user && !bcryptjs.compareSync(req.body.password , user.password)) {
                return Promise.reject('Credenciales invalidas');
            }
        })
    }),
    
],controller.processLogin);

/* Perfil user */ 
router.get('/perfil', guestMid, controller.perfil);

/* Edicion de usuarios */
router.post('/perfil', controller.update);

/*Rutas del carrito */
router.get('/carrito', controller.carrito);

/*Agregar al carrito*/
router.post('/addcart', controller.agregarCarrito);

/* User logout*/
router.post('/logout', controller.logOut);

/*Rutas admnistrador*/
router.get('/admin/administracion_home', controller.administracionHome);


module.exports = router;