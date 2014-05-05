/**
 * Connector Modile is for 
 * @module db/connector
 *
 * @requires module:mongodb
 * @requires module:contants
 */

var dbConst = require('../constants').db;
var mongoClient = require('mongodb').MongoClient;

/**
 * connect to mongoDB
 * 
 * @param {db/connector~connectCallback} Callback function 
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
 * This callback is displayed as part of the Connector module.
 *
 * @callback db/connector~connectCallback
 * @param {Object} db location, so that other functions know where to modify
 */

/**
 * save data to db
 * 
 * @param {string} collection name
 * @param {Object} document that would be saved on db
 * @param {db/connector~saveCallback} Callback function
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
 * This callback is displayed as part of the Connector module.
 *
 * @callback db/connector~saveCallback
 * @param {Object} db location, so that other functions know where to modify
 * @param {Object} the most saved document
 */

/**
 * find a document, which is satisfied by conditions, from db
 * 
 * @param {string} collection name
 * @param {Object} documents that contain conditions
 * @param {db/connector~findOneCallback} Callback function
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
 * This callback is displayed as part of the Connector module.
 *
 * @callback db/connector~findOneCallback
 * @param {Object} db location, so that other functions know where to modify
 * @param {Object} found document
 */

/**
 * remove document from db
 * 
 * @param {string} collection name
 * @param {ObjectId} documents that contain conditions
 * @param {db/connector~removeCallback} Callback function
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
 * This callback is displayed as part of the Connector module.
 *
 * @callback db/connector~removeCallback
 * @param {Object} db location, so that other functions know where to modify
 * @param {Boolean} notice whether conditioned doc is removed successfully
 */

/**
 * update all related documents from db
 * 
 * @param {string} collection name
 * @param {Object} conditional documents that contain conditions to filter out
 * @param {Object} document that would replace to
 * @param {db/connector~updateAllCallback} Callback function
 */
exports.updateAll = function(collection, query, update, callback){
	exports.connect(function(db){
		var dbCollection = db.collection(collection);
		dbCollection.update(query, update, {multi: true}, function(err, result){
			if (err) {
				console.log("[ERROR] update on \'" + collection + "\' Failed.");
				return;
			}
			callback(db, result);
		});
	});
};
/**
 * This callback is displayed as part of the Connector module.
 *
 * @callback db/connector~updateAllCallback
 * @param {Object} db location, so that other functions know where to modify
 * @param {Boolean} notice whether condition-related docs are updated successfully
 */

/**
 * update document from db
 * 
 * @param {string} collection name
 * @param {Object} conditional document that contain conditions to find one
 * @param {Object} document that would replace to
 * @param {db/connector~updateCallback} Callback function
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
 * This callback is displayed as part of the Connector module.
 *
 * @callback db/connector~updateCallback
 * @param {Object} The update() method returns a WriteResult object that contains the status of the operation. Upon success, the WriteResult object contains the number of documents that matched the query condition, the number of documents inserted via an upsert, and the number of documents modified:
 */

/**
 * fina all documents from db
 * 
 * @param {string} collection name
 * @param {db/connector~findAllCallback} Callback function
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
 * This callback is displayed as part of the Connector module.
 *
 * @callback db/connector~findAllCallback
 * @param {List<Object>} All documents.
 */

/**
 * find all documents that meet the query creteria from db
 * 
 * @param {string} collection name
 * @param {Object} conditional document that contain conditions to filter out
 * @param {db/connector~findAllwithConditionCallback} Callback function
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
 * This callback is displayed as part of the Connector module.
 *
 * @callback db/connector~findAllwithConditionCallback
 * @param {List<Object>} the documents that match the query criteria.
 */

/**
 * fina all conditianal documents with some special order
 * 
 * @param {string} collection name
 * @param {Object} conditional document that contain conditions to filter out
 * @param {Object} conditional document that contain information about how to order the result
 * @param {db/connector~findAllwithConditionByOrderCallback} Callback function
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
 * This callback is displayed as part of the Connector module.
 *
 * @callback db/connector~findAllwithConditionByOrderCallback
 * @param {List<Object>} the documents that match the query criteria with given order condition.
 */

/**
 * process data records and return computed results from db
 * 
 * @param {string} collection name
 * @param {Object} conditional document that contain conditions to filter out
 * @param {db/connector~aggreateCallback} Callback function
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
 * This callback is displayed as part of the Connector module.
 *
 * @callback db/connector~aggreateCallback
 * @param {Object} computed results with given conditions
 */
