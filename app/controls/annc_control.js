/*
 * GET (non-view) resources
 */

var session = require('../session');
var userDb = require('../db/user_db');
var ObjectID = require('mongodb').ObjectID;
var constants = require('../constants');

exports.view = function(req, res) {
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