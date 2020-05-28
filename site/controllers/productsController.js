const _ = require('underscore');
const products = require('../products.json');

module.exports = {
    products: function (req, res){
        res.json(products);
    },
    create:function (req,res){
        
        res.render('products/product_carga', { title: 'Cursala - Carga de Producto'});
    },
    detail:function (req,res){  
        res.render('products/product_detail', { title: 'Cursala - Detalle de Producto'});
    },
    create_form: function (req, res){
        const id = products.length + 1;
        const { name, description, image, category, price } = req.body;
        const newProduct = { id, ...req.body };
        if (id && name && description && image && category && price) {
            products.push(newProduct);
            res.json(products);
        } else {
            res.status(500).json({error: 'Hubo un problema, vuelve a intentarlo.'});
        }
    },
    edit : function (req, res){
        res.render('products/product_edit', { title: 'Cursala - Edicion de Producto'});
    },
    edit_form: function(req, res){ // a donde se envia el formulario
        const { id } = req.params;
        const { name, description, image, category, price } = req.body;
        if (id && name && description && image && category && price) {
            _.each(products, (product, i) => {
                if(product.id === id) {
                    product.name = name;
                    product.description = description;
                    product.image = image;
                    product.category = category;
                    product.price = price;
                }
            });
            res.json(products);
        } else {
            res.status(500).json({error: 'Hubo un problema, vuelve a intentarlo.'});
        }
    },
    delete: function (req, res){
        const {id} = req.params;
        if (id) {
            _.each(products, (product, i) => {
                if (product.id == id) {
                    products.splice(i, 1);
                }
            });
            res.json(products);
        }
    }
};