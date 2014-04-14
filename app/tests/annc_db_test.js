// Global variables to import
var assert = require('assert'),
	anncDb = require('../db/annc_db'),
	userDb = require('../db/user_db'),
	connector = require('../db/connector');

var	GLOBALCONST = require('../constants');

describe("#anncDb.createDummyFaculty()", function() {
	this.timeout(0);
	
	// Dummy Author we need.
	var post = {
			netId			: 'dummyFaculty',
			password		: 'dummydummy',
			firstName		: 'Pakurthe',
			lastName		: 'Dunn',
			department		: 'CS',
			userType		: GLOBALCONST.user.TYPE_FACULTY,
			interests		: [],
	};
	
	var dummyFaculty = null;
	
	before(function(done) {
		userDb.create(post, function(userDetailDoc) {
			dummyFaculty = userDetailDoc;
			done();
		});
	});
	
	it("should create dummy faculty member for posting announcement page.", function() {
		assert(dummyFaculty != null);
		
	});
});


// Announcement is created or not.
describe("#anncDb.create()", function(){
	// Timeout inf.
	this.timeout(0);

	var post = {
		author : null,
		title : "Dummy Title 01",
		timeStamp : null,
		anncTypes : [GLOBALCONST.anncTypes[0], GLOBALCONST.anncTypes[2]],
		interests : [GLOBALCONST.interests[0], GLOBALCONST.interests[3]],
		coursesTaken : [GLOBALCONST.courses[0], GLOBALCONST.courses[1]],
		degree : 1,
		overallGPA : 3.5,
		technicalGPA : 3.75,
		classStanding : 4,
		resumeRequired : true,
		content : "Hello, world!",
		status : 1
	};
	
	var expectedAnnc = null;
	
	before(function(done){
		var author = {
			_id : null,
			name : null,
			netId : null,
			profilePic : null
		};
		
		connector.findOne(GLOBALCONST.user.db.USER_DETAILS, {netId: 'dummyFaculty'}, function(db, resultDoc){
			db.close();
			if(resultDoc != null){
				author._id = resultDoc._id;
				author.name = resultDoc.lastName + ", " + resultDoc.firstName;
				author.netId = resultDoc.netId;
				author.profilePic = resultDoc.profilePicUrl;
				post.author = author;
				anncDb.create(post, function(anncDetail){
					expectedAnnc = anncDetail;
					done();
				});
			}
		});
	});
	
	it("should remove the dummy user.", function() {
		assert(expectedAnnc != null);
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