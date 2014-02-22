var MongoClient = require('mongodb');

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db){
	if(err) { return console.dir(err); }
	
	
	db.collection('test', function(err, collection) {});

	//db.collection('test', {w:1}, function(err, collection) {});

	db.createCollection('test', function(err, collection) {});

	//db.createCollection('test', {w:1}, function(err, collection) {});
});