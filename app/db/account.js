var connector = require('./connector');

/**
 * 
 */
exports.register = function(user, password, callback) {
	connector.connect(function(err, db) {
		var accounts = db.collection('accounts');
		var userDetails = db.collection('userDetails');
		var userBriefs = db.collection('userBriefs');

		userDetails.insert(user, function(err, docs) {
			user = docs[0];

			var userBrief = {
					detailId : user['_id'],
					netId : user['netId'],
					firstName : user['firstName'],
					lastName : user['lastName'],
					department : user['department'],
					userType : user['userType']
			};

			userBriefs.insert(userBrief, function(err, docs) {
				var account = {
						userId : user['_id'],
						netId : user['netId'],
						password : password	
				};

				accounts.insert(account, function(err, docs) {
					db.close();
					if (callback) callback(user);
				});
			});
		});
	});
};


/**
 * 
 */
exports.isValidLogin = function(netId, password, callback) {
	connector.connect(function(err, db) {
		collection = db.collection('accounts');
		collection.findOne({ netId : netId }, function(err, accountDoc) {
			if(accountDoc != null && accountDoc['password'] == password) {
				userDetails = db.collection('userDetails');
				userDetails.findOne({ netId : netId }, function(err, userDoc) {
					callback(userDoc);
					db.close();
				});
			}
			else {
				callback(null);
				db.close();
			}
		});
	});
};


/**
 * 
 */
exports.netIdExist = function(netId, callback) {
	connector.connect(function(err, db) {
		collection = db.collection('accounts');
		collection.findOne({ netId : netId }, function(err, document) {
			callback(document != null);
			db.close();
		});
	});
};