module.exports = function guestMid (req, res, next) {

	if (req.session.logeado) {
		return res.redirect('/perfil');
  }
    
  next();  
}