/*
 * GET rendered view page.
 */

var session = require('../session');

exports.index = function(req, res) {
	session.initiate(req, res);
	
	if (!session.isLoggedin()) {
		res.redirect('/account/login');
		return;
	}
	
	res.render('index', {
		user : session.getSessionUser(),
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