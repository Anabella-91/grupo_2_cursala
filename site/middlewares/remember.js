module.exports = (req, res, next) => {
    if (req.cookies.remember) {
        res.locals.log = req.cookies.remember;
        req.session.user = req.cookies.remember;
    }

    next();
}