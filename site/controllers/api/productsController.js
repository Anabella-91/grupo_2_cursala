const db = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        let cursos = await db.Products.findAll()
        .then(cursos => {
            for(let i=0; i < cursos.length; i++){
                cursos[i].setDataValue('endpoint','/api/products/' + cursos[i].id);
            };

            let respuesta ={
            meta: {status:200, total: cursos.length, url: '/api/products'},
            data: cursos
            };
            
            res.send(respuesta); 
        })  

    },
    
};

