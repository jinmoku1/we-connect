/**
 * A module for User DB.
 * @module db/userDb
 *
 * @requires module:db/connector
 * @requires module:contants
 */

var userConst = require('../constants').user;
var connector = require('./connector');
var ObjectID = require('mongodb').ObjectID;

/**
 * Struct User Brief DB schema from User Detail DB schema
 *
 * @access private
 * @param {Object} User detail object
 */
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


/**
 * Struct User Account DB schema from User Detail DB schema
 *
 * @access private
 * @param {Object} User detail object
 */
function detailToAccount(userDetail, password) {
	return {
		detailId : userDetail._id,
		netId : userDetail.netId,
		password : password	
	};
}

/**
 * Struct User Detail DB schema
 *
 * @access private
 */
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
			followers		: [],
			followings		: [],
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

/**
 * create User Infomations in db
 * 
 * @param {Object} post
 * @param {createCallback} Callback function
 */
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
/**
 * This callback is displayed as part of the userDb module.
 *
 * @callback createCallback
 * @param {Object} User detail object
 */

/**
 * This function removes User information from DB collections, specifically
 * in userAccounts, userDetails, userBriefs.
 *
 * @param {ObjectId} detail user object Id
 * @param {removeCallback} Callback function
 */
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
/**
 * This callback is displayed as part of the userDb module.
 *
 * @callback removeCallback
 * @param {Boolean} boolean indicating if it succeeded or failed.
 */

/**
 * This function updates User information in DB collections, specifically
 * in userDetails, userBriefs.
 *
 * @param {ObjectId} detail user object Id
 * @param {Object} a new document
 * @param {updateInfoCallback} Callback function
 */
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
/**
 * This callback is displayed as part of the userDb module.
 *
 * @callback updateInfoCallback
 * @param {Boolean} boolean indicating if it succeeded or failed.
 */


/**
 * This function updates User password in userAccounts.
 *
 * @param {Object} a new document that includes all account information.
 * @param {string} old password
 * @param {updatePasswordCallback} Callback function
 */
exports.updatePassword = function(update, oldPassword, callback) {
	connector.update(userConst.db.USER_ACCOUNTS, { netId : update.netId, password : oldPassword }, update, function(db, result) {
		db.close();
		callback(result != null);
	});
};
/**
 * This callback is displayed as part of the userDb module.
 *
 * @callback updatePasswordCallback
 * @param {Boolean} boolean indicating if it succeeded or failed.
 */


/**
 * This function returns all brief documents that satisfy the query condition.
 *
 * @param {Object} a query statement.
 * @param {getBriefsCallback} Callback function.
 */
exports.getBriefs = function(selector, callback) {
	connector.findAll(userConst.db.USER_BRIEFS, function(db, docs){
		db.close();
		callback(docs);
	});
};
/**
 * This callback is displayed as part of the userDb module.
 *
 * @callback getBriefsCallback
 * @param {List<Object>} User brief objects
 */


/**
 * This function returns a userDetail document that matchs detail user object id.
 *
 * @param {ObjectId} detail user object Id
 * @param {getDetailCallback} Callback function.
 */
exports.getDetail = function(_id, callback) {
	connector.findOne(userConst.db.USER_DETAILS, {_id: _id}, function(db, resultDoc){
		db.close();
		callback(resultDoc);
	});
};
/**
 * This callback is displayed as part of the userDb module.
 *
 * @callback getDetailCallback
 * @param {Object} User detail object
 */


/**
 * This function checks if the login is valid or not.
 *
 * @param {string} net id string
 * @param {string} password string
 * @param {isValidLoginCallback} Callback function.
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
 * This callback is displayed as part of the userDb module.
 *
 * @callback isValidLoginCallback
 * @param {Object} User detail object
 */


/**
 * This function checks if the netid already exists
 *
 * @param {string} net id string
 * @param {netIdExistsCallback} Callback function
 */
exports.netIdExists = function(netId, callback) {
	connector.findOne(userConst.db.USER_ACCOUNTS, { netId : netId },
			function(db, userAccountDoc) {
		db.close();
		callback(userAccountDoc != null);
	});
};
/**
 * This callback is displayed as part of the userDb module.
 *
 * @callback netIdExistsCallback
 * @param {Boolean} boolean indicating if it succeeded or failed.
 */


/**
 * This function returns recommendation users that would be filtered by
 * pre-defined conditions.
 *
 * @param {Object} detail user Object
 * @param {userRecsystemCallback} Callback function
 */
exports.userRecsystem = function(user, callback) {
	var interests = (user.interests == null ? [] : user.interests),
		department = user.department,
		ids = user.followings;
	ids.push(user._id);
<<<<<<< HEAD
	
	//console.log("user: " + user._id);
	//console.log("IDs: " + ids);
=======
	ids.push(ObjectID.createFromHexString("535c8f8d0cf98bf2c774f396"));
>>>>>>> 348d559297669059c6b91275cd94aa088e581d67
	
	var cond = [
	    { 
	    	$match : { detailId : { $nin: ids } }
	    },
	    { 
	    	$project : {
	    			detailId : 1,
	    			netId : 1,
	                firstName : 1,
	                lastName : 1,
	                profilePicUrl : 1,
	                interests : 1,
	                rank : { $add: [
	                    { $size : {$setIntersection : [ "$interests", interests]}},
	                    { $cond : [{$eq : ["$department", department] }, 3, 0]},
	                    { $cond : [{$eq : ["$userType", userConst.TYPE_FACULTY]}, 3, 0]}
	                    ]
	                }
	        }
	    },
	    { 
	       	$sort : {rank : -1 } 
	    },
	    { 
	    	$limit : 5 
	    }
	];
	connector.aggreate(userConst.db.USER_BRIEFS, cond, function(db, result) {
		db.close();
		callback(result);
	});
};
/**
 * This callback is displayed as part of the userDb module.
 *
 * @callback userRecsystemCallback
 * @param {List<Object>} User objects
 */
