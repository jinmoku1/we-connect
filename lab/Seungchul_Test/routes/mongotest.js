/**
 * New node file
 */

exports.index = function(db) {
	return function(req, res) {
		var collection = db.get('usercollection');
		collection.find({},[], function(e, docs) {
			res.render('mongotest/index', {
				"users" : docs
			});
		});
	};
};