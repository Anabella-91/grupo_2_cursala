const fs = require('fs');
const path = require('path');

const fileData = path.join(__dirname, '../data/users.json');

let userData = {
    findAll: function(){
    //verificando si existe el archivo
    if (!fs.existsSync(fileData)) {
        fs.writeFileSync(fileData, '');
    }
    //lectura de archivo
    let jsonFile = fs.readFileSync(fileData, 'utf8');
    
    //convirtiendo a objeto y validando si xisten datos
    let users = jsonFile.length === 0 ? [] : JSON.parse(jsonFile);
    return users
    },
    createUser : function (user) {
        let array = this.findAll();
        //se le asigna el ultimo id
        user.id = this.lastID();
        //se agrega el producto
        array.push(user);
        //se convierte a json
        jsonData = JSON.stringify(array, null, " ");
        //escritura de archivo
        fs.writeFileSync(fileData, jsonData);
    },
    lastID : function (){
        let array = this.findAll();
        let lastId = 0;
        for (user of array) {
            if (lastId < user.id) {
                lastId = user.id;
            }
        }
        return lastId + 1;
    }
};

module.exports = userData;
