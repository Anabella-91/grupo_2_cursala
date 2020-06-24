const productsData = require('./../models/Product');
const {check, validationResult, body} = require('express-validator');
const db = require('./../database/models');

module.exports = {
    formCreate:function (req,res){
        let categories = db.Categories.findAll();
        
        return res.render('products/product_carga', {title: 'Cursala - Carga de Producto', categories:categories});
    },
    save: function (req, res) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()){
            return res.send(errors.mapped());
        }            

        let product = {
            name : req.body.nombre,
            descripcion : req.body.descripcion,
            categories : req.body.categories,
            horas : req.body.horas,
            apuntes : req.body.apuntes,
            ejercicios : req.body.ejercicios,
            precio : req.body.precio
        } 

        db.Products.create(product)
            .then(function(){
                return res.redirect('/users/admin/administracion_home');
            }).catch(function(error){
                console.error(error);
                return res.redirect('/products/create')
            });
    },
        list: function(req, res){
            db.Products.findAll().then(function(product){
                return res.render('products/product_list', {product})
            })
        },
        detail:function (req,res){  
            db.Products.findByPk(req.params.id, {
                // le decimos que incluya las relaciones, para que aparezcan las categorias y usuarios
                include:[{association:'category'}, {association: 'users'}]
            }).then(function(product){
                
                res.render('products/product_detail', {product : product});
            })       
            },
        edit : function (req, res){
            // se hacen dos pedidos asincronicos, el producto y la categoria
            let product = db.Products.findByPk(req.params.id); 
            let productCategory = db.Products.findAll();
            
            // con el Promise se hacen los dos pedidos juntos y despues (then)
            Promise.all([product, productCategory]).then(function([product, categories]){
                res.render('products/product_detail', {product : product, categories : categories});
            });            
        },
        update: function(req, res){
            let product = db.Products.findByPk(id);

            db.Products.update({
                name : req.body.nombre,
                descripcion : req.body.descripcion,
                categories : req.body.categories,
                horas : req.body.horas,
                apuntes: req.body.apuntes,
                ejercicios : req.body.ejercicios,
                precio : req.body.precio
            }, {
                where: {
                    id: req.params.id
                }
            });
            
            return res.redirect('/users/admin/administracion_home', {product: product});
        },
        delete: function (req, res){
            db.Products.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.redirect('/users/admin/administracion_home');
        }
    };