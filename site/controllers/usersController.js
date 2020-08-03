const { check, validationResult, body} = require('express-validator');
const bcryptjs = require("bcryptjs");
const loginService = require('../services/loginService');
const db = require('../database/models');
const stripe = require('stripe')('sk_test_51HA5JWAQkSZ0OTSU01RFJ2msoHaMMm8JcEWdh2M5jIaAZeuqHoJ8CGeioawXXAPu2yIv0HVo50qhSe2DwHDsMXXF00jsEEDzk7');



module.exports = {
    register: (req,res) => {

        res.render('registro', {errors : {}, body : {}});
        
    },
    registerUser: (req, res) => { 
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('registro', {errors : errors.mapped(), body: req.body});
        }
        
        let imagen = '';
        if (req.file) {
            imagen = req.file.path.replace('public\\images\\users\\', '');        
        }
        

        let usuario = {
            name : req.body.nombre,
            email : req.body.email,
            password : bcryptjs.hashSync(req.body.password, 5),
            imagen :  imagen
        } 
        
        db.Users.create(usuario).then(user => {
            //loginService.loginUser(req, res, user);
            console.log(user);
            res.locals.log = user;
            req.session.user = user;
            
            return res.redirect('/home');
        })
        .catch(function(error){
            console.error(error);
            
            return res.redirect('/users/registro')
        });

    },
    login: (req,res) => {

        res.render('login', {errors : {}, body : {}});
    },
    processLogin: (req, res) => {
        
        let errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.render('login', {errors : errors.mapped(), body : req.body});
        }
        
        // login user
        db.Users.findOne({where : {email : req.body.email}})
        .then( async user => {

            loginService.loginUser(req, res, user);
            
            console.log('User login');

            return res.render('profile');
        }).catch((error) => {
            console.error(error);
            return res.render('login');
        });
    },
    perfil: (req, res) => {
        db.Users.findByPk(req.params.id).then(user => {
            return res.render('profile', {user});
        }).catch(function(error){
            console.error(error);
            return res.redirect('/home');
        });

        console.log(req.session.user);
    },
    update: async (req, res) => {
        await db.Users.findOne({where : {email : req.body.email}}).then( async (user) => {
            res.redirect('/users/perfil', {user : user});
        });
    },
    carrito: (req,res) => {
        res.render('carrito', { title: 'Cursala | Carrito'});
    },
    administracionHome: async (req, res) => {
        let user = await db.Users.findOne({email: req.body.email});
        let admin = await db.Users.findOne({where : {admin : true}})

            console.log(admin);

            if(user.email == admin.email){
                res.render('admin_home', {title: 'Cursala | administracion'});
            }else{
                res.send('No tenes permisos para esta pagina');
            };
    
    },
    logOut: (req, res) => {
        console.log(req.session);
        if (req.session) {
            let date = new Date(Date.now() - 100);
            req.session.cookie.expires = date;
            req.session.cookie.maxAge = -100;
        };

        res.redirect('/users/login');
        
    },
    agregarCarrito: async (req, res) => {
        const customer = await stripe.customers.create({
            email: req.body.stripeEmail,
            source: req.body.stripeToken
        })
        const charge = await stripe.charges.create({
            amount: '3000',
            currency: 'usd',
            customer: customer.id,
            description: 'Baby Yoda'
        })
        console.log(charge.id);
        res.send('Recibido');
    

        /*
        db.Carrito.create({
            id_user: req.body.user_id,
            id_producto: req.body.product_id
        })
        return res.json;
        */
    }
}; 