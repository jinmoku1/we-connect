/**
 * make a connection to db and initialize it
 * 
 * By Seungchul Lee, Changyong Choi, Seung. H Cha
 */

// Database Configuration
var CONNECTION_STRING = 'mongodb://hay.synology.me:27017/weconnect';

var mongoClient = require('mongodb').MongoClient;


/**
 * make a connection to db and initialize it
 * 
 * @param callback it is just a callback function that happens when this method is done
 */
exports.connect = function(callback) {
	mongoClient.connect(CONNECTION_STRING, function(err, db) {
		if (err) {
			console.log("[ERROR] Database Connection failed : " + CONNECTION_STRING);
			return;
		}
		callback(db);
	});
};

exports.save = function(collection, inputDoc, callback) {
	exports.connect(function(db) {
		var dbCollection = db.collection(collection);
		dbCollection.save(inputDoc, {safe:true}, function(err, resultDoc) {
			if (err) {
				console.log("[ERROR] Save on \'"+collection+"\' Failed.");
				return;
			}
			callback(db, resultDoc);
		});
	});
};

exports.findOne = function(collection, conditionDoc, callback) {
	exports.connect(function(db) {
		var dbCollection = db.collection(collection);
		dbCollection.findOne(conditionDoc, {safe:true}, function(err, resultDoc) {
			if (err) {
				console.log("[ERROR] Find on \'"+collection+"\' Faield.");
				return;
			}
			callback(db, resultDoc);
		});
	});
};