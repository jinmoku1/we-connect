/**
 * New node file
 */

db = require('./db');

//db.put({ netId: 'scha3', password: '1234'});

db.getByNetId('scha3', function(data) {
	console.log(data);
});