var MongoClient = require('mongodb');

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
	if(err) { return console.dir(err); }
	
	var collection = db.collection('test');
	
	var doc1 = {'hello':'doc1'};
	var doc2 = {'hello':'doc2'};
	var lotsOfDocs = [ {'hello':'doc3'}, {'hello':'doc4'} ];

	//collection.insert(doc1);
	// Taking advantage of the async behavior 
	// and not needing confirmation about the persisting of the data to Mongo DB
	// we just fire off the insert (we are doing live analytics, loosing a couple of records does not matter).
	
	
	collection.insert(doc2, {w:1}, function(err, result) {});
	// That document needs to stick. Using the {w:1} option ensure that 
	// you get the error back if the document fails to insert correctly.
	
	collection.insert(lotsOfDocs, {w:1}, function(err, result) {});
	
	db.close();
});