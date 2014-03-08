var MongoClient = require('mongodb');

// Connect to the db
MongoClient.connect("mongodb://hay.synology.me:27017", function(err, db){
	if(!err) {
		console.log("Hello, World");
	}
});