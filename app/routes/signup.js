/**
 * New node file
 */

exports.index = function(req, res) {
	res.render('signUpPgs/index',	{
		title: 'Terms and Agreements',
	});
};

exports.signupMain = function(req, res) {
	var userType = req.body.userType;
	if (userType == "S"){
		res.render('signUpPgs/signupStudent',	{
			title: 'Sign Up Page',
		});
	}
	else {
		res.render('signUpPgs/signupFaculty',	{
			title: 'Sign Up Page',
		});
	}
};

exports.register = function(req, res) {
	console.log(req.params.type);
	var type = req.params.type;
	var netId = req.body.netID;
	var password = req.body.password;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var interest = req.body.interest;
	var department = req.body.department;
	var standing = "";
	if (type="S"){
		standing = req.body.standing;
		// Student
		// DB Insert
	}
	else {
		// Faculty
		// DB Insert
	}
	
	var success = true;
	if (success){
		// Register session
		var session = require('../session');
		session.signUp(req, type, netId, password, firstname, lastname, interest, department, standing);
		if (session.isLoggedIn(req)) {
			//res.send("User logged in.");
			res.redirect('/userMain');
		}
		else {
			res.send("User sign up failed.");
		}
	}
};