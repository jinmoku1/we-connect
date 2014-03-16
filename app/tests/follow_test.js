

var assert = require('assert');
var userDb = require('../db/user_db');
var api = require('../controls/api_control');
var userConst = require('../constants').user;


describe("#addingDummies", function() {
	this.timeout(0);
	var result;
	
	var post1 = {
			netId			: 'followee',
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

	before(function(done) {
		userDb.create(post1, function(followee) {
			userDb.create(post2, function(following) {
				result = following;
				done();
			});
		});
	});
	
	it("Adding new users", function() {
		assert(result != null);
	});
});

describe("#addFollowee(toggle)", function() {
	this.timeout(0);
	var result = false;

	before(function(done) {
		userDb.isValidLogin("followee", "1", function(followee) {
			userDb.isValidLogin("following", "1", function(following) {
				api.addFollowee(followee._id, following, function(success) {
					result = success;
					done();
				});
			});
		});
	});
	
	it("Should add followee to the following", function() {
		assert(result);
	});
});

describe("#deleteFollowee(toggle)", function() {
	this.timeout(0);
	var result = false;

	before(function(done) {
		userDb.isValidLogin("followee", "1", function(followee) {
			userDb.isValidLogin("following", "1", function(following) {
				api.addFollowee(followee._id, following, function(success) {
					result = success;
					done();
				});
			});
		});
	});
	
	it("Should delete followee from the following", function() {
		assert(result);
	});
});

describe("#addFollowing(toggle)", function() {
	this.timeout(0);
	var result = false;

	before(function(done) {
		userDb.isValidLogin("followee", "1", function(followee) {
			userDb.isValidLogin("following", "1", function(following) {
				api.addFollowing(followee._id, following, function(success) {
					result = success;
					done();
				});
			});
		});
	});
	
	it("Should add the following to the followee", function() {
		assert(result);
	});
});

describe("#deleteFollowing(toggle)", function() {
	this.timeout(0);
	var result = false;

	before(function(done) {
		userDb.isValidLogin("followee", "1", function(followee) {
			userDb.isValidLogin("following", "1", function(following) {
				api.addFollowing(followee._id, following, function(success) {
					result = success;
					done();
				});
			});
		});
	});
	
	it("Should delete the following from the followee", function() {
		assert(result);
	});
});

describe("#removingDummies", function() {
	this.timeout(0);
	var result = false;

	before(function(done) {
		userDb.isValidLogin("followee", "1", function(followee) {
			userDb.isValidLogin("following", "1", function(following) {
				userDb.remove(followee._id, function(removed1) {
					userDb.remove(following._id, function(removed2) {
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
