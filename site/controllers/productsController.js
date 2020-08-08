const productsData = require('./../models/Product');
const {check, validationResult, body} = require('express-validator');
const db = require('./../database/models');



module.exports = {
    createProduct: async (req,res) => {
        let categories = await db.Categories.findAll();
        
        return res.render('products/product_carga', {title: 'Cursala - Carga de Producto', categories, errors : {}, body : {}});
    },
    saveProduct: async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()){
            let categories = await db.Categories.findAll();
            return res.render('products/product_carga', {title: 'Cursala - Carga de Producto', categories, errors : errors.mapped(), body : req.body});
        };
        
        let product = {
            name : req.body.nombre,
            descripcion : req.body.descripcion,
            horas : req.body.horas,
            ejercicios : req.body.ejercicios,
            precio : req.body.precio,
            id_category : req.body.categories,
        };
        
        await db.Products.create(product)
        .then(product => {
            return res.redirect('/admin/listado/productos');
        }).catch(function(error){
            console.error(error);
            return res.redirect('/products/create');
        });
    },
    detailProduct: (req,res) => {  
        db.Products.findByPk(req.params.id, {
            include: ['category']
        }).then(product => {
            return res.render('products/detalle', {title: 'Cursala| detalle', product});
        }).catch(function(error){
            console.error(error);
            return res.redirect('/home');
        });
    },
    editProduct: async (req, res) => {
        let product = await db.Products.findByPk(req.params.id);
        let category = await db.Categories.findAll();
        
        Promise.all([product, category]).then(datos => {
            res.render('products/product_edit', {title: 'Cursala | Edicion', product:datos[0] , category:datos[1], errors : {}, body : {}});
        });
    },
    updateProduct: async (req, res) => {
        let product = await db.Products.findByPk(req.params.id);
        let category = await db.Categories.findAll();
       
        const errors = validationResult(req);
        
        if (!errors.isEmpty()){
            return res.render('products/product_edit', {title: 'Cursala | Edicion', product, category, errors : errors.mapped(), body : req.body});
        };            

            db.Products.update({
            name : req.body.nombre,
            descripcion : req.body.descripcion,
            horas : req.body.horas,
            ejercicios : req.body.ejercicios,
            precio : req.body.precio,
            id_category : req.body.categories,
        
        }, {where : { id: req.params.id }});

    
        return res.redirect('/admin/listado/productos');
    
        
},
deleteProduct: (req, res) => {
    db.Products.destroy({
        where: {
            id: req.params.id
        }
    });
        return res.redirect('/admin/listado/productos');
    
    },
    agregarcarrito: function(req, res) {
        db.Carrito.create({
            id_user: req.session.user.id,
            id_producto: req.params.id
        });
        res.redirect('/users/carrito');
    },
    eliminarproducto: function(req,res) {
        db.Carrito.destroy({
            where:{
                id_user: req.session.user.id,
                id_producto: req.body.producto_id
            }
        });
        res.redirect('/users/carrito');
    }
};