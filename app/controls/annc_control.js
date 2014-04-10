/*
 * GET (non-view) resources
 */

var session = require('../session');
var userDb = require('../db/user_db');
var ObjectID = require('mongodb').ObjectID;
var constants = require('../constants');

exports.detail = function(req, res) {
	var anncId = req.params.id;
	res.render('announcement/detail', {
		user : session.getSessionUser(req),
		title : 'Announcement',
		anncId: anncId
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