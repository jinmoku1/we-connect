/**
 * New node file
 */
var routes = require('./routes')
	, sub = require('./routes/sub')
	, api = require('./routes/api');

exports.route = function (app) {
	// view render
	
	// index
	app.get('/', routes.index);
	app.get('/about', routes.about);
	
	// sub
	app.get('/sub', sub.index);
	app.get('/sub/some-page', sub.some_page);
	
	// api
	app.get('/api/sample', api.sample);
};