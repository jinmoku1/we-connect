exports.isLoggedIn = function(req) {
	return req.session.loggedIn == true;
};

exports.logIn = function(req, netId, password) {
	// todo: db access
	
	req.session.loggedIn = true;
	
	// req.session.user = queried user
	
	return req.session.loggedIn;
};

exports.logOut = function(req) {
	req.session.loggedIn = false;
};

exports.getSessionUser = function(req) {
	return req.session.user;
};