var connector = require('./connector');

exports.register = function(user, password, callback) {
	connector.connect(function(err, db) {
		var accounts = db.collection('accounts');
		var userDetails = db.collection('userDetails');
		var userBriefs = db.collection('userBriefs');

		userDetails.insert(user, function(err, docs) {
			var userBrief = {
				netId : user['netId'],
				firstName : user['firstName'],
			    lastName : user['lastName'],
			    department : user['department'],
			    userType : user['userType']
			};
			
			userBriefs.insert(userBrief, function(err, docs) {
				var account = {
					netId : user['netId'],
					password : password	
				};
				
				accounts.insert(account, function(err, docs) {
					db.close();
				});
			});
		});
	});
};

exports.login = function(netId, callback) {
	connector.connect(function(err, db) {
		collection = db.collection('accounts');
		collection.findOne({ netId : netId }, function(err, document) {
			callback(document);
			db.close();
		});
	});
};