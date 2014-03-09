/**
 * New node file
 */

var Db = require('mongodb').Db
	, Connection = require('mongodb').Connection
	, Server = require('mongodb').Server
	, BSON = require('mongodb').BSON
	, ObjectID = require('mongodb').ObjectID;

Account = function(host, port, callback) {
	this.db = new Db('weconnect', new Server(host, port, {auto_reconnect: true}), {safe:true});
	this.db.open(function(err, db) {
		if(err) callback(err);
		else callback(null, db);
	});
};

Account.prototype.getCollection = function(callback) {
	this.db.collection("accounts", function(err, collection) {
		if(err) callback(err);
		else callback(null, collection);
	});
};


//_id: accounts_collection.db.bson_serializer.ObjectID.createFromHexString(id)
Account.prototype.findById = function(id, callback) {
    this.getCollection(function(err, accounts_collection) {
      if(err) callback(err);
      else {
    	  accounts_collection.findOne({ netId: id }, function(err, result) {
          if(err) callback(err);
          else {
        	  callback(null, result);
          }
        });
      }
    });
};


Account.prototype.close = function() {
	this.db.close();
};

exports.Account = Account;