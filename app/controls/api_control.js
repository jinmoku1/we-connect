/**
 * A module for managing follower-following relationship. This module controls all user interactions involving
 * following and unfollowing actions.
 * @module controls/adminControl
 * @requires module:session
 * @requires module:db/userDb
 */

var session = require('../session');
var userDb = require('../db/user_db');
var ObjectID = require('mongodb').ObjectID;

/**
 * This method handle's the user's request to follow another user.
 * It adds the user being followed to this user's list of followings and
 * adds this user to the other user's list of followers.
 * The request is returned with a response including the userDetail object.
 * @param {Object} req A request object
 * @param {Object} res A response object
 */
exports.follow = function(req, res) {
	var followingId = ObjectID.createFromHexString(req.body.id);
	var user = session.getSessionUser(req);
	exports.addFollowing(followingId, user, function(result) {
		exports.addFollower(followingId, user, function(result) {
			if (result) {
				session.setSessionUser(req, user);
				res.send(user);
			}
		});
	});
};

/**
 * @access private
 * This method is a helper function to exports.follow. It addes the user with followingID to the list of the user's
 * followings list
 * @param {String} followingID	The mongoDB objectID of the user being followed
 * @param {Object} follower 	The userDetail object of the user folliwng
 * @callback callback			The callback to 
 */
exports.addFollowing = function(followingID, follower, callback) {
	var index = -1;
	for (var i in follower.followings) {
		if (followingID.equals(follower.followings[i])) {
			index = i;
			break;
		}
	}

	if (index < 0){
		follower.followings.push(followingID);
	} else {
		follower.followings.splice(index, 1);
	}
	
	userDb.updateInfo(follower._id, follower, function(result) {
		callback(result);
	});
};

/**
 * @access private
 * This method is a helper function to exports.follow. It addes the follower to the list of followers of the 
 * user being followed.
 * @param {String} followingID	The mongoDB objectID of the user being followed
 * @param {Object} follower 	The userDetail object of the user following
 */
exports.addFollower = function(followingID, follower, callback) {
	userDb.getDetail(followingID, function(following){
		appendFollower(following, follower, function(following){
			userDb.updateInfo(following._id, following, function(result){
				callback(result);
			});
		});
	});
};

/**
 * @access private
 * This method is a helper function to exports.addFollower. It addes the follower to the list of followers of the 
 * user being followed.
 * @param {String} following	The userDetail object of the user being followed
 * @param {Object} follower 	The userDetail object of the user following
 */
function appendFollower(following, follower, callback){
	var index = -1;
	for (var i in following.followers) {
		if (following.followers[i].equals(follower._id)){
			index = i;
			break;
		}
	}
	if (index < 0){
		following.followers.push(follower._id);
	} else {
		following.followers.splice(index, 1);
	}
	callback(following);
}