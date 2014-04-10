/*
 * GET (non-view) resources
 */

var session = require('../session');
var userDb = require('../db/user_db');
var ObjectID = require('mongodb').ObjectID;



exports.create = function(req, res) {
	res.render('announcement/create', {
		user : session.getSessionUser(req),
		title : 'Create Announcement',
	});
};