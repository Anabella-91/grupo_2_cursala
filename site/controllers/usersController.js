const { check, validationResult, body} = require('express-validator');

module.exports = {
    users: function(req, res){
        res.json(users);
    },
	registro:function (req,res){
        res.render('registro', { title: 'Cursala Registro'});
	   
    },
    registroUser: function(req, res){
        let validation = validationResult(req);
        
    },
    login:function (req,res){
        res.render('login', { title: 'Cursala Login'});
	   
    },
    processLogin: function(req, res){
        let newUser;
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let usersJson = fs.readFileSync('../users.json', {encoding: 'utf-8'});
            let users;
            if(usersJson == ''){
                users = [];
            }else{
                users = JSON.parse(usersJson);
            }

            for(let i=0;i<users.length;i++){
                if(users[i].email == req.body.email){
                    if(bcrypt.compareSync(req.body.password, users[i].password)){
                        newUser = users[i];
                        break;
                    }
                }
            }
            if(newUser == undefined){
                return res.render('/login', {errors:[
                    {msg: 'Credenciales invalidas'}
                ]});
            }

            req.session.users = newUser;
            res.render('Sucess');

        }else{
            return res.render('login', { errors:errors.errors});
        }
    },
    carrito:function (req,res){
		
        res.render('carrito', { title: 'Cursala Carrito'});
	   
    }
};