/**
 * New node file
 */

var dbCommon = require('./db_common');

exports.put = function(user) {
	dbCommon.put('Users', user);
};

exports.getByNetId = function(netId, callback) {
	dbCommon.connect(function(err, db) {
		collection = db.collection('Users');
		collection.findOne({ netId : netId }, function(err, document) {
			callback(document);
			db.close();
		});
	});
};