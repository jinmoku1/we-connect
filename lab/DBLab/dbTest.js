/**
 * Database Automate Test File.
 * @author choi196, slee361
 */

var WeConnect = require('./db').WeConnect,
	assert = require('assert');

describe("MongoDB", function(){
	describe("#WeConnect", function(){
		describe(".constructor()", function(){
			it("should open the target server with the given port.", function(){
				this.weConnect = new WeConnect("hay.synology.me", 27017, function(err, db){
					assert.equal(null, err);
				});
			});
		});
	});
});