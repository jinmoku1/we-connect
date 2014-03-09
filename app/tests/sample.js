/**
 * You must have installed mocha in global level, use following commands to do so:
 * 
 * 	sudo npm install -g mocha
 * 
 * Then you can run the test with following command:
 * 
 * 	mocha tests/sample.js
 * 
 */

var assert = require('assert')
	,db = require('../db/account');


describe("#findById()", function(){
	var password = null;
	
	beforeEach(function(done) {
		db.getByNetId('choi', function(data) {
			password = data['password'];
			done();
		});
	});
   
	it("Should retrieve targetted account information", function(){   
		assert.equal(password, '1234'); 
	});
});