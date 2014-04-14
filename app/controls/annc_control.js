/*
 * GET (non-view) resources
 */

var session = require('../session');
var userDb = require('../db/user_db');
var ObjectID = require('mongodb').ObjectID;
var constants = require('../constants');

exports.detail = function(req, res) {
	var anncId = req.params.id;
	// db access using anncId
	var announcement;
	announcement = {_id:null};
	announcement._id = anncId;
	
	res.render('announcement/detail', {
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
	
	res.redirect('/');
};

exports.edit = function(req, res) {
	var anncId = req.params.id;
	// db access using anncId
	var announcement;
	announcement = {_id:null};
	announcement._id = anncId;
	
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
	
	res.redirect('/announcement/'+anncId);
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

exports.apply = function(req, res) {
	var anncId = req.params.id;
	// db access using anncId
	var application;
	var announcement;
	announcement = {_id:null};
	announcement._id = anncId;
	
	res.render('announcement/apply', {
		user : session.getSessionUser(req),
		title : 'Application',
	});
};

exports.applyPost = function(req, res) {
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
	
	res.redirect('/announcement/'+anncId);
};