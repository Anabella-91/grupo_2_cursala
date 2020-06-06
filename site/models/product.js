const fs = require('fs');
const path = require('path');

const fileData = path.join(__dirname, '../products.json');

let productData = {
    findAll : function () {
        //verificando si existe el archivo
        if (!fs.existsSync(fileData)) {
            fs.writeFileSync(fileData, '');
        }
        //lectura de archivo
        let jsonFile = fs.readFileSync(fileData, 'utf8');
        
        //convirtiendo a objeto y validando si xisten datos
        let products = jsonFile.length === 0 ? [] : JSON.parse(jsonFile);
        return products;
    },
    create : function (product) {
        let array = this.findAll();
        //se le asigna el ultimo id
        product.id = this.lastID();
        //se agrega el producto
        array.push(product);
        //se convierte a json
        jsonData = JSON.stringify(array, null, " ");
        //escritura de archivo
        fs.writeFileSync(fileData, jsonData);
    },
    lastID : function (){
        let array = this.findAll();
        let lastId = 0;
        for (product of array) {
            if (lastId < product.id) {
                lastId = product.id;
            }
        }
        return lastId + 1;
    },
    findByPK : function(id) {
        return this.findAll().find(function(product) {
            return product.id == id;
        });
    },
    
    update : function(editProduct) {
        let array = this.findAll();
        
        //saco la peli anterior
        array = array.filter(function(product) {
            return product.id != editProduct.id ;
        });
        //pusheo la que me lelgo por parametro
        array.push(editProduct);
        
        //convertir a json ese array con la peli nueva
        jsonData = JSON.stringify(array, null, " ");
        //escribo
        fs.writeFileSync(fileData, jsonData);
    }
}

module.exports = productData;