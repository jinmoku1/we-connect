/**
 * New node file
 */

var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

exports.put = function(user, callback) {
	MongoClient.connect('mongodb://127.0.0.1:27017/weconnect', function(err, db) {
		var collection = db.collection('Users');
		collection.insert(user, function(err, docs) {
			db.close();
			callback(docs);
		});
	});
};

exports.getByNetId = function(netId, callback) {
	MongoClient.connect('mongodb://127.0.0.1:27017/weconnect', function(err, db) {
		var collection = db.collection('Users');
		collection.findOne({ netId : netId }, function(err, docs) {
			db.close();
			callback(docs);
		});
	});
};