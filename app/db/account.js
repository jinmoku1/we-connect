/**
 * Connection with MongoDB for signup / login pages
 * 
 * By Seungchul Lee, Changyong Choi, Seung. H Cha
 */

var connector = require('./connector');

/**
 * For the signup page, we need to store their information on accounts / userBriefs / userDetails collections
 * We assumed that the input user information already comes thought validation check on the client side, so it is always unique user info.
 * 
 * @param user all user information without pasword
 * @param password password information
 * @param callback it is just a callback function that happens when this method is done
 */
exports.register = function(user, password, callback) {
	//console.log('before connect');
	
	connector.connect(function(err, db) {
		var accounts = db.collection('accounts');
		var userDetails = db.collection('userDetails');
		var userBriefs = db.collection('userBriefs');
		
		//console.log('before detail insert');
		
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
					//console.log('asdf');
					if (callback) callback(user);
				});
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
 * Check user typed netId is existed in the database
 * 
 * @param netId user typed netId
 * @param callback it is just a callback function that happens when this method is done
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