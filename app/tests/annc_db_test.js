// Global variables to import
var assert = require('assert'),
	anncDb = require('../db/annc_db'),
	userDb = require('../db/user_db'),
	userConst = require('../constants').user;

var dummyFaculty = null;

describe("#anncDb.createDummyFaculty()", function() {
	this.timeout(0);
	
	// Dummy Author we need.
	var post = {
			netId			: 'dummyFaculty',
			password		: 'dummydummy',
			firstName		: 'Pakurthe',
			lastName		: 'Dunn',
			department		: 'CS',
			userType		: userConst.TYPE_FACULTY,
			interests		: [],
			classStanding	: 'Junior',
			degree			: 'Bachelor\'s',
	};
	
	before(function(done) {
		userDb.create(post, function(userDetailDoc) {
			dummyFaculty = userDetailDoc;
			done();
		});
	});
	it("should create dummy faculty member for posting announcement page.", function() {
		assert(dummyFaculty != null);
		//console.log(dummyFaculty);
	});
});







describe("#anncDb.removeDummyFaculty()", function() {
	// Timeout inf.
	this.timeout(0);
	
	var userRemoved = false;
	var netId = 'dummyFaculty',
		password = 'dummydummy';
	
	before(function(done) {
		userDb.isValidLogin(netId, password, function(detailDoc) {
			userDb.remove(detailDoc._id, function(removed) {
				userRemoved = removed;
				dummyFaculty = null;
				done();
			});
		});
	});

	it("should remove the dummy user.", function() {
		assert(userRemoved == true);
	});
});