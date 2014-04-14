var dbConst = require('../constants').db;
var mongoClient = require('mongodb').MongoClient;

/**
 * make a connection to db and initialize it
 * 
 * @param callback it is just a callback function that happens when this method is done
 */
exports.connect = function(callback) {
	mongoClient.connect(dbConst.CONNECTION_STRING, function(err, db) {
		if (err) {
			console.log("[ERROR] Database Connection failed : " + dbConst.CONNECTION_STRING);
			return;
		}
		callback(db);
	});
};

exports.save = function(collection, inputDoc, callback) {
	exports.connect(function(db) {
		var dbCollection = db.collection(collection);
		dbCollection.save(inputDoc, { safe : true }, function(err, resultDoc) {
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
		dbCollection.findOne(conditionDoc, function(err, resultDoc) {
			if (err) {
				console.log("[ERROR] Find on \'"+collection+"\' Failed.");
				return;
			}
			callback(db, resultDoc);
		});
	});
};

exports.remove = function(collection, conditionDoc, callback) {
	exports.connect(function(db) {
		var dbCollection = db.collection(collection);
		dbCollection.findAndModify(conditionDoc, null, null, { remove : true },
		function(err, resultDoc) {
			if (err) {
				console.log("[ERROR] Remove on \'"+collection+"\' Failed.");
				return;
			}
			callback(db, resultDoc != null);
		});
	});
};

exports.update = function(collection, conditionDoc, updateDoc, callback) {
	exports.connect(function(db) {
		var dbCollection = db.collection(collection);
		dbCollection.findAndModify(conditionDoc, null, updateDoc, {'new':true}, function(err, resultDoc) {
			if (err) {
				console.log("[ERROR] Update on \'"+collection+"\' Failed.");
				return;
			}
			callback(db, resultDoc);
		});
	});
};

exports.findAll = function(collection, callback){
	exports.connect(function(db){
		var dbCollection = db.collection(collection);
		dbCollection.find().toArray(function(err, docs){
			if(err){
				console.log("[ERROR] Find on \'" + collection +"\' Failed.");
				return;
			}
			callback(db, docs);
		});
	});
};