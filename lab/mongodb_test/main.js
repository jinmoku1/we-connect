/**
 * New node file
 */

db = require('./db');

db.put({ netId: 'scha3', password: '1234' }, function(doc) {
	console.log(doc[0]['_id']);
});

/*
db.getByNetId('scha3', function(data) {
	console.log(data);
});
*/