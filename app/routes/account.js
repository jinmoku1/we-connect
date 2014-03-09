/**
 * New node file
 */

var session = require('../session');

exports.login = function(req, res) {
	var error = null;
	if (req.method == 'POST') {
		var netId = req.body.netId;
		var password = req.body.password;
		
		if (session.logIn(req, netId, password)) {
			res.redirect('/');
		}
		else {
			error = "Failed to Log-in: Please check your netid and password.";
		}
	}
	else { // if Get
		res.render('account/login',	{
			user : session.getSessionUser(req),
			title : 'WeConnect: Main',
			welcome : 'Hello, ',
			error : error
		});
	}
};

exports.logout = function(req, res) {
	session.logOut(req);
	res.redirect('/');
};

exports.register = function(req, res) {
	if (req.method == 'POST') {
		var userType = req.body.userType;
		console.log("THIS: "+userType);
		res.render('account/register',	{
			user : session.getSessionUser(req),
			title: 'Personal Information',
			userType: userType
		});
		/*
		res.render('account/register', {
			user : session.getSessionUser(req),
			title: 'Personal Information',
		});
		*/
	}
	else { // if Get
		res.render('account/register_agreement', {
			user : session.getSessionUser(req),
			title: 'Terms and Agreements',
		});
	}
};

exports.registerValidate = function(req, res) {
	// DB query: validate netID
	var netId = req.params.netId;
};

exports.registerComplete = function(req, res) {
	var type = req.params.type;
	var netId = req.body.netId;
	var password = req.body.password;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var interest = req.body.interest;
	var department = req.body.department;
	var standing = "";
	var degree = "";
	if (type == "S"){
		standing = req.body.standing;
		degree = req.body.degree;
	}
	
	// DB query: store sign up information
	
	var success = true;
	if (success){		
		if (session.logIn(req, netId, password)) {
			res.redirect('/');
		}
		else {
			error = "Failed to Log-in: Please check your netid and password.";
		}
	}
};
