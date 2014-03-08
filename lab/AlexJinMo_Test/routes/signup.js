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
	if (userType == "S"){
		res.render('signUpPgs/signupStudent',	{
			title: 'Sign Up Page',
		});
	}
	else {
		res.render('signUpPgs/signupFaculty',	{
			title: 'Sign Up Page',
		});
	}
	
};