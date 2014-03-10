/**
 * 
 */

var userDb = require('./db/user_db');
var session = null;

exports.initiate = function(req) {
	if (session == null) {
		session = req.session;
	}
};

exports.isLoggedin = function() {
	return session.loggedin == true;
};

exports.login = function(netId, password, callback) {
	userDb.isValidLogin(netId, password, function(userDetail) {
		if(userDetail) {
			session.loggedin = true;
			session.user = userDetail;
			callback(true);
		}
		else {
			callback(false);
		}
	});
};

exports.logout = function() {
	session.loggedin = false;
	session.user = null;
};

exports.getSessionUser = function() {
	return session.users;
};