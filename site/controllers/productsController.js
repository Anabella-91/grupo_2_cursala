const fs = require('fs');
const json_products = fs.readFileSync('./products.json', 'utf-8');
let products = JSON.parse(json_products);

module.exports = {
    list: function(req, res){
        res.json(products);
    },
    create:function (req,res){
        res.render('products/product_carga', { title: 'Cursala - Carga de Producto'});
        
    },
    detail:function (req,res){  
        res.render('products/product_detail', { title: 'Cursala - Detalle de Producto'});
    },
    create_form: function (req, res){
        let { nombre, descripcion, horas, apuntes, precio } = req.body;
        
        if (!nombre || !descripcion || !horas || !apuntes || !precio) {
            res.status(400).send("Debes completar todos los campos");
            return;
        }
        let id = products.length + 1;
        let newProduct = { id, ...req.body };
        
        // agregando nuevo producto
        products.push(newProduct);
        
        // guardando en archivo json
        let json_products = JSON.stringify(products);
        fs.writeFileSync('./products.json', json_products, 'utf-8');
        
        return res.json(products);
    },
    edit : function (req, res){
        
        res.render('products/product_detail', { title: 'Cursala - Edicion de Producto'});
        
    },
    edit_form: function(req, res){
        const { id } = req.params;
        let { nombre, descripcion, horas, apuntes, precio } = req.body;
        
        products.forEach((product, i) => {
            if (product.id == id) {
                product.nombre = nombre;
                product.descripcion = descripcion;
                product.horas = horas;
                product.apuntes = apuntes;
                product.precio = precio;

            }
        });
        res.json('Se guardo exitosamente');
    },
    delete: function (req, res){
        const { id } = req.params;
        
        products.forEach((product, i) => {
            if(product.id == id) {
                products.splice(i, 1);
            }
        });
        res.json('Se ha eliminado el producto correctamente');
        
        
    }
};