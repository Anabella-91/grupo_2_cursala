const loginService = require('../services/loginService');
const db = require('../database/models');
let productRequest = require('../requests/products');

module.exports = {
	home: (req,res) => {
    let cursos = db.Products.findAll();
    let categorias = db.Categories.findAll({include: ['products']});
    Promise.all([cursos, categorias])
    .then(function([cursos, categorias]){
            return res.render('home', { title: 'Cursala | Home', categorias:categorias}); 
    }) 
    },
    landing: (req,res) => {
        res.render('landing', { title: 'Cursala | Landing'});
    },
    mensaje: function (req, res){
        db.Mensaje.create({
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
            asunto: req.body.asunto,
            medio_contacto: req.body.canalContacto,
            mensaje: req.body.mensaje
        })
        res.redirect('/home');
    }
};