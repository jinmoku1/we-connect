/**
 * 
 */

var MongoClient = require('mongodb').MongoClient;

exports.connect = function(callback) {
	MongoClient.connect('mongodb://hay.synology.me:27017/weconnect', function(err, db) {
		callback(err, db);
	});
};