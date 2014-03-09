/**
 * Connection with MongoDB for signup / login pages
 * 
 * By Seungchul Lee, Changyong Choi, Seung H. Cha
 */

// Collection Constants
var USER_DETAILS	= 'userDetails';
var USER_BRIEFS		= 'userBriefs';
var USER_ACCOUNTS	= 'userAccounts';

var connector = require('./connector');

function detailToBrief(userDetail) {
	return {
		detailId : userDetail['_id'],
		netId : userDetail['netId'],
		firstName : userDetail['firstName'],
		lastName : userDetail['lastName'],
		department : userDetail['department'],
		userType : userDetail['userType']
	};
}

function detailToAccount(userDetail, password) {
	return {
		detailId : userDetail['_id'],
		netId : userDetail['netId'],
		password : password	
	};
}

/**
 * For the signup page, we need to store their information on accounts / userBriefs / userDetails collections
 * We assumed that the input user information already comes thought validation check on the client side, so it is always unique user info.
 * 
 * @param user all user information without password
 * @param password password information
 * @param callback it is just a callback function that happens when this method is done
 */
exports.register = function(userDetail, password, callback) {
	connector.save(USER_DETAILS, userDetail, function(db, detailDoc) {
		// update with generated _id
		userDetail = detailDoc;
		var userBrief = detailToBrief(userDetail);
		var userAccount = detailToAccount(userDetail, password);
		
		connector.save(USER_BRIEFS, userBrief, function(db, briefDoc) {
			connector.save(USER_ACCOUNTS, userAccount, function(db, accountDoc) {
				db.close();
				callback(userDetail);
			});
		});
	});
};

exports.remove = function(_id, callback) {
	connector.remove(USER_ACCOUNTS, { detailId : _id }, function(db, accountRemoved) {
		if (!accountRemoved) {
			db.close();
			callback(accountRemoved);
			return;
		}
		connector.remove(USER_BRIEFS, { detailId : _id}, function(db, briefRemoved) {
			if (!briefRemoved) {
				db.close();
				callback(briefRemoved);
				return;
			}
			
			connector.remove(USER_DETAILS, _id, function(db, detailRemoved) {
				db.close();
				callback(detailRemoved);
			});
		});
	});
};

/**
 * Check user typed netId and password are matched
 * 
 * @param netId user typed netId
 * @param password user typed password
 * @param callback it is just a callback function that happens when this method is done
 */
exports.isValidLogin = function(netId, password, callback) {
	connector.findOne(USER_ACCOUNTS, { netId : netId, password : password },
	function(db, userAccountDoc) {
		if (userAccountDoc) {
			connector.findOne(USER_DETAILS, { _id : userAccountDoc['detailId'] }, 
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
	connector.findOne(USER_ACCOUNTS, { netId : netId }, function(db, userAccountDoc) {
		db.close();
		callback(userAccountDoc != null);
	});
};