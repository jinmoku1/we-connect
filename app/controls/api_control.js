/*
 * GET (non-view) resources
 */

var session = require('../session');
var userDb = require('../db/user_db');


exports.sample = function(req, res){
	res.send("Hello World!");
};

exports.follow = function(req, res) {
	var followeeID = req.params.followeeID;
	var user = session.getSessionUser();
	followOperation(followeeID, user, function(result) {
		res.send(result);
	});
};

exports.addFollowee = function(followeeID, following, callback) {
	var index = -1;
	for (var i in following.followees) {
		if (following.followees[i].equals(followeeID)){
			index = i;
			break;
		}
	}

	if (index < 0){
		following.followees.push(followeeID);
	} else {
		following.followees.splice(index, 1);
	}
	userDb.updateInfo(following._id, following, function(result){
		callback(result);
	});
};

exports.addFollowing = function(followeeID, following, callback) {
	console.log(followeeID);
	userDb.getDetail(followeeID, function(followee){
		appendFollowing(followee, following, function(followee){
			userDb.updateInfo(followee._id, followee, function(result){
				callback(result);
			});
		});
	});
};

function appendFollowing(followee, following, callback){
	followee.followings.push(following._id);
	callback(followee);
}