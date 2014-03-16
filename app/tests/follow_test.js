

var assert = require('assert');
var userDb = require('../db/user_db');
var api = require('../controls/api_control');
var userConst = require('../constants').user;


describe("#follow", function() {
	this.timeout(0);
	var result1 = null;

	var post1 = {
			netId			: 'newuser1',
			password		: 'welovedarko',
			firstName		: 'Jessica',
			lastName		: 'Alba',
			department		: 'CS',
			userType		: userConst.TYPE_STUDENT,
			interests		: [],
			classStanding	: 'Junior',
			degree			: 'Bachelor\'s',
	};
	
	var post2 = {
			netId			: 'newuser2',
			password		: 'welovedarko',
			firstName		: 'Jessica',
			lastName		: 'Alba',
			department		: 'CS',
			userType		: userConst.TYPE_STUDENT,
			interests		: [],
			classStanding	: 'Junior',
			degree			: 'Bachelor\'s',
	};

	before(function(done) {
		userDb.create(post1, function(followee) {
			userDb.create(post2, function(following) {
				result1 = api.addFollowee(followee._id, followee.name, following);
				done();
			});
		});
	});
	
	it("Should add followee to the following", function() {
		assert(result1 == 1);
	});
});


