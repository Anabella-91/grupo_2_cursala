const db = require('../database/models');

module.exports = {
    mostrar: function (req, res) {
        let mensajes = db.Mensaje.findAll()
        .then(function(mensajes){
            return res.render('admin_mensajes', {title: 'Admin | mensajes', mensajes: mensajes});
        })
    }
};