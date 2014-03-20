/**
 * 
 */

var userDb = require('./db/user_db');
var ObjectID = require('mongodb').ObjectID;

exports.setSessionUser = function(req, userDetail) {
	if (userDetail != null) {
		req.session.user = JSON.stringify(userDetail);
	}
	else {
		req.session.user = null;
	}
};

exports.getSessionUser = function(req) {
	if (req.session.user != null) {
		var sessionUser = JSON.parse(req.session.user);
		
		// build ObjectID
		sessionUser._id = ObjectID.createFromHexString(sessionUser._id);
		sessionUser.briefId = ObjectID.createFromHexString(sessionUser.briefId);
		
		for (var i in sessionUser.followings) {
			sessionUser.followings[i] = ObjectID.createFromHexString(sessionUser.followings[i]);
		}
		for (var i in sessionUser.followees) {
			sessionUser.followees[i] = ObjectID.createFromHexString(sessionUser.followees[i]);
		}
		
		return sessionUser;
	}
	else {
		return null;
	}
};

exports.isLoggedin = function(req) {
	return (exports.getSessionUser(req) != null);
};

exports.login = function(req, netId, password, callback) {
	userDb.isValidLogin(netId, password, function(userDetail) {
		if(userDetail) {
			exports.setSessionUser(req, userDetail);
			callback(true);
		}
		else {
			callback(false);
		}
	});
};

exports.logout = function(req) {
	exports.setSessionUser(req, null);
};