module.exports = function (req, res, next) {

	if (req.session.log) {
		return res.redirect('/home');
  }
    
  next();  
}