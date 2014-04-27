/*
 * GET (non-view) resources
 */

var session = require('../session');
var userDb = require('../db/user_db');
var anncDb = require('../db/annc_db');
var ObjectID = require('mongodb').ObjectID;
var constants = require('../constants');
var nodemailer = require("nodemailer");

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
		timeStamp : curtime
	};
	
	anncDb.create(post, function(result) {
		if (result){
			res.redirect('/');
		}
	});
};

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

exports.editPost = function(req, res) {
	var anncId = req.params.id;
	var id = ObjectID.createFromHexString(anncId);
	console.log(req.body);
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
		anncType : req.body.anncType,
		interests : req.body.interests,
		coursesTaken : req.body.coursesTaken,
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

exports.deletePost = function(req, res) {
	var anncId = req.body.id;
	var id = ObjectID.createFromHexString(anncId);
	
	anncDb.remove(id, function(result) {
		if (result){
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end("true");
		}
	});
};

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

exports.applyPost = function(req, res) {
	var user = session.getSessionUser(req, user);
	
	var anncId = req.body.id;
	var authorNetId = req.body.authorNetId;
	var message = req.body.message;
	var sendResume = req.body.sendResume;
	
	// db access for sending a resume
	
	var senderEmail = user.netId + '@illinois.edu';
	var authorEmail = authorNetId + '@illinois.edu';
	
	var html = '<h1>Application to your Announcement</h1>';
		html += '<p>Sent by : <a href="mailto:' + senderEmail + '">' + senderEmail +'</a></p>';
		html += "<p>" + message + "</p>";
	if (sendResume) {
		html += "<p>" + '<a href="localhost:3000' + user.extension.resumeUrl + '">See Resume</a>' + "</p>";
	}
	
	exports.sendMail(authorEmail, "Application to your Post : Title Goes Here", null, html, function(result) {
		if (result){
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end("true");
		}
		else {
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.end("false");
		}
	});
};

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
	        console.log("Message sent: " + response.message);
	    }
		smtpTransport.close();
		callback(result);
	});
};