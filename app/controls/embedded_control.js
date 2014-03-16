/**
 * New node file
 */

var userDb = require('../db/user_db');
var ObjectID = require('mongodb').ObjectID;

exports.profileModal = function(req, res) {
	var _id = ObjectID.createFromHexString(req.params.id);
	userDb.getDetail(_id, function(userDetail) {
		res.render('profile/modal', {
			userDetail : userDetail
		});
	});
};