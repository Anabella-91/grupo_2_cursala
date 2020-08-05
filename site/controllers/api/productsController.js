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
    paginatedProducts: (req, res) => {
        let products = [
            {id: 1, name: 'Product 1'},
            {id: 2, name: 'Product 2'},
            {id: 3, name: 'Product 3'},
            {id: 4, name: 'Product 4'},
            {id: 5, name: 'Product 5'},
            {id: 6, name: 'Product 6'},
            {id: 7, name: 'Product 7'},
            {id: 8, name: 'Product 8'},
            {id: 9, name: 'Product 9'},
            {id: 10, name: 'Product 10'},

        ];
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedResults = {};

        // Para que no aparezca next page si no hay users en la base
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

