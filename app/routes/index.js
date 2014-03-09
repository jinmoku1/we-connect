
/*
 * GET rendered view page.
 */

var session = require('../session');

exports.index = function(req, res) {	
	if (!session.isLoggedIn(req)) {
		res.redirect('/account/login');
	}
	else {
		res.render('index',	{
			user : session.getSessionUser(req),
			title: 'WeConnect: Main',
			welcome: 'Hello, '
		});
	}
};

exports.about = function(req, res) {
	res.render('about',	{
		user : session.getSessionUser(req),
		title: 'About WeConnect',
		description: 'Some description about WeConnect should be placed here.',
		extra: 'Some extra stuffs?'
	});
};