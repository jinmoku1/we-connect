/*
 * GET rendered view page.
 */

var session = require('../session');
var userConst = require('../constants').user;
var userDb = require('../db/user_db');

exports.index = function(req, res) {
	if (!session.isLoggedin(req)) {
		res.redirect('/account/login');
		return;
	}
	
	userDb.getBriefs(null, function(userBriefs) {
		console.log(userBriefs);
		res.render('index', {
			user : session.getSessionUser(req),
			userConst : userConst,
			userBriefs : userBriefs,
			title : 'WeConnect : CS',
			welcome : 'Welcome to WeConnect'
		});
	});
};

exports.about = function(req, res) {
	res.render('about', {
		user : session.getSessionUser(req),
		title : 'About Page',
		welcome : 'Welcome to WeConnect About'
	});
};