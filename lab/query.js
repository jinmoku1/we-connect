var MongoClient = require('mongodb');

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db){
	if(err) { return console.dir(err); }

	var collection = db.collection('test');
	var docs = [{mykey:1}, {mykey:2}, {mykey:3}];
	collection.insert(docs, {w:1}, function(err, result) {

	    collection.find().toArray(function(err, items) {});
	    // this query will fetch all the document in the collection and return them as an array of items. 
	    // Be careful with the function toArray as it might cause a lot of memory usage 
	    // as it will instantiate all the document into memory before returning the final array of items.
	    // If you have a big resultset you could run into memory issues.
	    
	    var stream = collection.find({mykey:{$ne:2}}).stream();
	    stream.on("data", function(item) {});
	    stream.on("end", function() {});
	    // This is the preferred way if you have to retrieve a lot of data for streaming, 
	    // as data is deserialized a data event is emitted. This keeps the resident memory usage low as the documents are streamed to you.
	    // Very useful if you are pushing documents out via websockets or some other streaming socket protocol.
	    // Once there is no more document the driver will emit the end event to notify the application that it’s done.
	    
	    
	    collection.findOne({mykey:1}, function(err, item) {});

	});
});