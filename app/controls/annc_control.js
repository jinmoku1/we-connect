/**
 * This is the announcement controller which handles all requests for announcements
 * including: CRUD operations for announcements, applying to an announcement,
 * sending an email, and bookmarking announcements. 
 * 
 * @module controls/anncControl
 * @requires module:session
 * @requires module:db/user_db
 * @requires module:db/annc_db
 * @requires module:mongodb
 * @requires module:constants
 * @requires module:nodemailer
 */

/*
 * GET (non-view) resources
 */

var session = require('../session');
var userDb = require('../db/user_db');
var anncDb = require('../db/annc_db');
var ObjectID = require('mongodb').ObjectID;
var constants = require('../constants');
var nodemailer = require("nodemailer");

/**
 * handles announcement details page through GET request</br>
 * This function pulls announcement data and renders the 
 * announcement details page
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.detail = function(req, res) {
	var user = session.getSessionUser(req);
	var anncId = req.params.id;
	var id = ObjectID.createFromHexString(anncId);
	
	anncDb.getDetail(id, function(announcement){
		if (announcement){
			var isBookmarked = false;
			for (var i in user.bookmarkedAnncs){
				if (announcement.briefId.equals(user.bookmarkedAnncs[i]._id)){
					isBookmarked = true;
					break;
				}
			}
			res.render('announcement/detail', {
				user : user,
				annc : announcement,
				isBookmarked : isBookmarked,
				departments : constants.departments,
				interests : constants.interests,
				degrees : constants.degrees,
				classStandings : constants.classStandings,
				anncTypes : constants.anncTypes,
				courses : constants.courses,
				title : 'Announcement'
			});
		}
	});
	
};

/**
 * handles creating the announcement page through GET request</br>
 * This function renders the announcement page creation
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.create = function(req, res) {
	res.render('announcement/create', {
		user : session.getSessionUser(req),
		departments : constants.departments,
		interests : constants.interests,
		degrees : constants.degrees,
		classStandings : constants.classStandings,
		anncTypes : constants.anncTypes,
		courses : constants.courses,
		title : 'Create Announcement',
	});
};

/**
 * handles creating the announcement page through POST request</br>
 * This function pushes the inputted data and creates the announcement post
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.createPost = function(req, res) {
	var user = session.getSessionUser(req);
	var curtime = new Date();
	var post = {
		author : {
			_id : user._id,
			name : user.firstName + " " + user.lastName,
			netId : user.netId,
			profilePic : user.profilePicUrl
		},
		title : req.body.title,
		content : req.body.content,
		anncTypes : req.body.anncTypes,
		interests : req.body.interests,
		coursesTaken : req.body.coursesTaken,
		degree : req.body.degree,
		classStanding : req.body.classStanding,
		overallGPA : req.body.overallGPA,
		technicalGPA : req.body.technicalGPA,
		resumeRequired : req.body.resumeRequired,
		timeStamp : curtime,
		status : 1
	};
	
	if (user.userType == constants.user.TYPE_STUDENT) {
		post.status = 0;
	}
	
	anncDb.create(post, function(result) {
		if (result){
			res.redirect('/');
		}
	});
};

/**
 * handles announcement edit page through GET request</br>
 * This function renders the announcement edit page
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.edit = function(req, res) {
	var anncId = req.params.id;
	var id = ObjectID.createFromHexString(anncId);
	anncDb.getDetail(id, function(announcement){
		if (announcement){
			res.render('announcement/edit', {
				user : session.getSessionUser(req),
				annc : announcement,
				departments : constants.departments,
				interests : constants.interests,
				degrees : constants.degrees,
				classStandings : constants.classStandings,
				anncTypes : constants.anncTypes,
				courses : constants.courses,
				title : 'Announcement',
			});
		}
	});
};

/**
 * handles announcement edit page through POST request</br>
 * This function pushes inputted data from user and updates
 * DB along with rendering new information onto the announcement page
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.editPost = function(req, res) {
	var anncId = req.params.id;
	var id = ObjectID.createFromHexString(anncId);
	var user = session.getSessionUser(req);
	var curtime = new Date();
	
	var post = {
		author : {
			_id : user._id,
			name : user.firstName + " " + user.lastName,
			netId : user.netId,
			profilePic : user.profilePicUrl
		},
		title : req.body.title,
		content : req.body.content,
		anncTypes : req.body.anncTypes,
		interests : [].concat(req.body.interests),
		coursesTaken : [].concat(req.body.coursesTaken),
		degree : req.body.degree,
		classStanding : req.body.classStanding,
		overallGPA : req.body.overallGPA,
		technicalGPA : req.body.technicalGPA,
		resumeRequired : req.body.resumeRequired,
		timeStamp : curtime
	};
	
	anncDb.updateInfo(id, post, function(result) {
		if (result){
			res.redirect('/announcement/'+anncId);
		}
	});
};

/**
 * handles deleting thhe announcement page through POST request</br>
 * This function removes the announcement from the DB
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.deletePost = function(req, res) {
	var anncId = req.body.id;
	var id = ObjectID.createFromHexString(anncId);
	
//	console.log("[AnncCtrl:deletePost] Id passed : " + anncId);
	anncDb.remove(id, function(result) {
		if (result){
//			console.log("[AnncCtrl:deletePost] after remove");
			anncDb.removeAllBookmarks(id, function(result){
				if(result){
//					console.log("[AnncCtrl:deletePost] after remove all bookmarks");
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.end("true");
				}
			});
		}
	});
};

/**
 * handles bookmark functionality through POST request</br>
 * This function updates users set of bookmarks in the DB when
 * user requests to add an announcement as a bookmark
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.bookmark = function(req, res) {
	var user = session.getSessionUser(req);
	var anncId = req.body.id;
	var id = ObjectID.createFromHexString(anncId);
	
	anncDb.getBrief(id, function(anncBrief) {
		user.bookmarkedAnncs = user.bookmarkedAnncs.concat(anncBrief);
		userDb.updateInfo(user._id, user, function(success) {
			if (success){
				session.setSessionUser(req, user);
				res.writeHead(200, {"Content-Type": "text/plain"});
				res.end("true");
			}
			else {
				res.writeHead(200, {"Content-Type": "text/plain"});
				res.end("false");
			}
		});
	});
};

/**
 * handles removing bookmark functionality through POST request</br>
 * This function updates users set of bookmarks in the DB when user
 * requests to remove a bookmark
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.unbookmark = function(req, res) {
	var user = session.getSessionUser(req);
	var anncId = req.body.id;
	var id = ObjectID.createFromHexString(anncId);
	
	anncDb.getBrief(id, function(anncBrief) {
		for (var i in user.bookmarkedAnncs){
			if (anncBrief._id.equals(user.bookmarkedAnncs[i]._id)){
				user.bookmarkedAnncs.splice(i, 1);
				break;
			}
		}
		userDb.updateInfo(user._id, user, function(success) {
			if (success){
				session.setSessionUser(req, user);
				res.writeHead(200, {"Content-Type": "text/plain"});
				res.end("true");
			}
			else {
				res.writeHead(200, {"Content-Type": "text/plain"});
				res.end("false");
			}
		});
	});
};

/**
 * handles application to an announcement functionality through POST request</br>
 * This function renders the application modal and sends the information
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.applyPost = function(req, res) {
	var user = session.getSessionUser(req, user);
	
	var anncId = req.body.id;
	var id = ObjectID.createFromHexString(anncId);
	var authorNetId = req.body.authorNetId;
	var message = req.body.message;
	var sendResume = req.body.sendResume;
	
	// db access for sending a resume
	
	var senderEmail = user.netId + '@illinois.edu';
	var authorEmail = authorNetId + '@illinois.edu';
	
	var html = '<h1>Application to your Announcement</h1>';
		html += '<p>Sent by : <a href="mailto:' + senderEmail + '">' + senderEmail +'</a></p>';
		html += '<p>' + message + '</p>';
	if (sendResume) {
		html += '<p>' + '<a href="http://localhost:3000' + user.extension.resumeUrl + '">See Resume</a>' + '</p>';
	}
	
	anncDb.getDetail(id, function(announcement){
		if (announcement){
			exports.sendMail(authorEmail, "Application to your Post : "+announcement.title, null, html, function(result) {
				if (result){
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.end("true");
				}
				else {
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.end("false");
				}
			});
		}
	});
};

/**
 * handles sending an email functionality through POST request</br>
 * This function sends an email with the attached resume to the user
 * and the specified creator of the announcement
 * 
 * @param {object} req A request object
 * @param {object} res A response object
 */
exports.sendMail = function(receiver, subject, text, html, callback) {
	var smtpTransport = nodemailer.createTransport("SMTP",{
	    service: "Hotmail",
	    auth: {
	        user: "weconnect.cs@outlook.com",
	        pass: "jinmoku1"
	    }
	});
	
	var mailOptions = {
	    from: "WeConnect-CS <weconnect.cs@outlook.com>",
	    to: receiver,
	    subject: subject,
	    text: text,
	    html: html
	};
	
	smtpTransport.sendMail(mailOptions, function(error, response){
		result = false;
	    if (error) {
	        console.log(error);
	    }
	    else {
	    	result = true;
	    }
		smtpTransport.close();
		callback(result);
	});
};