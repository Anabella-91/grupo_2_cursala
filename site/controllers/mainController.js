const fs = require('fs');

module.exports = {
	home:function (req,res, next){
        res.render('home', { title: 'Cursala Home'});   
    },
    landing:function (req,res,next){
        res.render('landing', { title: 'Cursala Landing'});
    },
    mensaje: function (req, res, next){
        let mensaje = {
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            asunto: req.body.asunto,
            canalContacto: req.body.canalContacto,
            mensaje: req.body.mensaje
        };
        let mensajeJSON = JSON.stringify(mensaje);
        fs.appendFileSync("mensajes.json", mensajeJSON);
        res.redirect('/');
    }
};