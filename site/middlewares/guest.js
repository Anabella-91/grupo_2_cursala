module.exports = function (req, res, next) {
console.log(req.session.id);
	if (req.session.log) {
		return res.redirect('/home');
  }
    
  next();  
}