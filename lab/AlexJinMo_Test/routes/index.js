
/*
 * GET rendered view page.
 */

exports.index = function(req, res) {
	res.render('index',	{
		title: 'WeConnect',
		description: 'Some description about this application should be placed here.',
	});
};

exports.about = function(req, res) {
	res.render('about',	{
		title: 'About WeConnect',
		description: 'Some description about WeConnect should be placed here.',
		extra: 'Some extra stuffs?'
	});
};