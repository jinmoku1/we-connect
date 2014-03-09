/**
 * New node file
 */

var assert = require('assert');
var db = require('./db');

describe("Mocha Ajax Tests", function(){
	var password = null;
	
	beforeEach(function(done) {
		db.getByNetId('scha3', function(data) {
			password = data['password'];
			done();
		});
	});
   
	it("flag should be true", function(){
		console.log('i m done');
		assert.equal(password, '1234'); 
	});
});