/**
 * New node file
 */
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

function auth(db){
	console.log("HELLO?");
	db.authenticate("admin", "dolldolldoll");
};

WeConnect = function(host, port) {
    this.db = new Db('weconnect', new Server(host, port, {auto_reconnect: true}, {safe: true}));
	  
	// How to Authenticate admin?
	auth(this.db);
	  
	this.db.open(function(){});
};

WeConnect.close = function() {
	this.db.close();
};

exports.WeConnect = WeConnect;