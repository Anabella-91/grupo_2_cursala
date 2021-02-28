var express = require('express');
var router = express.Router();
const path = require('path');
const { check, validationResult, body} = require('express-validator');
const multer = require('multer');
const bcrypt = require('bcrypt');
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
const upload = multer({storage});

/* Registro del user */
router.get('/registro', controller.registerUser);
/* Guardando user con imagen */
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
], controller.saveUser);

/* Inicio sesión de user */
router.get('/login', controller.login);
/*  */
router.post('/login', guestMid, [
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min:6}).bail(),
    check('email', 'Email invalido').isEmail().custom((value, { req }) => {
        return db.Users.findOne({where :{email : value}}).then(user => {
            if (user == null) {
                return Promise.reject('Credenciales invalidas');
            } else if (user && !bcrypt.compareSync(req.body.password , user.password)) {
                return Promise.reject('Credenciales invalidas');
            }
        })
    }),
    
],controller.postLogin);

/* Perfil user */ 
router.get('/perfil', guestMid, controller.profile);

/* Edicion de usuarios */
router.post('/perfil', upload.single('image'), controller.updateProfile);

/* Rutas del carrito */
router.get('/carrito', controller.carrito);
router.post('/compra-exitosa', (req, res) => {
    res.render('compraOk');
});

/* User logout */
router.post('/logout', guestMid, controller.logout);

/*Rutas admnistrador */
router.get('/admin/administracion_home', controller.administracionHome);


module.exports = router;