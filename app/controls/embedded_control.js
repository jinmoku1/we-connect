/**
 * New node file
 */
var constants = require('../constants');
var userConst = constants.user;
var userDb = require('../db/user_db');
var session = require('../session');
var ObjectID = require('mongodb').ObjectID;

exports.profileModal = function(req, res) {
	var _id = ObjectID.createFromHexString(req.params.id);
	userDb.getDetail(_id, function(userDetail) {
		res.render('profile/modal', {
			userConst: userConst,
			userDetail : userDetail
		});
	});
};

exports.followeeListModal = function(req, res) {
	var user = session.getSessionUser(req);
	// DB query: get the briefs of all followees
	
	userDb.getDetail(user._id, function(userDetail) {
		res.render('profile/followeeList', {
			userBriefs : result
		});
	});
};