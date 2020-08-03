module.exports = (req, res, next) => {
    let user = req.session.user;

    res.locals.log = false;

    if (res.locals.log != null) {
        res.locals.log = user;
    }
    next();
};