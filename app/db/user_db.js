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
		userType : userDetail.userType,
		interests : userDetail.interests,
		profilePicUrl : userDetail.profilePicUrl,
	};
}

function detailToAccount(userDetail, password) {
	return {
		detailId : userDetail._id,
		netId : userDetail.netId,
		password : password	
	};
}

//--------------- Common Operations --------------- //

//schema for userDetail
function schema(userType) {
	var userDetail = {
			_id				: null,
			briefId			: null,
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
			technicalGPA	: 0,
			overallGPA		: 0,
			degree			: null,
			classStanding	: null,
			coursesTaken		: [],
			resumeUrl		: null,
			anncPrefenreces	: [],
			resumeUrl		: null,
	};
		break;
	case userConst.TYPE_FACULTY:
		userDetail.extension = {
			websiteUrl		: null,
			coursesTaught	: [],
	};
		break;
	}

	return userDetail;
}

//create profile page
exports.create = function(post, callback) {
	var userDetail = schema(post.userType);

	// schema build up from post data
	userDetail.netId = post.netId;
	userDetail.firstName = post.firstName;
	userDetail.lastName = post.lastName;
	userDetail.interests = [].concat(post.interests);
	userDetail.department = post.department;
	userDetail.intro = post.intro;

	switch (post.userType) {
	case userConst.TYPE_STUDENT:
		userDetail.extension.degree = post.degree;
		userDetail.extension.classStanding = post.classStanding;
		break;
	case userConst.TYPE_FACULTY:
		userDetail.extension.websiteUrl = post.websiteUrl;
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
				userDetail.briefId = briefDoc._id;
				connector.update(userConst.db.USER_DETAILS, { _id : briefDoc.detailId }, userDetail, function(db, detailDocFinal) {
					db.close();
					callback(userDetail);
				});
			});
		});
	});
};

//remove(disjoin) profile
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
			connector.remove(userConst.db.USER_DETAILS, {_id : _id}, function(db, detailRemoved) {
				db.close();
				callback(detailRemoved);
			});
		});
	});
};

//update profile
exports.updateInfo = function(_id, updateDoc, callback) {
	connector.update(userConst.db.USER_DETAILS, {_id : _id}, updateDoc, function(db, detailDoc){
		var briefId = detailDoc.briefId;
		var briefDoc = detailToBrief(detailDoc);
		connector.update(userConst.db.USER_BRIEFS, {_id : briefId}, briefDoc, function(db, resultBrief){
			db.close();
			callback(briefDoc != null);
		});
	});
};

//update password
exports.updatePassword = function(update, oldPassword, callback) {
	connector.update(userConst.db.USER_ACCOUNTS, { netId : update.netId, password : oldPassword }, update, function(db, result) {
		db.close();
		callback(result != null);
	});
};


exports.getBriefs = function(selector, callback) {
	connector.findAll(userConst.db.USER_BRIEFS, function(db, docs){
		db.close();
		callback(docs);
	});
};


exports.getDetail = function(_id, callback) {
	connector.findOne(userConst.db.USER_DETAILS, {_id: _id}, function(db, resultDoc){
		db.close();
		callback(resultDoc);
	});
};

//--------------- Object Specific Operations --------------- //

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

//check ID is existed
exports.netIdExists = function(netId, callback) {
	connector.findOne(userConst.db.USER_ACCOUNTS, { netId : netId },
			function(db, userAccountDoc) {
		db.close();
		callback(userAccountDoc != null);
	});
};

exports.recSys = function(netId, callback) {
	connector.findOne(userConst.db.USER_DETAILS, { netId : netId }, function(db, userDoc) {
		console.log("following number: " + userDoc.followings.length);
		
		db.close();
		callback(true);
	});
};

/*
db.userBriefs.aggregate(
    [
        { $match : { 
            netId : { $nin: ['scha3', 'slee1', 'faculty1']}
        }},
        
        { $project : {
            netId : 1,
            firstName : 1,
            lastName : 1,
            profilePicUrl : 1,
            interests : 1,
            rank : { $add: [
                { $size : {$setIntersection : [ "$interests", ["Software Engineering"]]}},
                { $cond : [{$eq : ["$department", "CS"] }, 3, 0]},
                { $cond : [{$eq : ["$userType", "faculty"]}, 3, 0]}
                ]
            }
        }},
        { $sort : {
            rank : -1
        }},
        { $limit : 5
        }
    ]
)
*/

