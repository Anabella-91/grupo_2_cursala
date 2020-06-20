module.exports = (req, res, next) => {
    if (req.cookies['remember']) {
        req.session.log = true;
        req.session.userEmail = req.cookies['remember'];
    }

    next();
}