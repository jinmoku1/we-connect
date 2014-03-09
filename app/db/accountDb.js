var connector = require('./connector');

/**
 * 
 */
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
		userId : userDetail['_id'],
		netId : userDetail['netId'],
		password : password	
	};
}

exports.register = function(userDetail, password, callback) {
	connector.save('userDetails', userDetail, function(db, userDetailDoc) {
		// update with generated _id
		userDetail = userDetailDoc[0];
		var userBrief = detailToBrief(userDetail);
		var account = detailToBrief(userDetail);
		
		connector.save('userBriefs', userBrief, function(db, userBriefDoc) {
			connector.save('accounts', account, function(db, accountDoc) {
				db.close();
				callback(userDetail);
			});
		});
	});
};


/**
 * 
 */
exports.isValidLogin = function(netId, password, callback) {
	connector.findOne('accounts', { netId : netId, password : password },
		function(db, accountDoc) {
		if (accountDoc) {
			connector.findOne('userDetails', { _id : accountDoc['_id'] },
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
 * 
 */
exports.netIdExist = function(netId, callback) {
	connector.findOne('accounts', { netId : netId }, function(db, accountDoc) {
		db.close();
		callback(accountDoc != null);
	});
};