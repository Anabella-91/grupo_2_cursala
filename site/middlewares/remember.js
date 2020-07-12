module.exports = (req, res, next) => {
    if (req.cookies['remember']) {
        req.session.log = true;
        req.session.email = req.cookies['remember'];
    }

    next();
}