const fs = require('fs');
const { check, validationResult, body} = require('express-validator');
const usersData = require('./../models/User');
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcrypt");
const db = require('./../database/models');


module.exports = {
    list: function(req, res){
        db.Users.findAll().then(function(user){
            res.render('user_list', {user: user})
        })
    },
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
            name : req.body.nombre,
            email : req.body.email,
            password : bcryptjs.hashSync(req.body.password, 5),
            imagen :  imagen
        } 
        console.log(user);
        
        //login user
        db.Users.create(user)
                .then(function(){
                    res.locals.log = true;
                    req.session.log = true;
                    req.session.userEmail = user.email;

                    console.log('user registrado');
                    
                    return res.redirect('/users/perfil');
                })
                .catch(function(error){
                    console.error(error);
                    return res.redirect('/users/registro')
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
        return res.redirect('/users/perfil');
    },
    edit: function(req, res){
        let user = db.Users.findByPk(req.params.id); 
        if (user === null) {
            console.log('User not found!');
          } else {
            console.log(user); 
          }
        
        return res.render('profile', {user:user}, req.session);
        
    },
    update: function(req, res){
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
    perfil: function(req, res) {
        let users = db.Users.findAll().then(function(user){
            return res.render('profile', {user: user});
        });

    },
    carrito:function (req,res){
        res.render('carrito', { title: 'Cursala | Carrito'});
    },
    eliminarProducto: function (req, res){
        res.send("Deletear producto");  
    },
    administracionHome: function (req, res) {
        res.render('admin_home', {title: 'Cursala | administracion'});
    },
    deleteUser: function (req, res){
        db.Users.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.redirect('/users/admin/administracion_home');
    }
};