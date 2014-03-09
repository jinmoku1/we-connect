/**
 * 
 * 
 */

var assert = require('assert')
	,db = require('./account');


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