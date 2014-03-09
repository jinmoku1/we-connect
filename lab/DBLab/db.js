/**
 * New node file
 */
var Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server,
	BSON = require('mongodb').BSON;
	
WeConnect = function(host, port, callback) {
	this.db = new Db('weconnect', new Server(host, port, {auto_reconnect: true}), {safe: true});
	this.db.open(function(err, db){
		if(err)	callback(err);
		else callback(null, db);
	});
};

WeConnect.prototype.getCollection = function(callback){
	this.db.collection("accounts", function(error, collection){
		if( error ) callback(error);
		else {
			callback(null, collection);
		}
	});
};

WeConnect.prototype.findAll = function(callback) {
    this.getCollection("accounts", function(error, collection) {
    	if( error ) callback(error);
    	else {
    		collection.find().toArray(function(error, results) {
    			if( error ) callback(error);
    			else callback(null, results);
    		});
    	}
    });
};

exports.WeConnect = WeConnect;