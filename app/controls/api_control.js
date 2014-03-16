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
	var followeeName = req.params.followeeName;
	var user = session.getSessionUser();
	followOperation(followeeID, followeeName, user);
};

exports.addFollowee = function(followeeID, followeeName, following) {
	var followeeInfo = {
			"_id" : followeeID ,
			"name" : followeeName
	};
	// check for duplicates
	var list = following.followees;
	list.push(followeeInfo);
	following.followees = list;
	userDb.updateInfo(following._id, following, function(result){
		return result;
	});
};

function addFollowing(followeeID, followeeName, following) {
	var followee = null;
	userDb.getDetail(followeeID, function(result){
		followee = result;
		var followingInfo = {
				_id : following._id ,
				name : following.name
		};
		followee.followings.push(followingInfo);
		userDb.updateInfo(followee._id, followee, function(result){
			return result;
		});
	});
}