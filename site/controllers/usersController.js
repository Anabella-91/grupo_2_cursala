const fs = require('fs');
const { check, validationResult, body} = require('express-validator');
const usersData = require('./../models/User');
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcrypt");
const db = require('./../database/models');



module.exports = {
    register:function (req,res){
        res.render('registro', {errors : {}, body : {}});
        
    },
    registerUser: function(req, res){
        let validation = validationResult(req)
        
        if (!validation.isEmpty()) {
            return res.render('registro', {errors : validation.mapped(), body: req.body});
        }
        
        let imagen = '';
        if (req.file) {
            imagen = req.file;
        }
        
        let user = {
            email : req.body.email,
            name : req.body.name,
            password : bcryptjs.hashSync(req.body.password, 5),
            imagen :  imagen
        } 
        
        //login user
        db.User.create(user)
                .then(function(){
                    res.locals.log = true;
                    req.session.log = true;
                    req.session.userEmail = user.email;


                    return res.redirect('/perfil');
                })
                .catch(function(error){
                    console.error(error);
                    return res.redirect('/registro')
                })
    },
    login:function (req,res){
        res.render('login', {errors : {}, body : {}});
    },
    processLogin: function(req, res){
        
        let validation = validationResult(req);
        
        if(!validation.isEmpty()){
            return res.render('login', {errors : validation.mapped(), body : req.body});
        }
        
        // cookie remember
        if (req.body.remember) {
            //creando cookie por 90 dias
            res.cookie('remember', req.body.email,  {expires: new Date(Date.now() + 1000*60*60*24*90)});
        }
        
        //user login
        req.session.log = true;
        res.locals.log = true;
        req.session.userEmail = req.body.email;
        
        console.log('Login user');
        return res.redirect('/');
    },
    edit: function(req, res){
       
        res.send('Perfil editado'); 
        
    },
    perfil: function(req, res) {
        res.render('profile', {title: 'Cursala | Perfil'});
        return res.send(req.session);
    },
    carrito:function (req,res){
        res.render('carrito', { title: 'Cursala Carrito'});
    },
    eliminarProducto: function (req, res){
        res.send("Deletear producto");  
    },
    administracionHome: function (req, res) {
        res.render('admin_home', {title: 'Cursala | administracion'});
    }
};