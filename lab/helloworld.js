var MongoClient = require('mongodb');

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db){
	if(!err) {
		console.log("Hello, World");
	}
});