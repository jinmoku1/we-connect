/**
 * New node file
 */

exports.index = function(req, res) {
	res.render('signUpPgs/index',	{
		title: 'Terms and Agreements',
	});
};

exports.signupStudent = function(req, res) {
	res.render('signUpPgs/signupStudent',	{
		title: 'Sign Up Page',
		description: 'Blah!!',
		extra: 'uiwefiubef',
	});
};

exports.signupFaculty = function(req, res) {
	res.render('signUpPgs/signupFaculty',	{
		title: 'Sign Up Page',
		description: 'Blah!!',
		extra: 'uiwefiubef',
	});
};