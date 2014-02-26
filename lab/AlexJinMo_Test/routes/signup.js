/**
 * New node file
 */

exports.some_page = function(req, res) {
	res.render('signUpPgs/signup1',	{
		title: 'MYPAGE',
		description: 'Ha ha ha ha ha!!',
		extra: 'Nice to meet you!',
	});
};