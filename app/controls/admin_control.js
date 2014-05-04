/**
 * A module for administrator control. This module controls all administrator specific requests, 
 * including approving and disapproving pending announcements.
 * @module controls/adminControl
 * @requires module:session
 * @requires module:db/userDb
 * @requires module:db/anncDb
 * @requires module:contants
 */

var session = require('../session');
var userDb = require('../db/user_db');
var anncDb = require('../db/annc_db');
var ObjectID = require('mongodb').ObjectID;
var constants = require('../constants');

/**
 * This method handles the administrator's POST request accepting (approving) a pending announcement.
 * @param {Object} req A request object
 * @param {Object} res A response object
 */
exports.approve = function(req, res) {
	var user = session.getSessionUser(req);
	var anncId = req.body.id;
	var id = ObjectID.createFromHexString(anncId);
	
	if (user.userType == constants.user.TYPE_ADMIN){
		anncDb.getDetail(id, function(anncDetail) {
			anncDetail.status = constants.annc.ACCEPTED;
			anncDb.updateInfo(id, anncDetail, function(success){
				if (success){
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.end("true");
				}
				else {
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.end("false");
				}
			});
		});
	}
};

/**
 * This method handles the administrator's POST request rejecting (disapproving) a pending announcement.
 * @param {Object} req A request object
 * @param {Object} res A response object
 */
exports.disapprove = function(req, res) {
	var user = session.getSessionUser(req);
	var anncId = req.body.id;
	var id = ObjectID.createFromHexString(anncId);
	
	if (user.userType == constants.user.TYPE_ADMIN){
		anncDb.getDetail(id, function(anncDetail) {
			anncDetail.status = constants.annc.REJECTED;
			anncDb.updateInfo(id, anncDetail, function(success){
				if (success){
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.end("true");
				}
				else {
					res.writeHead(200, {"Content-Type": "text/plain"});
					res.end("false");
				}
			});
		});
	}
};
