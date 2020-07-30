const { check, validationResult, body} = require('express-validator');
const bcryptjs = require("bcryptjs");
const loginService = require('../services/loginService');
const db = require('./../database/models');


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
        
        db.Users.create(usuario).then(function(user){

            loginService.loginUser(req, res, user);
            console.log('user registrado');
            
            return res.redirect('/users/perfil');
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
        .then( async (user) => {
            
            loginService.loginUser(req, res, user);
            
            console.log('User login');

            return res.redirect('/users/perfil');
        }).catch((error) => {
            console.error(error);
            return res.render('login');
        });
    },
    perfil: (req, res) => {
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
        
    }
};