/*
 * GET rendered view page.
 */

var session = require('../session');

exports.index = function(req, res) {
	res.render('events/index',	{
		events: [{id: 1, name: 'Event 1'},
		         {id: 2, name: 'Event 2'},
		         {id: 3, name: 'Event 3'},
		         {id: 4, name: 'Event 4'},
		         {id: 5, name: 'Event 5'}]
	});
};

exports.detail = function(req, res) {
	res.render('events/detail',	{
		user : session.getSessionUser(),
		id: req.params.id
	});
};