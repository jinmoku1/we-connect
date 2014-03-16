/*
 * GET rendered view page.
 */

var session = require('../session');
var userConst = require('../constants').user;
var userDb = require('../db/user_db');

exports.index = function(req, res) {
	session.initiate(req, res);
	
	if (!session.isLoggedin()) {
		res.redirect('/account/login');
		return;
	}
	
	userDb.getBriefs(null, function(userBriefs) {
		console.log(userBriefs);
		res.render('index', {
			user : session.getSessionUser(),
			userConst : userConst,
			userBriefs : userBriefs,
			title : 'WeConnect : CS',
			welcome : 'Welcome to WeConnect'
		});
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