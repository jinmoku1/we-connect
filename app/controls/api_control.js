/*
 * GET (non-view) resources
 */

var session = require('../session');
var userDb = require('../db/user_db');
var ObjectID = require('mongodb').ObjectID;

exports.sample = function(req, res) {
	res.send('sample');
};

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

exports.addFollower = function(followingID, follower, callback) {
	userDb.getDetail(followingID, function(following){
		appendFollower(following, follower, function(following){
			userDb.updateInfo(following._id, following, function(result){
				callback(result);
			});
		});
	});
};

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