/**
 * You must have installed mocha in global level, use following commands to do so:
 * 
 * 	sudo install -g mocha
 * 
 * Then you can run the test with following command:
 * 
 * 	mocha tests/sample.js
 * 
 */

var assert = require('assert');

describe('Array', function() {
	describe('#indexOf()', function() {
		it("Should return -1 when the value is not present", function() {
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});
});