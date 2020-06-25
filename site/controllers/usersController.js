const fs = require('fs');
const { check, validationResult, body} = require('express-validator');
const usersData = require('./../models/User');
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcrypt");
const loginService = require('../services/loginService');
const tokenService = require('../services/tokenService');
const db = require('./../database/models');



module.exports = {
    register: (req,res) => {
        res.render('registro', {errors : {}, body : {}});
        
    },
    registerUser: (req, res) => {
        let validation = validationResult(req)
        
        if (!validation.isEmpty()) {
            return res.render('registro', {errors : validation.mapped(), body: req.body});
        }
        
        let imagen = '';
        if (req.file) {
            imagen = req.file;        
        }
        
        let user = {
            name : req.body.nombre,
            email : req.body.email,
            password : bcryptjs.hashSync(req.body.password, 5),
            imagen :  imagen
        } 
        console.log(user);
        
        //login user
        db.Users.create(user)
        .then(function(){
            loginService.loginUser(req, res, user);
            
            return res.redirect('/users/perfil');
        })
        .catch(function(error){
            console.error(error);
            
            return res.redirect('/users/registro')
        });
    },
    login: async (req,res) => {
        res.render('login', {errors : {}, body : {}});
    },
    processLogin: (req, res) => {
        
        let validation = validationResult(req);
        
        if(!validation.isEmpty()){
            return res.render('login', {errors : validation.mapped(), body : req.body});
        }
        
        // login user
        db.Users.findOne({where : {email : req.body.email}})
        .then( async (user) => {
            //guardando cookie
            if (req.body.remember) {
                //cookie creada que expira en 90 dias
                await tokenService.generateToken(res, user);
            }
            
            loginService.loginUser(req, res, user);
            
            console.log('User login');
            return res.render('/users/perfil');
        }).catch((error) => {
            console.error(error);
            return res.render('users/login');
        });
    },
    edit: (req, res) => {
        let user = db.Users.findByPk(req.params.id); 
        if (user === null) {
            console.log('User not found!');
        } else {
            console.log(user); 
        }
        
        return res.render('profile', {user:user}, req.session);
        
    },
    update: (req, res) => {
        db.Users.update({
            name : req.body.nombre,
            email : req.body.descripcion,
            password : req.body.categories
        }, {
            where: {
                id: req.params.id
            }
        });
        
        return res.redirect('/users/admin/administracion_home' + req.params.id);
    },
    perfil: (req, res) => {
        if (req.file) {
        user.imagen = req.file.path.replace('public/', '/');
    
        db.Users.findOne({where : {email : req.body.email}}).then(async(user) => {
        return res.render('profile', {user: user, errors : {}, body : {}});
    
        });
    }
    },
    carrito: (req,res) => {
        res.render('carrito', { title: 'Cursala | Carrito'});
    },
    eliminarProducto: (req, res) => {
        res.send("Deletear producto");  
    },
    administracionHome: (req, res) => {
        res.render('admin_home', {title: 'Cursala | administracion'});
    },
    logOut: (req, res) => {
        
        loginService.logOutSession(req, res);
        
    }
};