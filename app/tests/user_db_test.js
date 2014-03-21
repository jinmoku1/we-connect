var assert = require('assert');
var userDb = require('../db/user_db');
var userConst = require('../constants').user;

describe("#userDb.create()", function() {
	this.timeout(0);
	var registeredUser = null;

	var post = {
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

	before(function(done) {
		userDb.create(post, function(userDetailDoc) {
			registeredUser = userDetailDoc;
			done();
		});
	});

	it("should register a new user and new user", function() {
		assert(registeredUser != null);
	});

	it("should have an autogenerated _id", function() {
		assert(registeredUser._id != null);
	});

	it("should have an autogenerated briefId", function(){
		assert(registeredUser.briefId != null);
	});

	it("should have set the net id", function() {
		assert(registeredUser.netId == 'newuser1');
	});

	it("should have the same first name", function() {
		assert(registeredUser.firstName == 'Jessica');
	});

	it("should have the same last name", function() {
		assert(registeredUser.lastName == 'Alba');
	});

	it("should have the same department", function() {
		assert(registeredUser.department == 'CS');
	});

	it("should have the right class standing as an extension", function() {
		assert(registeredUser.extension.classStanding == 'Junior');
	});

	it("should have the right degree as an extension", function() {
		assert(registeredUser.extension.degree == 'Bachelor\'s');
	});
});

describe("#userDb.netIdExists()", function() {
	this.timeout(0);
	var validNetIdExists = false;
	var nonvalidNetIdExists = true;

	var validNetId = 'newuser1';
	var nonvalidNetId = '238hodfnklf2fwf';

	before(function(done) {
		userDb.netIdExists(validNetId, function(exists) {
			validNetIdExists = exists;
			userDb.netIdExists(nonvalidNetId, function(exists) {
				nonvalidNetIdExists = exists;
				done();
			});
		});
	});

	it("can check if a a given net id exists in the database (valid)", function() {
		assert(validNetIdExists == true);
	});

	it("can check if a a given net id exists in the database (non-valid)", function() {
		assert(nonvalidNetIdExists == false);
	});
});

describe("#userDb.isValidLogin()", function() {
	this.timeout(0);
	var validUserDetail = null;
	var nonvalidUserDetail = {};

	var netId = 'newuser1';
	var validPassword = 'welovedarko';
	var nonvalidPassword = 'wehatedarko';

	before(function(done) {
		userDb.isValidLogin(netId, validPassword, function(userDetailDoc) {
			validUserDetail = userDetailDoc;
			userDb.isValidLogin(netId, nonvalidPassword, function(userDetailDoc) {
				nonvalidUserDetail = userDetailDoc;
				done();
			});
		});
	});

	it("should retrive null in calse of nonvalid password", function() {
		assert(nonvalidUserDetail == null);
	});

	it("should retrive a valid user detail", function() {
		assert(validUserDetail != null);
	});

	it("should retrive the _id", function() {
		assert(validUserDetail._id != null);
	});

	it("should retrieve the valid net id", function() {
		assert(validUserDetail.netId == 'newuser1');
	});

	it("should retrieve the valid first name", function() {
		assert(validUserDetail.firstName == 'Jessica');
	});

	it("should retrieve the valid last name", function() {
		assert(validUserDetail.lastName == 'Alba');
	});

	it("should retrieve the valid department", function() {
		assert(validUserDetail.department == 'CS');
	});

	it("should retrieve the valid class standing as an extension", function() {
		assert(validUserDetail.extension.classStanding == 'Junior');
	});

	it("should retrieve the valid degree as an extension", function() {
		assert(validUserDetail.extension.degree == 'Bachelor\'s');
	});
});


describe("#userDb.updatePassword()", function(){
	this.timeout(0);
	var oldPassword = "welovedarko";
	var mockAccount = {
			netId : "newuser1",
			password : "12345",
			detailId : ""
	};
	var isValid = false;

	before(function(done){
		userDb.isValidLogin(mockAccount.netId, oldPassword, function(userDetailDoc) {
			mockAccount.detailId = userDetailDoc._id;

			userDb.updatePassword(mockAccount, oldPassword, function(result) {
				isValid = result;
				done();
			});
		});
	});
	it("should change the user's password successfuly", function() {
		assert(isValid == true);
	});
});

describe("#userDb.getDetail()", function(){
	this.timeout(0);
	var isValid = false;

	var netId = 'newuser1', password = '12345';
	var actualResult = null;
	var expectedResult = {
			firstName		: 'Jessica',
			lastName		: 'Alba',
			department		: 'CS',
			userType		: userConst.TYPE_STUDENT,
			classStanding	: 'Junior',
			degree			: 'Bachelor\'s',
	};
	
	before(function(done){
		userDb.isValidLogin(netId, password, function(detailDoc){
			objectId = detailDoc._id;
			userDb.getDetail(detailDoc._id, function(resultDoc){
				isValid = (resultDoc != null);
				actualResult = resultDoc;
				done();
			});
		});
	});
	
	it("should update the first name.", function() {
		assert(actualResult.firstName == expectedResult.firstName);
	});

	it("should update the last name.", function(){
		assert(actualResult.lastName == expectedResult.lastName);
	});

	it("should update the department the user belongs to.", function(){
		assert(actualResult.department == expectedResult.department);
	});

	it("should update the class standing.", function(){
		assert(actualResult.extension.classStanding == expectedResult.classStanding);
	});

	it("should update the degree in which you are currently.", function(){
		assert(actualResult.extension.degree == expectedResult.degree);
	});

	it("should return true value from the callback.", function(){
		assert(isValid);
	});
	
});

describe("#userDb.updateInfo()", function(){
	this.timeout(0);
	var isValid = false;
	var changedValues = null;;
	var netId = 'newuser1';
	var password = '12345';

	var expectedResult = {
			firstName		: "H. Seung",
			lastName		: "Cha",
			department		: "ACE",
			userType		: userConst.TYPE_STUDENT,
			interests		: [],
			classStanding	: 'Senior',
			degree			: 'Master',
	};

	before(function(done){
		userDb.isValidLogin(netId, password, function(detailDoc){
			var updateInfo = detailDoc;

			updateInfo.firstName = expectedResult.firstName;
			updateInfo.lastName  = expectedResult.lastName;
			updateInfo.department = expectedResult.department;
			updateInfo.classStanding = expectedResult.classStanding;
			updateInfo.degree = expectedResult.degree;

			userDb.updateInfo(updateInfo._id, updateInfo, function(result){
				isValid = result;
				changedValues = updateInfo;
				done();
			});
		});
	});

	it("should update the first name.", function() {
		assert(changedValues.firstName == expectedResult.firstName);
	});

	it("should update the last name.", function(){
		assert(changedValues.lastName == expectedResult.lastName);
	});

	it("should update the department the user belongs to.", function(){
		assert(changedValues.department == expectedResult.department);
	});

	it("should update the class standing.", function(){
		assert(changedValues.classStanding == expectedResult.classStanding);
	});

	it("should update the degree in which you are currently.", function(){
		assert(changedValues.degree == expectedResult.degree);
	});

	it("should return true value from the callback.", function(){
		assert(isValid);
	});
});

describe("#userDb.remove()", function() {
	this.timeout(0);
	var userRemoved = false;

	var netId = 'newuser1';
	var password = '12345';

	before(function(done) {
		userDb.isValidLogin(netId, password, function(detailDoc) {
			userDb.remove(detailDoc._id, function(removed) {
				userRemoved = removed;
				done();
			});
		});
	});

	it("should remove the user with detail _id", function() {
		assert(userRemoved == true);
	});
});


describe("#userDb.getBriefs() without condition", function() {
	this.timeout(0);
	var isValid = false;

	before(function(done){
		userDb.getBriefs({}, function(docs) {
			isValid = (docs != null);
			done();
		});
	});

	it("should return all brief information.", function() {
		assert(isValid);
	});

});