/**
 * New node file
 */

var userDb = require('./user_db');

var updateDoc = {"netId" : "slee", "password" : "1234"};
var updatePss = {"netId" : "slee", "password" : "1234", "newPassword" : "5678", "confirmPassword" : "5678"};
var netId = updateDoc.netId;

userDb.netIdExists(netId, function(result) {
	if(result) {
		console.log("netId is founded!!");
		userDb.updateInfo(updateDoc, function(result) {
			if(result) {
				console.log("OK! it is updated");
				userDb.updatePassword(updatePss, function(result) {
					if(result)
						console.log("OK! password is changed");
				});
			}
			else {
				console.log("Something wrong happened during updating data!");
			}
		});
	}
	else {
		console.log("The netId is not found!");
	}
});