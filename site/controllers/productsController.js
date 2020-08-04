const productsData = require('./../models/Product');
const {check, validationResult, body} = require('express-validator');
const db = require('./../database/models');

module.exports = {
    createProduct: async (req,res) => {
        let categories = await db.Categories.findAll();
        
        return res.render('products/product_carga', {title: 'Cursala - Carga de Producto', categories:categories, errors : {}, body : {}});
    },
    saveProduct: (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()){
            return res.render('products/product_carga', {errors : errors.mapped(), body : req.body});
        };            
        
        let product = {
            name : req.body.nombre,
            descripcion : req.body.descripcion,
            horas : req.body.horas,
            ejercicios : req.body.ejercicios,
            precio : req.body.precio,
            id_category : req.body.categories,
        };
        
        db.Products.create(product)
        .then(product => {
            return res.redirect('/home');
        }).catch(function(error){
            console.error(error);
            return res.redirect('/products/create');
        });
        
    },
    detailProduct: (req,res) => {  
        db.Products.findByPk(req.params.id, {
            include: ['category']
        }).then(product => {
            return res.render('products/detalle', {product});
        }).catch(function(error){
            console.error(error);
            return res.redirect('/home');
        });
    },
    editProduct: (req, res) => {
        let product = db.Products.findByPk(req.params.id);
        let category = db.Categories.findAll();
        
        Promise.all([product, category]).then(datos => {
            res.render('products/product_edit', {product:datos[0] , category:datos[1], errors : {}, body : {}});
        })
    },
    updateProduct: (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()){
            return res.render('products/product_edit', {errors : errors.mapped(), body : req.body});
        };            

            db.Products.update({
            name : req.body.nombre,
            descripcion : req.body.descripcion,
            horas : req.body.horas,
            ejercicios : req.body.ejercicios,
            precio : req.body.precio,
            id_category : req.body.categories,
        
        }, {where : { id: req.params.id }});

    
        return res.redirect('/home');
    
        
},
deleteProduct: (req, res) => {
    db.Products.destroy({
        where: {
            id: req.params.id
        }
    });
        return res.redirect('/home');
    
    }
};