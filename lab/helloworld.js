var MongoClient = require('mongodb');

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db){
    if(err) { return console.dir(err); }

    //db.createCollection('testData', {strict:true}, function(err, collection){});
    //db.createCollection('testData2', {strict:true}, function(err, collection){});

    var collection = db.collection('testData');
    var doc1 = {'hello' : 'doc1'};
    var doc2 = {'hello' : 'doc2'};
    var lotsOfDocs = [{'hello':'doc3'}, {'hello':'doc4'}];

    // This somewhat works.
    collection.insert(doc1, {w:1}, function(err, result){});

});



console.log("Hello World");