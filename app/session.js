/**
 * 
 */

var userDb = require('./db/user_db');

exports.updateSession = function(req, updatedUser) {
	req.session.user = updatedUser;
};

exports.isLoggedin = function(req) {
	return req.session.loggedin == true;
};

exports.login = function(req, netId, password, callback) {
	userDb.isValidLogin(netId, password, function(userDetail) {
		if(userDetail) {
			req.session.loggedin = true;
			req.session.user = userDetail;
			callback(true);
		}
		else {
			callback(false);
		}
	});
};

exports.logout = function(req) {
	req.session.loggedin = false;
	req.session.user = null;
};

exports.getSessionUser = function(req) {
	return req.session.user;
};