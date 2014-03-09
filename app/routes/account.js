/**
 * New node file
 */

var session = require('../session');

exports.login = function(req, res) {
	var error = null;
	if (req.method == 'POST') {
		var netId = req.body.netID;
		var password = req.body.password;
		
		if (session.logIn(req, netId, password)) {
			res.redirect('/');
		}
		else {
			error = "Failed to Log-in: Please check your netid and password.";
		}
	}
	
	res.render('account/login',	{
		user : session.getSessionUser(req),
		title : 'WeConnect: Main',
		welcome : 'Hello, ',
		error : error
	});
};

exports.logout = function(req, res) {
	session.logOut(req);
	res.redirect('/');
};