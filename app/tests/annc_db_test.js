// Global variables to import
var assert = require('assert'),
	anncDb = require('../db/annc_db'),
	userDb = require('../db/user_db'),
	connector = require('../db/connector');

var	GLOBALCONST = require('../constants');

var DUMMY_NETID = 'dummyFaculty',
	DUMMY_PSWD  = 'dummydummy',
	DUMMY_FIRST = 'Pakurthe',
	DUMMY_LAST  = 'Dunn',
	DUMMY_DEP   = 'CS',
	DUMMY_USERTYPE = GLOBALCONST.user.TYPE_FACULTY;

var DUMMY_ANNC_TITLE = 'Dummy Title 01',
	DUMMY_ANNC_TYPES = [GLOBALCONST.anncTypes[0], GLOBALCONST.anncTypes[2]],
	DUMMY_ANNC_INTERESTS = [GLOBALCONST.interests[0], GLOBALCONST.interests[3]],
	DUMMY_ANNC_COURSES = [GLOBALCONST.courses[0], GLOBALCONST.courses[1]],
	DUMMY_ANNC_DEGREE = 1,
	DUMMY_ANNC_OVERALLGPA = 3.5,
	DUMMY_ANNC_TECHGPA = 3.75,
	DUMMY_ANNC_CLASSSTANDING = 4,
	DUMMY_ANNC_RESUME = true,
	DUMMY_ANNC_CONTENT = 'Hello, world!',
	DUMMY_ANNC_STATUS = 1;

var DUMMY_ANNC_UPDATED_TITLE = '10 eltiT ymmuD',
	DUMMY_ANNC_UPDATED_TYPES = [GLOBALCONST.anncTypes[1]],
	DUMMY_ANNC_UPDATED_INTERESTS = [GLOBALCONST.interests[2], GLOBALCONST.interests[4]],
	DUMMY_ANNC_UPDATED_COURSES = [GLOBALCONST.courses[1], GLOBALCONST.courses[3]],
	DUMMY_ANNC_UPDATED_DEGREE = 1,
	DUMMY_ANNC_UPDATED_OVERALLGPA = 3,
	DUMMY_ANNC_UPDATED_TECHGPA = 3.5,
	DUMMY_ANNC_UPDATED_CLASSSTANDING = 3,
	DUMMY_ANNC_UPDATED_RESUME = false,
	DUMMY_ANNC_UPDATED_CONTENT = 'Hello, seniors!',
	DUMMY_ANNC_UPDATED_STATUS = 0;


var 

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
			//profilePicUrl	: 'https://where.is/my_pic.jpg'
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
		title : DUMMY_ANNC_TITLE,
		timeStamp : null,
		anncTypes : DUMMY_ANNC_TYPES,
		interests : DUMMY_ANNC_INTERESTS,
		coursesTaken : DUMMY_ANNC_COURSES,
		degree : DUMMY_ANNC_DEGREE,
		overallGPA : DUMMY_ANNC_OVERALLGPA,
		technicalGPA : DUMMY_ANNC_TECHGPA,
		classStanding : DUMMY_ANNC_CLASSSTANDING,
		resumeRequired : DUMMY_ANNC_RESUME,
		content : DUMMY_ANNC_CONTENT,
		status : DUMMY_ANNC_STATUS
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
	
	it("should create Announcement information from a raw data.", function() {
		assert(expectedAnnc != null);
	});
	
	it("should return a correct author name.", function(){
		assert(expectedAnnc.author.name == "Dunn, Pakurthe");
	});
	
	it("should return a correct author netid.", function(){
		assert(expectedAnnc.author.netId == "dummyFaculty");
	});
	
	it("should return a correct url address of the author.", function(){
		assert(expectedAnnc.author.profilePic == null);
	});
	
	it("should return a correct title of the announcement.", function(){
		assert(expectedAnnc.title == DUMMY_ANNC_TITLE);
	});
	
	it("should return a correct timestamp of the announcement.", function(){
		assert(expectedAnnc.timeStamp == null);
	});
	
	it("should return a correct array of the announcement types.", function(){
		//anncTypes : [GLOBALCONST.anncTypes[0], GLOBALCONST.anncTypes[2]],
		assert(expectedAnnc.anncTypes[0] == GLOBALCONST.anncTypes[0]);
		assert(expectedAnnc.anncTypes[1] == GLOBALCONST.anncTypes[2]);
	});

	it("should return a correct array of the announcement interests.", function(){
//		interests : [GLOBALCONST.interests[0], GLOBALCONST.interests[3]]
		assert(expectedAnnc.interests[0] == GLOBALCONST.interests[0]);
		assert(expectedAnnc.interests[1] == GLOBALCONST.interests[3]);
	});
	
	it("should return a correct array of the announcement courses.", function(){
//		coursesTaken : [GLOBALCONST.courses[0], GLOBALCONST.courses[1]]
		assert(expectedAnnc.coursesTaken[0] == GLOBALCONST.courses[0]);
		assert(expectedAnnc.coursesTaken[1] == GLOBALCONST.courses[1]);
	});
	
	it("should return a correct degree that is at least requirement of the announcement.", function(){
//		degree : 1
		assert(expectedAnnc.degree == 1);
	});
	
	it("should return a correct minimum overall GPA of the announcement.", function(){
		assert(expectedAnnc.overallGPA == 3.5);
	});
	
	it("should return a correct minimum technical GPA of the announcement.", function(){
//		technicalGPA : 3.75,
		assert(expectedAnnc.technicalGPA == 3.75);
	});
	
	it("should return a correct minimum standing required to apply to the announcement.", function(){
//		classStanding : 4,
		assert(expectedAnnc.classStanding == 4);
	});
	
	it("should return a correct boolean value of resumeRequired.", function(){
//		resumeRequired : true,		
		assert(expectedAnnc.resumeRequired == true);
	});

	it("should return a correct content of the announcement.", function(){
//		content : "Hello, world!"
		assert(expectedAnnc.content == "Hello, world!"); 
	});

	it("should return a correct status of the announcement.", function(){
//		status : 1
		assert(expectedAnnc.status == 1);
	});
});

describe("#anncDb.updateInfo()", function(){

	// Timeout inf.
	this.timeout(0);

	var newInfo = {
		title : DUMMY_ANNC_UPDATED_TITLE,
		timeStamp : null,
		anncTypes : DUMMY_ANNC_UPDATED_TYPES,
		interests : DUMMY_ANNC_UPDATED_INTERESTS,
		coursesTaken : DUMMY_ANNC_UPDATED_COURSES,
		degree : DUMMY_ANNC_UPDATED_DEGREE,
		overallGPA : DUMMY_ANNC_UPDATED_OVERALLGPA,
		technicalGPA : DUMMY_ANNC_UPDATED_TECHGPA,
		classStanding : DUMMY_ANNC_UPDATED_CLASSSTANDING,
		resumeRequired : DUMMY_ANNC_UPDATED_RESUME,
		content : DUMMY_ANNC_UPDATED_CONTENT,
		status : DUMMY_ANNC_UPDATED_STATUS
	};
	var actualAnnc = null;
	
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
				newInfo.author = author;
				connector.findOne(GLOBALCONST.annc.db.ANNC_DETAILS, {title: DUMMY_ANNC_TITLE}, function(db, resultDoc){
					db.close();
					if(resultDoc != null)
					{
						// Actual Updation
						anncDb.updateInfo(resultDoc._id, newInfo, function(anncDetail){
							actualAnnc = anncDetail;
							done();
						});
					}
				});
			}
			
		});
	});
	
	it("should return a correct title of the updated announcement.", function(){
		assert(actualAnnc.title = DUMMY_ANNC_UPDATED_TITLE);
	});
	
	it("should return a correct array of the updated announcement types.", function(){
//		DUMMY_ANNC_UPDATED_TYPES = [GLOBALCONST.anncTypes[1]],
		assert(expectedAnnc.anncTypes[0] == GLOBALCONST.anncTypes[0]);
		assert(expectedAnnc.anncTypes[1] == GLOBALCONST.anncTypes[2]);
	});

	it("should return a correct array of the updated announcement interests.", function(){
//		DUMMY_ANNC_UPDATED_INTERESTS = [GLOBALCONST.interests[2], GLOBALCONST.interests[4]],
//		DUMMY_ANNC_UPDATED_COURSES = [GLOBALCONST.courses[1], GLOBALCONST.courses[3]],
		assert(expectedAnnc.interests[0] == GLOBALCONST.interests[0]);
		assert(expectedAnnc.interests[1] == GLOBALCONST.interests[3]);
	});
	
	it("should return a correct array of the updated announcement courses.", function(){
//		coursesTaken : [GLOBALCONST.courses[0], GLOBALCONST.courses[1]]
		assert(expectedAnnc.coursesTaken[0] == GLOBALCONST.courses[0]);
		assert(expectedAnnc.coursesTaken[1] == GLOBALCONST.courses[1]);
	});
	
	it("should return a correct degree that is at least requirement of the announcement.", function(){
//		degree : 1
		assert(expectedAnnc.degree == 1);
	});
	
	it("should return a correct minimum overall GPA of the announcement.", function(){
		assert(expectedAnnc.overallGPA == 3.5);
	});
	
	it("should return a correct minimum technical GPA of the announcement.", function(){
//		technicalGPA : 3.75,
		assert(expectedAnnc.technicalGPA == 3.75);
	});
	
	it("should return a correct minimum standing required to apply to the announcement.", function(){
//		classStanding : 4,
		assert(expectedAnnc.classStanding == 4);
	});
	
	it("should return a correct boolean value of resumeRequired.", function(){
//		resumeRequired : true,		
		assert(expectedAnnc.resumeRequired == true);
	});

	it("should return a correct content of the announcement.", function(){
//		content : "Hello, world!"
		assert(expectedAnnc.content == "Hello, world!"); 
	});

	it("should return a correct status of the announcement.", function(){
//		status : 1
		assert(expectedAnnc.status == 1);
	});
});

describe("#anncDb.remove()", function(){
	// Timeout inf.
	this.timeout(0);
	var actualFlag = false;
	
	before(function(done){
		connector.findOne(GLOBALCONST.annc.db.ANNC_DETAILS, {title: DUMMY_ANNC_UPDATED_TITLE}, function(db, resultDoc){
			db.close();
			if(resultDoc != null){
				anncDb.remove(resultDoc._id, function(isRemoved){
					actualFlag = isRemoved;
					done();
				});
			}
			return;
		});
	});
	
	it("should remove the announcement by index of that announcement.", function(){
		assert(actualFlag);
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