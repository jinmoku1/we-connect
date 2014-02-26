/**
 * New node file
 */

exports.index = function(req, res) {
	res.render('signUpPgs/index',	{
		title: 'MYPAGE',
		description: 'Ha ha ha ha ha!!',
	});
};

exports.signup1 = function(req, res) {
	res.render('signUpPgs/signup1',	{
		title: 'MYPAGE',
		description: 'Ha ha haa ha!!',
		extra: 'uiwefiubef',
	});
};