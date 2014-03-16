/**
 * New node file
 */

var userDb = require('../db/user_db');

exports.profileModal = function(req, res) {
	var id = req.params.id;
	userDb.getDetail(id, function(userDetail) {
		console.log(userDetail);
		res.render('profile/modal', {
			userDetail : userDetail
		});
	});
};