const db = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        let users = await db.Users.findAll()
        .then(users => {
            for(let i=0; i < users.length; i++){
                users[i].setDataValue('endpoint','/api/users/' + users[i].id);
            };

            let respuesta ={
            meta: {status:200, total: users.length, url: '/api/users'},
            data: users
            };
            
            res.send(respuesta); 
        })  

    },
    addcart: (req, res) => {
        
    }
    
};