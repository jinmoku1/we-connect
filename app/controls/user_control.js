var constants = require('../constants');
var userConst = constants.user;
var session = require('../session');
var userDb = require('../db/user_db');

var error = null;

function renderLogin(res, session, error) {
	res.render('account/login',	{
		user : session.getSessionUser(),
		title : 'WeConnect: Main',
		welcome : 'Hello, ',
		error : error
	});
}

exports.login = function(req, res) {
	session.initiate(req);
	if (session.isLoggedin()) {
		res.redirect('/');
		return;
	}
	
	renderLogin(res, session, null);
};

exports.loginPost = function(req, res) {
	session.initiate(req);
	
	var netId = req.body.netId;
	var password = req.body.password;
	
	session.login(netId, password, function(success) {
		if (!success) {
			error = "[ERROR] Please check your Net ID and Password again.";
			renderLogin(res, session, error);
			return;
		}
		res.redirect('/');
	});
};

exports.logout = function(req, res) {
	session.initiate(req);
	session.logout();
	res.redirect('/');
};

exports.agreement = function(req, res) {
	session.initiate(req);
	res.render('account/agreement', {
		user : session.getSessionUser(),
		userConst : userConst,
		title: 'Terms and Agreements',
	});
};

exports.agreementPost = function(req, res) {
	var userType = req.body.userType;
	res.redirect('/account/register/' + userType);
};

function renderRegister(userType, res, session, error) {
	res.render('account/register', {
		user : session.getSessionUser(),
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
	session.initiate(req);
	if (session.isLoggedin()) {
		res.redirect('/');
		return;
	}
	
	var userType = req.params.userType;
	if (userType != userConst.TYPE_STUDENT && userType != userConst.TYPE_FACULTY) {
		// invalid registration
		res.redirect('/');
	}
	
	renderRegister(userType, res, session, null);
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
	session.initiate(req);
	
	userDb.create(req.body, function(userDetail) {
		if (!userDetail) {
			var error = "[ERROR] Failed to create an account.";
			var userType = req.body.userType;
			renderRegister(userType, res, session, error);
			return;
		}
		
		var netId = req.body.netId;
		var password = req.body.password;
		session.login(netId, password, function(success) {
			res.redirect('/');
		});
	});
};

// Setting
function renderSetting(req, res, error) {
	res.render('profile/edit', {
		user : session.getSessionUser(),
		userConst : userConst,
		departments: constants.departments,
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
	var user = session.getSessionUser();
	user.firstName = req.body.firstName;
	user.lastName = req.body.firstName;
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
			session.updateSession(user);
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
	var user = session.getSessionUser();
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