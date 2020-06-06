const productsData = require('./../models/product');
const {check, validationResult, body} = require('express-validator');

module.exports = {
    list: function(req, res){ 
        let products = productsData.findAll();       
        return res.send(products);
    },
    formCreate:function (req,res){
        res.render('products/product_carga', { title: 'Cursala - Carga de Producto'});
        
    },
    save: function (req, res){
        let product = {
            id: req.params.id,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            horas : req.body.horas,
            apuntes: req.body.apuntes,
            ejercicios : req.body.ejercicios,
            precio : req.body.precio
        }         
        productsData.create(product);
        return res.redirect('/');
    },
    detail:function (req,res){  
        let products = productsData.findAll();       
        res.render('products/product_detail', { products });
    },
    edit : function (req, res){
        let products = productsData.findAll();       
        let product = products.find(p => p.id === parseInt(req.params.id));
        
        res.render('products/product_detail', {products : product});
        
    },
    update: function(req, res){
        const productId = req.params.id;
        let product = productsData.findByPK(productId);
        
        product.nombre = req.body.nombre;
        product.descripcion = req.body.descripcion;
        product.horas = req.body.horas;
        product.apuntes = req.body.apuntes;
        product.ejercicios = req.body.ejercicios;
        product.precio = req.body.precio;
        
        productsData.update(product);
        
        return res.redirect('/');
    },
    delete: function (req, res){
        const { id } = req.params.id;
        
        products.forEach((product, i) => {
            if(product.id == id) {
                products.splice(i, 1);
            }
        });
        
        return res.redirect('/');
    }
};