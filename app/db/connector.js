/**
 * Connector Modile is for 
 * @module db/connector
 *
 * @requires module:db/connector
 * @requires module:contants
 */

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
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback removeCallback
 * @param {Boolean} check whetehr removing is successfully done
 */

/**
 * remove announcement from db
 * 
 * @param {ObjectId} announcement detail id
 * @param {removeCallback} Callback function
 */
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
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback removeCallback
 * @param {Boolean} check whetehr removing is successfully done
 */

/**
 * remove announcement from db
 * 
 * @param {ObjectId} announcement detail id
 * @param {removeCallback} Callback function
 */
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
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback removeCallback
 * @param {Boolean} check whetehr removing is successfully done
 */

/**
 * remove announcement from db
 * 
 * @param {ObjectId} announcement detail id
 * @param {removeCallback} Callback function
 */
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
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback removeCallback
 * @param {Boolean} check whetehr removing is successfully done
 */

/**
 * remove announcement from db
 * 
 * @param {ObjectId} announcement detail id
 * @param {removeCallback} Callback function
 */
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
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback removeCallback
 * @param {Boolean} check whetehr removing is successfully done
 */

/**
 * remove announcement from db
 * 
 * @param {ObjectId} announcement detail id
 * @param {removeCallback} Callback function
 */
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
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback removeCallback
 * @param {Boolean} check whetehr removing is successfully done
 */

/**
 * remove announcement from db
 * 
 * @param {ObjectId} announcement detail id
 * @param {removeCallback} Callback function
 */
exports.findAllwithCondition = function(collection, conditionDoc, callback) {
	exports.connect(function(db){
		var dbCollection = db.collection(collection);
		dbCollection.find(conditionDoc).toArray(function(err, docs) {
			if(err){
				console.log("[ERROR] Find on \'" + collection +"\' Failed.");
				return;
			}
			callback(db, docs);
		});
	});
};
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback removeCallback
 * @param {Boolean} check whetehr removing is successfully done
 */

/**
 * remove announcement from db
 * 
 * @param {ObjectId} announcement detail id
 * @param {removeCallback} Callback function
 */
exports.findAllwithConditionByOrder = function(collection, conditionDoc, sortedDoc, callback) {
	exports.connect(function(db){
		var dbCollection = db.collection(collection);
		dbCollection.find(conditionDoc).sort(sortedDoc).toArray(function(err, docs) {
			if(err){
				console.log("[ERROR] Find on \'" + collection +"\' Failed.");
				return;
			}
			callback(db, docs);
		});
	});
};
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback removeCallback
 * @param {Boolean} check whetehr removing is successfully done
 */

/**
 * remove announcement from db
 * 
 * @param {ObjectId} announcement detail id
 * @param {removeCallback} Callback function
 */
exports.aggreate = function(collection, aggreCondition, callback) {
	exports.connect(function(db) {
		var dbCollection = db.collection(collection);
		dbCollection.aggregate(aggreCondition, function(err, result) {
			if(err) {
				console.log("[ERROR] Aggregate on \'" + collection + "\' Failed.\n");
				console.log("The detail is as below;\n" + err);
				return
			}
			
			callback(db, result);
		});
	});
};
/**
 * This callback is displayed as part of the AnncDb module.
 *
 * @callback removeCallback
 * @param {Boolean} check whetehr removing is successfully done
 */