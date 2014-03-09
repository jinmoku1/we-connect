/**
 * 
 * 
 */

db = require('./account');
/*
db.register({
	netId : 'asdf',
	firstName : 'Tester',
    lastName : 'Lee',
    department : 'CS',
    userType : 0
}, '1234');
*/
db.netIdExist('asdf', function(isExist) {
	console.log("NetID Exists: " + isExist);
});

db.isValidLogin('asdf', '12324', function(isValid) {
	console.log("Valid Login: " + isValid);
});