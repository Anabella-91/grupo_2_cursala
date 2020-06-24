const db = require('../database/models');
const bcryptjs = require('bcryptjs');

module.exports = {
    generateToken : async (res, user) => {
        //TO-DO delete previous tokens

        let token = bcryptjs.hashSync(('_' + user.id + Date.now()), 2);
        let expires = new Date(Date.now() + 1000*60*60*24*90);
        await db.Token.create({ userId : user.id, token : token, expiresAt : expires })
        res.cookie('_rememberUserToken_', token,  {expires: expires});
    },
    getUserToken : (user) => {

    },
    checkUserToken : (user) => {

    },
    verifyToken : (token) => {

    },
    deleteToken : (token) => {

    }
}