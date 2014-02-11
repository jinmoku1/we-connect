/**
 * New node file
 */

exports.index = function(req, res) {
	res.render('sub/index',	{
		title: 'Sub Page Testing',
		description: 'Some description about this sub page should be placed here.',
	});
};

exports.some_page = function(req, res) {
	res.render('sub/some_page',	{
		title: 'Some Page',
		description: 'Ha ha ha ha ha!!',
		extra: 'Nice to meet you!',
	});
};