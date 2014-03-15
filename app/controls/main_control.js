/*
 * GET rendered view page.
 */

var session = require('../session');
var userConst = require('../constants').user;

exports.index = function(req, res) {
	session.initiate(req, res);
	
	if (!session.isLoggedin()) {
		res.redirect('/account/login');
		return;
	}
	
	res.render('index', {
		user : session.getSessionUsers(),
		userConst : userConst,
		title : 'WeConnect : CS',
		welcome : 'Welcome to WeConnect'
	});
};

exports.about = function(req, res) {
	session.initiate(req, res);
	
	res.render('about', {
		user : null,
		title : 'About Page',
		welcome : 'Welcome to WeConnect About'
	});
};