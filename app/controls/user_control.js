var constants = require('../constants');
var userConst = constants.user;
var session = require('../session');
var userDb = require('../db/user_db');

var error = null;

function renderLogin(req, res, error) {
	res.render('account/login',	{
		user : session.getSessionUser(req),
		title : 'WeConnect: Main',
		welcome : 'Hello, ',
		error : error
	});
}

exports.login = function(req, res) {
	if (session.isLoggedin(req)) {
		res.redirect('/');
		return;
	}
	
	renderLogin(req, res, null);
};

exports.loginPost = function(req, res) {
	var netId = req.body.netId;
	var password = req.body.password;
	
	session.login(req, netId, password, function(success) {
		if (!success) {
			error = "[ERROR] Please check your Net ID and Password again.";
			renderLogin(req, res, error);
			return;
		}
		res.redirect('/');
	});
};

exports.logout = function(req, res) {
	session.logout(req);
	res.redirect('/');
};

exports.agreement = function(req, res) {
	res.render('account/agreement', {
		user : session.getSessionUser(req),
		userConst : userConst,
		title: 'Terms and Agreements',
	});
};

exports.agreementPost = function(req, res) {
	var userType = req.body.userType;
	res.redirect('/account/register/' + userType);
};

function renderRegister(req, res, userType, error) {
	res.render('account/register', {
		user : session.getSessionUser(req),
		userConst: userConst,
		departments : constants.departments,
		interests : constants.interests,
		degrees : constants.degrees,
		classStandings : constants.classStandings,
		userType : userType,
		title : 'Sign Up',
		error : error,
	});
}

exports.register = function(req, res) {
	if (session.isLoggedin(req)) {
		res.redirect('/');
		return;
	}
	
	var userType = req.params.userType;
	if (userType != userConst.TYPE_STUDENT && userType != userConst.TYPE_FACULTY) {
		// invalid registration
		res.redirect('/');
	}
	
	renderRegister(req, res, userType, null);
};

exports.registerValidate = function(req, res) {
	var netId = req.body.netId;
	
	userDb.netIdExists(netId, function(result) {
		console.log("Has duplicate?="+result);
		if (result){ // the duplicate ID exists
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end("false");
		}
		else {
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end("true");
		}
	});
};

exports.registerPost = function(req, res) {
	userDb.create(req.body, function(userDetail) {
		if (!userDetail) {
			var error = "[ERROR] Failed to create an account.";
			var userType = req.body.userType;
			renderRegister(req, res, userType, error);
			return;
		}
		
		var netId = req.body.netId;
		var password = req.body.password;
		session.login(req, netId, password, function(success) {
			res.redirect('/');
		});
	});
};

// Setting
function renderSetting(req, res, error) {
	res.render('profile/edit', {
		user : session.getSessionUser(req),
		userConst : userConst,
		departments: constants.departments,
		courses : constants.courses,
		interests: constants.interests,
		degrees : constants.degrees,
		classStandings : constants.classStandings,
		title : 'Edit Settings',
		error : error,
	});
}

exports.setting = function(req, res) {
	renderSetting(req, res, null);
};

exports.settingProfile = function(req, res) {
	//update object in the session
	var user = session.getSessionUser(req);
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.department = req.body.department;
	user.interests = req.body.interests;
	if (user.userType == userConst.TYPE_STUDENT){
		user.degree = req.body.degree;
		user.classStanding = req.body.classStanding;
	}
	else {
		user.websiteUrl = req.body.websiteUrl;
	}
	
	userDb.updateInfo(user._id, user, function(success) {
		if (success){
			session.setSessionUser(req, user);
			res.redirect('/');
		}
		else {
			var error = "[ERROR] Please try updating again.";
			renderSetting(req, res, error);
		}
	});
};

exports.settingChangePW = function(req, res) {
	//update object in the session
	var user = session.getSessionUser(req);
	var oldPassword = req.body.oldPassword;
	var newPassword = req.body.newPassword;
	var accountInfo = {
		"netId" : user.netId,
		"password" : newPassword,
		"detailId" : user._id
	};
	
	userDb.updatePassword(accountInfo, oldPassword, function(success) {
		if (success){
			res.redirect('/');
		}
		else {
			var error = "[ERROR] Your password is incorrect.";
			renderSetting(req, res, error);
		}
	});
};

exports.settingAdditionalInfo = function(req, res) {
	var user = session.getSessionUser(req);
	user.intro = req.body.intro;
	if (user.userType == userConst.TYPE_STUDENT){
		user.extension.overallGPA = req.body.overallGPA;
		user.extension.technicalGPA = req.body.technicalGPA;
		user.extension.coursesTaken = req.body.coursesTaken;
	}
	else {
		user.extension.coursesTaught = req.body.coursesTaught;
	}
	
	userDb.updateInfo(user._id, user, function(success) {
		if (success){
			session.setSessionUser(req, user);
			res.redirect('/');
		}
		else {
			var error = "[ERROR] Please try updating again.";
			renderSetting(req, res, error);
		}
	});
};