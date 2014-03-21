/**
 * New node file
 */
var constants = require('../constants');
var userConst = constants.user;
var userDb = require('../db/user_db');
var session = require('../session');
var ObjectID = require('mongodb').ObjectID;

exports.profile = function(req, res) {
	var _id = ObjectID.createFromHexString(req.params.id);
	userDb.getDetail(_id, function(userDetail) {
		res.render('embedded/profile', {
			userConst : userConst,
			userDetail : userDetail
		});
	});
};

exports.followees = function(req, res) {
	userDb.getBriefs(null, function(allBriefs) {
		var sessionUser = session.getSessionUser(req);
		
		var userBriefs = [];
		for (var i in allBriefs) {
			for (var j in sessionUser.followees) {
				if (allBriefs[i].detailId.equals(sessionUser.followees[j])) {
					userBriefs.push(allBriefs[i]);
				}
			}
		}
		
		res.render('embedded/follows', {
			userBriefs : userBriefs,
			isFollowees : true,
		});
	});
};

exports.followings = function(req, res) {
	userDb.getBriefs(null, function(allBriefs) {
		var sessionUser = session.getSessionUser(req);
		
		var userBriefs = [];
		for (var i in allBriefs) {
			for (var j in sessionUser.followings) {
				if (allBriefs[i].detailId.equals(sessionUser.followings[j])) {
					userBriefs.push(allBriefs[i]);
				}
			}
		}
		
		res.render('embedded/follows', {
			userBriefs : userBriefs,
			isFollowees : false,
		});
	});
};