var userConst = require('../constants').user;
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

exports.getBriefs = function(callback) {
	// to be implemented
};

exports.getDetail = function(_id, callback) {
	// to be implemented
};

// --------------- Object Specific Operations --------------- //

/**
 * Check user typed netId and password are matched
 * 
 * @param netId user typed netId
 * @param password user typed password
 * @param callback it is just a callback function that happens when this method is done
 */
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


/**
 * Check user typed netId is existed in the database
 * 
 * @param netId user typed netId
 * @param callback it is just a callback function that happens when this method is done
 */
exports.netIdExists = function(netId, callback) {
	connector.findOne(userConst.db.USER_ACCOUNTS, { netId : netId },
	function(db, userAccountDoc) {
		db.close();
		callback(userAccountDoc != null);
	});
};