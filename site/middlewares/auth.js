module.exports = function authMid (req, res, next) {

    if (!req.session.log) {
		return res.redirect('/login');
  }

    next();
}
