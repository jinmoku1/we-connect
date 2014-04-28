/*
 * GET rendered view page.
 */

var session = require('../session');
var userConst = require('../constants').user;
var anncConst = require('../constants').annc;
var anncTypes = require('../constants').anncTypes;
var userConstDev = require('../constants').developers;
var userDb = require('../db/user_db');
var anncDb = require('../db/annc_db');

exports.index = function(req, res) {
	if (!session.isLoggedin(req)) {
		res.redirect('/account/login');
		return;
	}
	
	var user = session.getSessionUser(req);
	if (user.userType==userConst.TYPE_ADMIN){
		anncDb.getAnncBriefByStatus(anncConst.PENDING,anncConst.INCREASING,function(anncBriefs) {
			res.render('admin/anncList', {
				user : user,
				anncBriefs : anncBriefs,
				title : 'WeConnect Admin Page'
			});
		});
	}
	else {
		userDb.getBriefs(null, function(userBriefs) {
			anncDb.getAnncBriefByStatus(anncConst.ACCEPTED,anncConst.DECREASING,function(anncBriefs) {
				anncDb.AnnRecSystem(user,function(recDetails) {
					anncDb.followingAnnRecSystem(user,function(followBriefs) {
						res.render('index', {
							user : user,
							userConst : userConst,
							userBriefs : userBriefs,
							anncBriefs : anncBriefs,
							recDetails : recDetails,
							followBriefs : followBriefs,
							title : 'WeConnect : CS',
							welcome : 'Welcome to WeConnect'
						});
					});
				});
			});
		});
	}
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
