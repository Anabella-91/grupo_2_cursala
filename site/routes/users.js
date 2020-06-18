var express = require('express');
var router = express.Router();
const path = require('path');
const { check, validationResult, body} = require('express-validator');
const multer = require('multer');
const authMid = require('./../middlewares/auth');
const guestMid = require('./../middlewares/guest');
const rememberMid = require('./../middlewares/remember');
const controller = require('../controllers/usersController');
const db = require('./../database/models');



/*  Creando almacenamiento de imagenes con Multer */
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        const folder = path.join(__dirname, '../public/imagenes');
        cb(null, folder);
    },
    filename : (req, file, cb) => {
        return cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }, 
});
/* Constante para subir imagen en la ruta */
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => { //fileFilter es la validacion para que se suba la imagen
        const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
        const ext = path.extname(file.originalname);
        if (acceptedExtensions.includes(ext)){
            //subiendo imagen
            cb(null, true);
        } else {
            //guardando imagen en body
            req.file = file;
            cb(null, false); //no se sube imagen
            
        }
    }
});

/* users */
router.get('/list', controller.users);

/* user registro . */
router.get('/registro', guestMid, controller.register);
router.post('/perfil', guestMid, upload.single('imagen'),[
    check('nombre', 'Ingresa al menos 2 caracteres').isLength({min:2}),
    check('email', 'Email invalido').isEmail().custom(function(value){
        //validar en la base de datos que no exista
        return db.User.findOne({where :{email : value}}).then(user => {
            if (user != null){
                return Promise.reject('Este correo se encuentra en uso');
            }
        })
    }),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min:6}).bail(),
    check('password', 'Las contraseñas no coinciden')
    .custom((value, { req }) => {
        return value === req.body.password2
    }),
    body('imagen').custom((value, { req }) => {
        if(req.file != undefined){
            const acceptedExtensions = ['.jpg', '.jpeg', '.png'];
            const ext = path.extname(req.file.originalname)
            return acceptedExtensions.includes(ext);
        }
        return false;
    }).withMessage('La imagen debe tener uno de los siguientes formatos: JPG, JPEG, PNG'),
], controller.registerUser);

/* user login . */
router.get('/login', guestMid, controller.login);
router.post('/login', guestMid, [
    check('password', 'Invalid Password, min 4 characters').isLength({min:4}).bail(),
    check('email', 'Invalid Email').isEmail().custom((value, { req }) => {
        return db.User.findOne({where :{email : value}}).then(user => {
            if (user == null) {
                return Promise.reject('Wrong credentials');
            } else if (user && !bcryptjs.compareSync(req.body.password , user.password)) {
                return Promise.reject('Wrong credentials');
            }
        })
    }),
    
],controller.processLogin);

/* user edit */
router.get('/edit/:idUser', controller.edit);
router.put('/edit', function(req, res){
    res.send('Fui por put');
});

router.get('/perfil', authMid, controller.perfil);
/*Rutas del carrito */
/* user carrito . */
router.get('/carrito', controller.carrito);

router.post('/eliminarProducto', controller.eliminarProducto);

/*Rutas admnistrador*/
router.get('/admin/administracion_home', controller.administracionHome);

module.exports = router;