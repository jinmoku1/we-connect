exports.isLoggedIn = function(req) {
	return req.session.loggedIn == true;
};

exports.logIn = function(req, username, password) {
	// todo: db access
	
	req.session.loggedIn = true;
	
	// req.session.user = queried user
	
	return req.session.loggedIn;
};

exports.logOut = function(req) {
	req.session.loggedIn = false;
};

exports.getSessionuser = function(req) {
	return req.session.user;
};