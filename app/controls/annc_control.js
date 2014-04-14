/*
 * GET (non-view) resources
 */

var session = require('../session');
var userDb = require('../db/user_db');
var anncDb = require('../db/annc_db');
var ObjectID = require('mongodb').ObjectID;
var constants = require('../constants');

exports.detail = function(req, res) {
	var anncId = req.params.id;
	
	var id = ObjectID.createFromHexString(anncId);
	anncDb.getDetail(id, function(announcement){
		res.render('announcement/detail', {
			user : session.getSessionUser(req),
			annc : announcement,
			departments : constants.departments,
			interests : constants.interests,
			degrees : constants.degrees,
			classStandings : constants.classStandings,
			anncTypes : constants.anncTypes,
			courses : constants.courses,
			title : 'Announcement'
		});
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
	
	anncDb.create(post, function(result) {
		res.redirect('/');
	});
};

exports.edit = function(req, res) {
	var anncId = req.params.id;
	var id = ObjectID.createFromHexString(anncId);
	anncDb.getDetail(id, function(announcement){
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
	});
};

exports.editPost = function(req, res) {
	var anncId = req.params.id;
	var title = req.body.title;
	var content = req.body.content;
	var anncType = req.body.anncType;
	var interests = req.body.interests;
	var courses = req.body.courses;
	var degree = req.body.degree;
	var classStanding = req.body.classStanding;
	var overallGPA = req.body.overallGPA;
	var technicalGPA = req.body.technicalGPA;
	var resumeRequired = req.body.resumeRequired;

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
	
	res.redirect('/announcement/'+anncId);
};

exports.deletePost = function(req, res) {
	var anncId = req.body.id;
	// db access using anncId
	
	res.redirect('/');
};

exports.bookmark = function(req, res) {
	var anncId = req.body.id;
	// db access using anncId
	
	var successful = true;
	if (successful){
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("true");
	}
	else {
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("false");
	}
};

exports.unbookmark = function(req, res) {
	var anncId = req.body.id;
	// db access using anncId
	
	var successful = true;
	if (successful){
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("true");
	}
	else {
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("false");
	}
};

exports.applyPost = function(req, res) {
	var anncId = req.body.id;
	var message = req.body.message;
	// db access for sending a resume

	var successful = true;
	if (successful){
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("true");
	}
	else {
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.end("false");
	}
	
};
