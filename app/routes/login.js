


exports.index = function(req, res) {
	console.log("132141241413");
	var netId = req.body.netID;
	var password = req.body.password;
	// Register session
	var session = require('../session');
	session.logIn(req, netId, password);
	if (session.isLoggedIn(req)) {
		//res.send("User logged in.");
		console.log("LJDSFOISJFODSJFIDSJFOSJDFIDSJO");
		res.redirect('/userMain');
	}
	else {
		res.send("User sign up failed.");
	}
};