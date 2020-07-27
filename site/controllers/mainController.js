 db = require('../database/models');

module.exports = {
	home:function (req,res, next){
        let cursos = db.Products.findAll();
        let categorias = db.Categories.findAll();
        Promise.all([cursos, categorias])
        .then(function([cursos, categorias]){
            res.render('home', { title: 'Cursala | Home', cursos:cursos, categorias:categorias}); 
        })  
    },
    landing:function (req,res,next){
        res.render('landing', { title: 'Cursala | Landing'});
    },
    mensaje: function (req, res, next){
        let mensajeForm = {
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            asunto: req.body.asunto,
            canalContacto: req.body.canalContacto,
            mensaje: req.body.mensaje
        };
        let mensajes = [];
        let archivoMensajes = fs.readFileSync("mensajes.json", {encoding: "utf-8"});
        if (archivoMensajes != ""){
            mensajes = JSON.parse(archivoMensajes);
        } 
        mensajes.push(mensajeForm);
        let mensajeJSON = JSON.stringify(mensajes);
        fs.writeFileSync("mensajes.json", mensajeJSON);
        
        res.redirect('/');
    }
};