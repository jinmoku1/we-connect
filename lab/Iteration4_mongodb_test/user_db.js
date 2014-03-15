var userConst = require('./constants').user;
var connector = require('./connector');

//--------------- Utility Functions --------------- //

function detailToBrief(userDetail) {
	return {
		detailId : userDetail._id,
		netId : userDetail.netId,
		firstName : userDetail.firstName,
		lastName : userDetail.lastName,
		department : userDetail.department,
		userType : userDetail.userType
	};
}

function detailToAccount(userDetail, password) {
	return {
		detailId : userDetail['_id'],
		netId : userDetail['netId'],
		password : password	
	};
}

//--------------- Common Operations --------------- //

//schema for userDetail
function schema(userType) {
	var userDetail = {
		_id				: null,
		netId			: null,
		firstName		: null,
		lastName		: null,
		profilePicUrl	: null,
		intro			: null,
		userType		: userType,
		
		// academic
		department		: null,
		interests		: [],
		
		// operations
		followings		: [],
		followees		: [],
		bookmarkedAnncs	: [],
		appliedAnncs	: [],
		
		// based on userType
		extension		: null,
	};
	
	switch (userType) {
	case userConst.TYPE_STUDENT:
		userDetail.extension = {
			canPost			: false,
			overallGPA		: 0,
			overallGPA		: 0,
			degree			: null,
			classStanding	: null,
			courseTaken		: [],
			resumeUrl		: null,
			anncPrefenreces	: [],
		};
		break;
	case userConst.TYPE_FACULTY:
		userDetail.extension = {
			websiteUrl		: null,
			courseTaught	: [],
		};
		break;
	}
	
	return userDetail;
}

// create profile page
exports.create = function(post, callback) {
	var userDetail = schema(post.userType);
	
	// schema build up from post data
	userDetail.netId = post.netId;
	userDetail.firstName = post.firstName;
	userDetail.lastName = post.lastName;
	userDetail.interests = post.interests;
	userDetail.department = post.department;
	
	switch (post.userType) {
	case userConst.TYPE_STUDENT:
		userDetail.extension.degree = post.degree;
		userDetail.extension.classStanding = post.classStanding;
		break;
	case userConst.TYPE_FACULTY:
		break;
	default: break;
	}
	
	var password = post.password;

	connector.save(userConst.db.USER_DETAILS, userDetail, function(db, detailDoc) {
		// update with generated _id
		userDetail = detailDoc;
		var userBrief = detailToBrief(userDetail);
		var userAccount = detailToAccount(userDetail, password);
		
		connector.save(userConst.db.USER_BRIEFS, userBrief, function(db, briefDoc) {
			connector.save(userConst.db.USER_ACCOUNTS, userAccount, function(db, accountDoc) {
				db.close();
				callback(userDetail);
			});
		});
	});
};

// remove(disjoin) profile
exports.remove = function(_id, callback) {
	connector.remove(userConst.db.USER_ACCOUNTS, { detailId : _id }, function(db, accountRemoved) {
		if (!accountRemoved) {
			db.close();
			callback(accountRemoved);
			return;
		}
		connector.remove(userConst.db.USER_BRIEFS, { detailId : _id}, function(db, briefRemoved) {
			if (!briefRemoved) {
				db.close();
				callback(briefRemoved);
				return;
			}
			
			connector.remove(userConst.db.USER_DETAILS, _id, function(db, detailRemoved) {
				db.close();
				callback(detailRemoved);
			});
		});
	});
};

// update profile
exports.updateInfo = function(updateDoc, callback) {
	var netId = updateDoc.netId;
	
	connector.findOne(userConst.db.USER_ACCOUNTS, {netId : netId}, function(db, userAccountDoc) {
		// There would be more collections to be updated
		connector.update(userConst.db.USER_ACCOUNTS, { netId : netId }, updateDoc, function(db, result) {
			db.close();
			callback(result);
		});
	});
};

// update password
exports.updatePassword = function(updateDoc, callback) {
	var netId = updateDoc.netId;
	var password = updateDoc.password;
	var newPassword = updateDoc.newPassword;
	var confirmPassword = updateDoc.confirmPassword;
	
	connector.update(userConst.db.USER_ACCOUNTS, { netId : netId, password : password }, updateDoc, function(db, result) {
		if(newPassword === confirmPassword) {
			updateDoc.password = newPassword;
			delete updateDoc["newPassword"];
			delete updateDoc["confirmPassword"];
			connector.update(userConst.db.USER_ACCOUNTS, { netId : netId, password : password }, updateDoc, function(db, result) {
				db.close();
				callback(true);
			});
		}
		else {
			console.log("Confirmed passwrod is not matched to new password");
			db.close();
			callback(false);
		}
	});
};

//
exports.getBriefs = function(callback) {
	// to be implemented
};

//
exports.getDetail = function(_id, callback) {
	// to be implemented
};

// --------------- Object Specific Operations --------------- //

exports.isValidLogin = function(netId, password, callback) {
	connector.findOne(userConst.db.USER_ACCOUNTS, { netId : netId, password : password },
	function(db, userAccountDoc) {
		if (userAccountDoc) {
			connector.findOne(userConst.db.USER_DETAILS, { _id : userAccountDoc.detailId }, 
			function(db, userDetailDoc) {
				db.close();
				callback(userDetailDoc);
			});
		}
		else {
			db.close();
			callback(null);
		}
	});
};

// check ID is existed
exports.netIdExists = function(netId, callback) {
	connector.findOne(userConst.db.USER_ACCOUNTS, { netId : netId },
	function(db, userAccountDoc) {
		db.close();
		callback(userAccountDoc != null);
	});
};