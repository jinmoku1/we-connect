/**
 * This is the handler for user account and login sessions. Validation for user
 * sessions is done here.
 * 
 * @module session
 * @requires module:db/user_db
 * @requires module:mongodb
 */

var userDb = require('./db/user_db');
var ObjectID = require('mongodb').ObjectID;

/**
 * This function modifies user data in session
 * 
 * @param {object} req A request object
 * @param {object} userDetail User data object
 */
exports.setSessionUser = function(req, userDetail) {
	if (userDetail != null) {
		req.session.user = JSON.stringify(userDetail);
	}
	else {
		req.session.user = null;
	}
};

/**
 * This function queries user sessions already active to reduce
 * DB queries to find active user sessions
 * 
 * @param {object} req A request object
 */
exports.getSessionUser = function(req) {
	if (req.session.user != null) {
		var sessionUser = JSON.parse(req.session.user);
		
		// build ObjectID
		sessionUser._id = ObjectID.createFromHexString(sessionUser._id);
		sessionUser.briefId = ObjectID.createFromHexString(sessionUser.briefId);
		//console.log(sessionUser);
		for (var i in sessionUser.followers) {
			sessionUser.followers[i] = ObjectID.createFromHexString(sessionUser.followers[i]);
		}
		for (var i in sessionUser.followings) {
			sessionUser.followings[i] = ObjectID.createFromHexString(sessionUser.followings[i]);
		}
		
		return sessionUser;
	}
	else {
		return null;
	}
};
/**
 * This function checks if the current session is still logged in
 * 
 * @param {object} req A request object
 */
exports.isLoggedin = function(req) {
	return (exports.getSessionUser(req) != null);
};

/**
 * This function checks for validates user login information and
 * logs the user into the application
 * 
 * @param {object} req A request object
 * @param {string} netID User netID 
 * @param {string} password User password
 * @param {object} callback A callback object
 */
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

/**
 * This function logs the user out of the session
 * 
 * @param {object} req A request object
 */
exports.logout = function(req) {
	exports.setSessionUser(req, null);
};