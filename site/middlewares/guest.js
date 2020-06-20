module.exports = function guestMid (req, res, next) {

	if (req.session.log) {
		return res.redirect('/users/perfil');
  }
    
  next();  
}