/**
 * This is the user control that handles redirecting of GET and POST requests
 * for login, user agreement, user registration, user validation, and user account and
 * profile settings. It also renders the pages generated here.
 * 
 * @module controls/userControl
 * @requires module:constants
 * @requires module:session
 * @requires module:db/user_db
 * @requires module:db/annc_db
 * @requires module:fs
 * @requires module:easyimage
 */

var constants = require('../constants');
var userConst = constants.user;
var session = require('../session');
var userDb = require('../db/user_db');
var anncDb = require('../db/annc_db');
var fs = require('fs');
var easyimg = require('easyimage');

var error = null;

/**
 * @access private
 */
function renderLogin(req, res, error) {
	res.render('account/login',	{
		user : session.getSessionUser(req),
		title : 'WeConnect: Main',
		welcome : 'Hello, ',
		error : error
	});
}

/**
 * Login Handler through GET request</br>
 * 
 * This function checks user login status by GET
 * and redirects to page accordingly to status
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.login = function(req, res) {
	if (session.isLoggedin(req)) {
		res.redirect('/');
		return;
	}
	
	renderLogin(req, res, null);
};

/**
 * Login handler through POST request</br>
 * 
 * This function validates user login attributes
 * and redirects accordingly to status
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
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

/**
 * This function ends user session and redirects to login page</br>
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.logout = function(req, res) {
	session.logout(req);
	res.redirect('/account/login');
};

/**
 * handles agreement page through GET request</br>
 * This function gets and renders terms & agreements page by GET
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.agreement = function(req, res) {
	res.render('account/agreement', {
		user : session.getSessionUser(req),
		userConst : userConst,
		title: 'Terms and Agreements',
	});
};

/**
 * handles agreement page through POST request</br>
 * This function redirects from agreements page to registration page
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.agreementPost = function(req, res) {
	var userType = req.body.userType;
	res.redirect('/account/register/' + userType);
};

/**
 * @access private
 */
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

/**
 * handles user registration through GET request</br>
 * This function checks user login status and renders registration page
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
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

/**
 * handles user registration validation through POST request</br>
 * This function checks if there is another existing netID in the DB
 *  
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.registerValidate = function(req, res) {
	var netId = req.body.netId;
	
	userDb.netIdExists(netId, function(result) {
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

/**
 * handles user registration through POST request</br>
 * This function sends all user data to the DB and creates an active
 * user login session then redirects the user to their main profile page
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
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

/**
 * @access private
 */
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

/**
 * handles user settings through GET request</br>
 * This function renders the user settings page
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.setting = function(req, res) {
	renderSetting(req, res, null);
};

/**
 * handles user settings through POST request</br>
 * This function sends user data in the settings page to update
 * in the DB and main profile page
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.settingProfile = function(req, res) {
	//update object in the session
	var user = session.getSessionUser(req);
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.department = req.body.department;
	user.interests = [].concat(req.body.interests);
	if (user.userType == userConst.TYPE_STUDENT){
		user.degree = req.body.degree;
		user.classStanding = req.body.classStanding;
	}
	else {
		user.websiteUrl = req.body.websiteUrl;
	}
	
	var userDir = '/media/' + user._id;
	var pictureDir = userDir + '/picture';
	var profilePic = req.files.profilePic;
	if (profilePic != null) {
		user.profilePicUrl = pictureDir + '/' + user.netId;
	}
	
	userDb.updateInfo(user._id, user, function(success) {
		if (success){
			session.setSessionUser(req, user);
			
			if (profilePic != null) {
				// create directory
				var userDirPath = "public" + userDir;
				if (!fs.existsSync(userDirPath)) {
					fs.mkdirSync(userDirPath);
				}
				var pictureDirPath = "public" + pictureDir;
				if (!fs.existsSync(pictureDirPath)) {
					fs.mkdirSync(pictureDirPath);
				}
				
				var mediaPath = pictureDirPath + "/" + user.netId;
				if (fs.existsSync(mediaPath)) {
					fs.unlink(mediaPath);
				}
				easyimg.thumbnail({
					src: profilePic.path, dst: mediaPath,
					width:160, height:160,
				}, function(err, image) {
					res.redirect('/');
				});
			}
		}
		else {
			var error = "[ERROR] Please try updating again.";
			renderSetting(req, res, error);
		}
	});
};

/**
 * handles user password settings through POST request</br>
 * This function sends user data in the settings page to update in the DB
 * for password change
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
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

/**
 * handles user additional settings through POST request</br>
 * This function sends user data in the settings page to update
 * in the DB and main profile page
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.settingAdditionalInfo = function(req, res) {
	var user = session.getSessionUser(req);
	user.intro = req.body.intro;
	var userDir = '/media/' + user._id;
	var resumeDir = userDir + '/resume';
	
	var resume = req.files.resume;
	
	if (user.userType == userConst.TYPE_STUDENT){
		user.extension.overallGPA = req.body.overallGPA;
		user.extension.technicalGPA = req.body.technicalGPA;
		user.extension.coursesTaken = req.body.coursesTaken;
	
		if (resume.size > 0) {
			user.extension.resumeUrl = resumeDir + '/' + resume.name;
		}
	}
	else {
		user.extension.coursesTaught = req.body.coursesTaught;
	}
	
	userDb.updateInfo(user._id, user, function(success) {
		if (success){
			session.setSessionUser(req, user);
			if (resume.size > 0) {
				fileData = fs.readFileSync(resume.path);
				if (fileData == null) {
					var error = "[ERROR] Failed to read file.";
					renderSetting(req, res, error);
					return;
				}
					
				// create directory
				var userDirPath = "public" + userDir;
				if (!fs.existsSync(userDirPath)) {
					fs.mkdirSync(userDirPath);
				}
				var resumeDirPath = "public" + resumeDir;
				if (!fs.existsSync(resumeDirPath)) {
					fs.mkdirSync(resumeDirPath);
				}
				
				var mediaPath = resumeDirPath + "/" + resume.name;
				if (!fs.existsSync(mediaPath)) {
					fs.unlink(mediaPath);
				}
				fs.writeFileSync(mediaPath, fileData);
			}
			
			res.redirect('/');
		}
		else {
			var error = "[ERROR] Please try updating again.";
			renderSetting(req, res, error);
		}
	});
};
