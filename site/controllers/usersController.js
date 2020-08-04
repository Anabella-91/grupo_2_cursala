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
            imagen = req.file.filename;        
        }
        
        
        let usuario = {
            name : req.body.nombre,
            email : req.body.email,
            password : bcryptjs.hashSync(req.body.password, 5),
            imagen :  imagen
        } 
        
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
        res.render('login', {errors : {}, body : {}});
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.render('login', {errors : errors.mapped(), body : req.body});
        }
        
        // login user
        db.Users.findOne({where : {email : req.body.email}})
        .then(user => {
            //loginService.loginUser(req, res, user);
            res.locals.log = user;
            req.session.user = user;
            req.session.email = user.email;

            if (req.body.remember != undefined){
                res.cookie('remember', user, {maxAge: 60*60*24*30});
            }

            return res.redirect('/users/perfil');
        
        }).catch((error) => {
            console.error(error);
            return res.render('login');
        });
    },
    perfil: (req, res) => {
        db.Users.findByPk(req.session.user.id).then(user => {
            return res.render('profile', {user});
        }).catch(function(error){
            console.error(error);
            return res.redirect('/home');
        });
    },
    update: (req, res) => {
        let usuario = {
            id: res.locals.log.id,
            name: req.body.nombre,
            email: req.body.email
        };
        
        db.Users.update(usuario, {
            where: {id: req.params.id}
        });
        
        res.locals.log = usuario;
        req.session.user = usuario;
        
        return res.redirect('/users/perfil');
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
        }else if (admin == null ){
            res.send('No tenes permisos para esta pagina');
        };
        
    },
    logOut: (req, res) => {
        console.log(req.session.user);
        if(req.session.user){
            req.session=null;
            res.clearCookie('remember');
        };

        res.redirect('/landing');
        //res.cookies.set('testtoken', {expires: Date.now()});       
        
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