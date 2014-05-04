/**
 * A module for all  modal interactions. This module deals with all requests coming from user interactions inside
 * modals.
 * @module controls/embeddedControl
 * @requires module:session
 * @requires module:db/userDb
 * @requires module:contants
 */
var constants = require('../constants');
var userConst = constants.user;
var userDb = require('../db/user_db');
var session = require('../session');
var ObjectID = require('mongodb').ObjectID;

/**
 * This method handles the user's request for viewing another user's profile inside a modal.
 * The request is returned with a response containing the requested user's profile. 
 * @param {Object} req A request object
 * @param {Object} res A response object
 */
exports.profile = function(req, res) {
	var _id = ObjectID.createFromHexString(req.params.id);
	userDb.getDetail(_id, function(userDetail) {
		res.render('embedded/profile', {
			userConst : userConst,
			userDetail : userDetail
		});
	});
};

/**
 * This method handles the user request for viewing the list of his followings inside a modal.
 * "Followings" are defined as other users who are followed by this user.
 * The request is returned with a response containing the list of the brief profiles of all the followings. 
 * @param {Object} req A request object
 * @param {Object} res A response object
 */
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
			isFollowings : true,
		});
	});
};

/**
 * This method handles the user request for viewing the list of his followers inside a modal.
 * "Followers" are defined as other users who follow this user.
 * The request is returned with a response containing the list of the brief profiles of all the followers. 
 * @param {Object} req A request object
 * @param {Object} res A response object
 */
exports.followers = function(req, res) {
	userDb.getBriefs(null, function(allBriefs) {
		var sessionUser = session.getSessionUser(req);
		
		var userBriefs = [];
		for (var i in allBriefs) {
			for (var j in sessionUser.followers) {
				if (allBriefs[i].detailId.equals(sessionUser.followers[j])) {
					userBriefs.push(allBriefs[i]);
				}
			}
		}
		
		res.render('embedded/follows', {
			userBriefs : userBriefs,
			isFollowings : false,
		});
	});
};

/**
 * This method generates a list of all users recommended to this user by the recommendation
 * system.
 * The request is returned with a response containing the list of the brief profiles of all the recommended users. 
 * @param {Object} req A request object
 * @param {Object} res A response object
 */
exports.suggestedUsers = function(req, res) {
	var sessionUser = session.getSessionUser(req);
	
	userDb.userRecsystem(sessionUser, function(userBriefs) {
		res.render('embedded/suggestedusers', {
			userBriefs : userBriefs
		});
	});
}