account = require('./db/account');

exports.isLoggedIn = function(req) {
	return req.session.loggedIn == true;
};

exports.logIn = function(req, netId, password, callback) {
	// todo: db access
	// Check right ID and pw
	account.isValidLogin(netID, password, function(user) {
		if(user) {
			req.session.loggedIn = true;
			req.session.user = user;
			callback(true);
		}
		else {
			callback(false);
		}
	});
};

exports.logOut = function(req) {
	req.session.loggedIn = false;
	req.session.user = null;
};

exports.getSessionUser = function(req) {
	return req.session.user;
};