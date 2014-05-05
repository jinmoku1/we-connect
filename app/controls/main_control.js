/**
 * This is the main controller which handles the index page and the about page.
 * 
 * @module controls/mainControl
 * @requires module:session
 * @requires module:constants
 * @requires module:db/user_db
 */

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

/**
 * The purpose of this function is to create the Main page depending on the user login status</br>
 * The function checks whether the usertype is Admin or a standard user</br>
 * </br>
 * usertype: Admin - generate the Admin page for approving announcement posts</br>
 * usertype: standard - generate the main profile page dynamically
 * by populating with data using the recommendation system and DB calls</br>
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
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
						userDb.getDetail(user._id, function(updatedUser) {
							session.setSessionUser(req, updatedUser);
							res.render('index', {
								user : updatedUser,
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
		});
	}
};

/**
 * This function generates the data format for the About page where developer information is displayed
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.about = function(req, res) {
	res.render('about', {
		user : session.getSessionUser(req),
		developer : userConstDev,
		test: [1,2,3],
		title : 'About Us',
		welcome : 'Welcome to WeConnect About'
	});
};
