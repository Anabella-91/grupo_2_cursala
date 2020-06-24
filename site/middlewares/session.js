const loginService = require('../services/loginService');


module.exports = (req, res, next) => {

    res.locals.log = false;

    if (req.session.log) {
        res.locals.log = true;
        loginService.restartSessionTime(req);

    }

    next();
}