var MongoClient = require('mongodb');

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db){
	if(err) { return console.dir(err); }
	
	var collection = db.collection('test');
	
	collection.remove( { hello : 'doc3'}, {w:1}, function(err, numOfRemovedDocs) {} );
	db.close();
});