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


describe("#netIdExist()", function(){
	var result = false;
	
	beforeEach(function(done) {
		db.netIdExist('choi', function(data) {
			result = data;
			done();
		});
	});
   
	it("Should retrieve targetted account information(Test reulst would be '1234')", function(){   
		assert.equal(result, true); 
	});
});


describe("#isValidLogin()", function(){
	var userdoc = null;
	
	beforeEach(function(done) {
		db.isValidLogin('asdf', '1234', function(data) {
			userdoc = data;
			done();
		});
	});
   
	it("Should retrieve targetted account information", function(){
		assert.ok(userdoc != null);
	});
});

describe("#isValidLogin()", function(){
	var userdoc = null;
	
	beforeEach(function(done) {
		db.isValidLogin('asdf123', '1234', function(data) {
			userdoc = data;
			done();
		});
	});
   
	it("Should retrieve targetted account information", function(){
		assert.ok(userdoc == null);
	});
});



describe("#register()", function(){
	var result = false;
	
	beforeEach(function(done) {
		tester = {
			netId : 'tester123',
			firstName : 'Tester',
			lastName : 'Lee',
			department : 'CS',
			userType : 'S',
			interests : 'You',
			extension : {
				classStanding : 'Sophomore',
				degree : 'Graduate'
			},
		};
		db.register(tester, '1234', function(data) {
			db.netIdExist('tester123', function(data) {
				result = data;
				done();
			});
		});
	});
   
	it("Should retrieve targetted account information", function(){   
		assert.equal(result, true); 
	});
});