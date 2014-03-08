
/*
 * GET (non-view) resources
 */

var session = require('../session');

exports.sample = function(req, res){
	res.send("Hello World!");
};

exports.logIn = function(req, res) {
	session.logIn(req, 'username', 'password');
	if (session.isLoggedIn(req)) {
		//res.send("User logged in.");
		res.redirect('/');
	}
	else {
		res.send("User log in failed.");
	}
};

exports.logOut = function(req, res) {
	session.logOut(req);
	res.send("User logged out.");
};

exports.isLoggedIn = function(req, res) {
	if (session.isLoggedIn(req)) {
		res.send("User is logged in.");
	}
	else {
		res.send("User is not logged in.");
	}
};