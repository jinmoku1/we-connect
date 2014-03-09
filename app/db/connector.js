/**
 * make a connection to db and initialize it
 * 
 * By Seungchul Lee, Changyong Choi, Seung. H Cha
 */

var MongoClient = require('mongodb').MongoClient;


/**
 * make a connection to db and initialize it
 * 
 * @param callback it is just a callback function that happens when this method is done
 */
exports.connect = function(callback) {
	MongoClient.connect('mongodb://hay.synology.me:27017/weconnect', function(err, db) {
		callback(err, db);
	});
};