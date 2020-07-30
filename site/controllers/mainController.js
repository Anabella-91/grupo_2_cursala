const loginService = require('../services/loginService');
const db = require('../database/models');
let productRequest = require('../requests/products');



module.exports = {
	home: (req,res) => {
    let cursos = db.Products.findAll();
    let categorias = db.Categories.findAll();
    Promise.all([cursos, categorias])
    .then(function([cursos, categorias]){
            return res.render('home', { title: 'Cursala | Home', cursos:cursos, categorias:categorias}); 
    }) 
    },
    landing: (req,res) => {
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