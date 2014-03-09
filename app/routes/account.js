/**
 * New node file
 */

var session = require('../session');
var account = require('../db/account');

exports.login = function(req, res) {
	if (req.method == 'POST') {
		var netId = req.body.netId;
		var password = req.body.password;
		
		session.logIn(req, netId, password, function(valid) {
			if (valid) {
				res.redirect('/');
			}
			else {
				res.render('account/login',	{
					user : session.getSessionUser(req),
					title : 'WeConnect: Main',
					welcome : 'Hello, ',
					error : 'Failed to log in, please check your net id and password.'
				});
			}
		});
	}
	else { // if Get
		res.render('account/login',	{
			user : session.getSessionUser(req),
			title : 'WeConnect: Main',
			welcome : 'Hello, ',
			error : null
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
	
	console.log(interest);
	
	var extension = null;
	if (type == "S"){
		standing = req.body.standing;
		degree = req.body.degree;
		
		extension = {
			classStanding : standing,
			degree : degree
		};
	}
	else {
		extension = {
			
		};
	}
	
	// DB query: store sign up information
	var user = {
		netId : netId,
		firstName : firstname,
		lastName : lastname,
		department : department,
		userType : type,
		interests : interest,
		extension : extension,
	};
	
	console.log(user);
	
	account.register(user, password, function(user) {
		if (user) {
			console.log(user);
			session.logIn(req, netId, password, function() {
				res.redirect('/');
			});
		}
		else {
			res.redirect('http://www.google.com');
		}
	});
	/*
	var success = true;
	if (success){		
		if (session.logIn(req, netId, password)) {
			res.redirect('/');
		}
		else {
			error = "Failed to Log-in: Please check your netid and password.";
		}
	}
	*/
};
