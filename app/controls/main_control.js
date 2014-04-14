/*
 * GET rendered view page.
 */

var session = require('../session');
var userConst = require('../constants').user;
var anncTypes = require('../constants').anncTypes;
var userConstDev = require('../constants').developers;
var userDb = require('../db/user_db');
var anncDb = require('../db/annc_db');

exports.index = function(req, res) {
	if (!session.isLoggedin(req)) {
		res.redirect('/account/login');
		return;
	}
	
	userDb.getBriefs(null, function(userBriefs) {
		anncDb.getBriefs(function(anncBriefs) {
			res.render('index', {
				user : session.getSessionUser(req),
				userConst : userConst,
				userBriefs : userBriefs,
				anncBriefs : anncBriefs,
				title : 'WeConnect : CS',
				welcome : 'Welcome to WeConnect'
			});
		});
	});
};

exports.about = function(req, res) {
	res.render('about', {
		user : session.getSessionUser(req),
		developer : userConstDev,
		test: [1,2,3],
		title : 'About Us',
		welcome : 'Welcome to WeConnect About'
	});
};
