/**
 * New node file
 */

var session = 10;

exports.printSession = function() {
	console.log(session);
};

exports.updateSession = function() {
	session = session * 3238;
};