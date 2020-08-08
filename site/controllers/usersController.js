const { check, validationResult, body} = require('express-validator');
const bcryptjs = require("bcryptjs");
const loginService = require('../services/loginService');
const db = require('../database/models');
const stripe = require('stripe')('sk_test_51HA5JWAQkSZ0OTSU01RFJ2msoHaMMm8JcEWdh2M5jIaAZeuqHoJ8CGeioawXXAPu2yIv0HVo50qhSe2DwHDsMXXF00jsEEDzk7');



module.exports = {
    register: (req,res) => {
        res.render('registro', {title: 'Cursala | Registro', errors : {}, body : {}});
    },
    registerUser: (req, res) => { 
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render('registro', {title: 'Cursala | Registro', errors : errors.mapped(), body: req.body});
        };
        
        let imagen = '';
        if (req.file) {
            imagen = req.file.filename;        
        };

        let usuario = {
            name : req.body.nombre,
            email : req.body.email,
            password : bcryptjs.hashSync(req.body.password, 5),
            imagen :  imagen
        };
        
        db.Users.create(usuario).then(user => {
            //loginService.loginUser(req, res, user);
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
        res.render('login', {title: 'Cursala | login', errors : {}, body : {}});
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.render('login', {title: 'Cursala | login', errors : errors.mapped(), body : req.body});
        };
        
        // login user
        db.Users.findOne({where : {email : req.body.email}})
        .then(user => {
            //loginService.loginUser(req, res, user);
            res.locals.log = user;
            req.session.user = user;
            req.session.email = user.email;
            req.session.id = user.id;

            if (req.body.remember){
                let expires = new Date(Date.now() + 1000*60*60*24*90);
                res.cookie('remember', user, {expires});
            };

            return res.redirect('/users/perfil');
        
        }).catch((error) => {
            console.error(error);
            return res.render('login', {title: 'Cursala | login'});
        });
    },
    perfil: (req, res) => {
        db.Users.findByPk(req.session.user.id).then(user => {
            return res.render('profile', {title: 'Cursala | Perfil', user});
        }).catch(function(error){
            console.error(error);
            return res.redirect('/home');
        });
    },
    update: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('profile', {title: 'Cursala | Perfil', errors : errors.mapped(), body: req.body});
        };

        
        if(req.file){
            req.session.user.imagen = req.file.filename;
        };
        
        let user = {
            id: req.session.user.id,
            name: req.session.user.name,
            email: req.session.user.email,
            imagen: req.session.user.imagen
        };

        db.Users.update(user, {
            where: {id: req.session.user.id}
        });
        
        res.locals.log = user;
        req.session.user = user;

        return res.redirect('/users/perfil');
        
    },
    carrito: (req,res) => {
        let usuario_id = req.session.user.id;
        
       db.Carrito.findAll({
            where: {
                id_user : usuario_id,
            },
            include:[{association:"usuario"}, {association:"curso"}]
        })
        .then(function(productos){

            res.render('carrito', { title: 'Cursala | Carrito', productos:productos});
        });

    },
    confirmation: (req, res) => {
        /*
        let amount = 2500
            stripe.customers.create({
                email: req.body.stripeEmail,
                source: req.body.stripeToken
            }).then(customer => stripe.charges.create({
                amount,
                description: 'Cursala',
                currency: 'usd',
                customer: customer.id
              })).then(charge => res.render('success'));   
              */
    },
    administracionHome: async (req, res) => {
        let user = await db.Users.findOne({email: req.body.email});
        let admin = await db.Users.findOne({where : {admin : true}})
                
        if(user.email == admin.email){
            res.render('admin_home', {title: 'Cursala | administracion'});
        }else if (admin == null ){
            res.send('No tenes permisos para esta pagina');
        };
        
    },
    logout: (req, res) => {
        let expires = new Date(Date.now() - 1 );
        res.cookie('remember', '',  {expires: expires});
        
        let date = new Date(Date.now() - 100);
        req.session.cookie.expires = date;
        req.session.cookie.maxAge = -100;
    

        res.redirect('/');
    },
    agregarcarrito: function(req, res) {
        db.Carrito.create({
            id_user: req.session.user.id,
            id_producto: req.params.id
        });
        res.redirect('/users/carrito');
    }
}; 