/**
 * New node file
 */

exports.index = function(req, res) {
	res.render('signUpPgs/index',	{
		title: 'Terms and Agreements',
	});
};

exports.signupMain = function(req, res) {
	var userType = req.body.userType;
	console.log(userType);
	console.log(userType);
	if (userType == "S"){
		res.render('signUpPgs/signupStudent',	{
			title: 'Sign Up Page',
			description: 'Blah!!',
			extra: 'uiwefiubef',
		});
	}
	else {
		res.render('signUpPgs/signupFaculty',	{
			title: 'Sign Up Page',
			description: 'Blah!!',
			extra: 'uiwefiubef',
		});
	}
	
};