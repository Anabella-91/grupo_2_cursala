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
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('registro', {errors : errors.mapped(), body: req.body});
        }
        
        let imagen = '';
        if (req.file) {
            imagen = req.file.path.replace('public\\images\\users\\', '');        
        }
        

        let user = {
            name : req.body.nombre,
            email : req.body.email,
            password : bcryptjs.hashSync(req.body.password, 5),
            imagen :  imagen
        } 
        

        //login user
        db.Users.create(user).then(function(user){

            loginService.loginUser(req, res, user);
            console.log('user registrado');
            
            return res.render('profile', {user:user});
        })
        .catch(function(error){
            console.error(error);
            
            return res.render('/users/registro')
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
            //guardando cookie
            if (req.body.remember) {
                //cookie creada que expira en 90 dias
                await tokenService.generateToken(res, user);
            }
            
            loginService.loginUser(req, res, user);
            
            console.log('User login');
            return res.render('profile', {user:user});
        }).catch((error) => {
            console.error(error);
            return res.render('login');
        });
    },
    perfil: async (req, res) => {
        await db.Users.findOne({where : {email : req.body.email}}).then( async (user) => {
            res.render('profile', {user : user});
        });                
    },
    update: async (req, res) => {
        await db.Users.findOne({where : {email : req.body.email}}).then( async (user) => {
            res.render('profile', {user : user});
        });
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