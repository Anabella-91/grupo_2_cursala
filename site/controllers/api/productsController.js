const db = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        let cursos = await db.Products.findAll()
        .then(cursos => {
            for(let i=0; i < cursos.length; i++){
                cursos[i].setDataValue('endpoint','/api/products/' + cursos[i].id);
            };

            let respuesta ={
            meta: {status:200, total: cursos.length, url: '/api/products/list'},
            data: cursos
            };
            
            res.send(respuesta); 
        })  

    },
    paginatedProducts: async (req, res) => {
        let products = db.Products.findAll();
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedResults = {};

        // Para que no aparezca next page si no hay cursos en la base
        if(endIndex < products.length){
            paginatedResults.next = {
                page: page + 1,
                limit: limit
            };
        };

        // Para que no aparezca previous page 0
        if(startIndex > 0){
            paginatedResults.previous = {
                page: page - 1,
                limit: limit
            };
        };

        paginatedResults.paginatedResults = products.slice(startIndex, endIndex);
        res.json(paginatedResults);
    }
    
};

