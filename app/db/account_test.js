/**
 * 
 * 
 */

var assert = require('assert'),
	Account = require('./account').Account;

describe('Account', function() {
	describe('#init()', function() {
		it("Should Open Server with the given port", function() {
			this.account = new Account('hay.synology.me', 27017, function(err, db) {
				assert.equal(null, err);
			});
		});
	});
});


describe('Account', function() {
	var account = new Account('hay.synology.me', 27017, function(err, db) {});
	
	describe('#getCollection()', function() {
		it("Should retrieve targeted collection(accounts)", function() {
			account.getCollection(function(err, collection) {
				assert.equal(null, err);
			});
		});
	});
	
	describe('#findById()', function() {
		it("Should retrieve targetted account information", function() {
			account.findById('choi', function(err, result) {
				//assert.equal(null, err);
				console.log(result);
			});
		});
	});
	
	account.close();
});
