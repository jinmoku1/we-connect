var MongoClient = require('mongodb').MongoClient;

exports.connect = function(callback) {
	MongoClient.connect('mongodb://127.0.0.1:27017/weconnect', function(err, db) {
		callback(err, db);
	});
};

exports.put = function(collection, user) {
	exports.connect(function(err, db) {
		collection = db.collection(collection);
		collection.insert(user, function(err, docs) {
			db.close();
		});
	});
};