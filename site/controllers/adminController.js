const db = require('../database/models');

module.exports = {
    mostrar: function (req, res) {
        let mensajes = db.Mensaje.findAll({
            order: [ ['id', 'DESC'] ],
            limit: 10
        })
        .then(function(mensajes){
            return res.render('admin_mensajes', {title: 'Admin | mensajes', mensajes: mensajes});
        })
    },
    productos: function(req, res) {
        let cursos = db.Products.findAll({
            order: [ ['name', 'ASC'] ]
        })
        .then(function(cursos){
            return res.render('listProducts', {title: 'Cursala | productos', cursos:cursos})
        })
    }
};