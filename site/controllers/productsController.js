const _ = require('underscore');
const fs = require('fs');
const json_products = fs.readFileSync('./products.json', 'utf-8');
let products = JSON.parse(json_products);

module.exports = {
    products: function (req, res){
        res.render('/', {products: products});
    },
    create:function (req,res){
        
        res.render('products/product_carga', { title: 'Cursala - Carga de Producto'});
    },
    detail:function (req,res){  
        res.render('products/product_detail', { title: 'Cursala - Detalle de Producto'});
    },
    create_form: function (req, res){
        const { nombre, descripcion, horas, apuntes, precio } = req.body;
        
        if (!nombre || !descripcion || !horas || !apuntes || !precio) {
            res.status(400).send("Debes completar todos los campos");
            return;
        }
        const id = products.length + 1;
        const newProduct = { id, ...req.body };

        // agregando nuevo producto
        products.push(newProduct);
        
        // guardando en archivo json
        const json_products = JSON.stringify(products);
        fs.writeFileSync('./products.json', json_products, 'utf-8');
        
        return res.redirect('/');
    },
    edit : function (req, res){
        
        res.render('products/product_detail', { title: 'Cursala - Edicion de Producto'});
        
    },
    edit_form: function(req, res){
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
        //validar que exista el id que me pasaron por la url
        
        res.redirect('/products');
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