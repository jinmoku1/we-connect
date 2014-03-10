var userConst = require('../constants').user;
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

function renderRegister(userType, res, session, error) {
	res.render('account/register', {
		user : session.getSessionUser(),
		userType : userType,
		title : 'Sign Up',
		error : error,
	});
}

exports.register = function(req, res) {
	session.initiate(req);
	
	if (!req.params.type) {
		// register type not set
		res.render('account/register-agreement', {
			user : session.getSessionUser(),
			title: 'Terms and Agreements',
		});
		return;
	}
	
	var userType = req.params.userType;
	renderRegister(userType, res, session, null);
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