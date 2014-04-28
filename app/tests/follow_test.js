

var assert = require('assert');
var userDb = require('../db/user_db');
var api = require('../controls/api_control');
var userConst = require('../constants').user;


describe("#addingDummies", function() {
	this.timeout(0);
	var result;
	
	var post1 = {
			netId			: 'following',
			password		: '1',
			firstName		: 'Jessica',
			lastName		: 'Alba',
			department		: 'CS',
			userType		: userConst.TYPE_STUDENT,
			interests		: [],
			classStanding	: 'Junior',
			degree			: 'Bachelor\'s',
	};

	var post2 = {
			netId			: 'follower',
			password		: '1',
			firstName		: 'Jessica',
			lastName		: 'Alba',
			department		: 'CS',
			userType		: userConst.TYPE_STUDENT,
			interests		: [],
			classStanding	: 'Junior',
			degree			: 'Bachelor\'s',
	};

	before(function(done) {
		userDb.create(post1, function(following) {
			userDb.create(post2, function(follower) {
				result = follower;
				done();
			});
		});
	});
	
	it("Adding new users", function() {
		assert(result != null);
	});
});

describe("#addFollowing(toggle)", function() {
	this.timeout(0);
	var result = false;

	before(function(done) {
		userDb.isValidLogin("following", "1", function(following) {
			userDb.isValidLogin("follower", "1", function(follower) {
				api.addFollowing(following._id, follower, function(success) {
					result = success;
					done();
				});
			});
		});
	});
	
	it("Should add following to the follower", function() {
		assert(result);
	});
});

describe("#deleteFollowing(toggle)", function() {
	this.timeout(0);
	var result = false;

	before(function(done) {
		userDb.isValidLogin("following", "1", function(following) {
			userDb.isValidLogin("follower", "1", function(follower) {
				api.addFollowing(following._id, follower, function(success) {
					result = success;
					done();
				});
			});
		});
	});
	
	it("Should delete following from the follower", function() {
		assert(result);
	});
});

describe("#addFollower(toggle)", function() {
	this.timeout(0);
	var result = false;

	before(function(done) {
		userDb.isValidLogin("following", "1", function(following) {
			userDb.isValidLogin("follower", "1", function(follower) {
				api.addFollower(following._id, follower, function(success) {
					result = success;
					done();
				});
			});
		});
	});
	
	it("Should add the follower to the following", function() {
		assert(result);
	});
});

describe("#deleteFollower(toggle)", function() {
	this.timeout(0);
	var result = false;

	before(function(done) {
		userDb.isValidLogin("following", "1", function(following) {
			userDb.isValidLogin("follower", "1", function(follower) {
				api.addFollower(following._id, follower, function(success) {
					result = success;
					done();
				});
			});
		});
	});
	
	it("Should delete the follower from the following", function() {
		assert(result);
	});
});

describe("#removingDummies", function() {
	this.timeout(0);
	var result = false;

	before(function(done) {
		userDb.isValidLogin("following", "1", function(following) {
			userDb.isValidLogin("follower", "1", function(follower) {
				userDb.remove(following._id, function(removed1) {
					userDb.remove(follower._id, function(removed2) {
						result = removed2;
						done();
					});
				});
			});
		});
	});

	it("Removing user", function() {
		assert(result == true);
	});
});
