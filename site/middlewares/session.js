const loginService = require('../services/loginService');


module.exports = (req, res, next) => {

    res.locals.user = null;
    res.locals.log = false;

    if (req.session.log) {
        res.locals.log = true;
        res.locals.user = req.session.user;

        loginService.restartSessionTime(req);

    }

    next();
}