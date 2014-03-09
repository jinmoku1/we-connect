exports.isLoggedIn = function(req) {
	return req.session.loggedIn == true;
};

exports.logIn = function(req, netId, password) {
	// todo: db access
	// Check right ID and pw
	req.session.loggedIn = true;
	req.session.user = 1;
	
	return req.session.loggedIn;
};

exports.signUp = function(req, type, netId, password, firstname, lastname, interest, department, standing, degree) {
	// todo: db access
	// insert sign up info
	req.session.loggedIn = true;
	
	// req.session.user = queried user
	
	return req.session.loggedIn;
};

exports.logOut = function(req) {
	req.session.loggedIn = false;
	req.session.user = null;
};

exports.getSessionUser = function(req) {
	return req.session.user;
};