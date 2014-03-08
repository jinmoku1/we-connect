/**
 * New node file
 */
var routes = require('./routes')
	, sub = require('./routes/sub')
	, events = require('./routes/events')
	, api = require('./routes/api');

exports.route = function (app) {
	// view render
	
	// index
	app.get('/', routes.index);
	app.get('/about', routes.about);
	
	// sub
	app.get('/sub', sub.index);
	app.get('/sub/some-page', sub.somePage);
	
	// events
	app.get('/events', events.index);
	app.get('/events/:id', events.detail);
	
	// api
	app.get('/api/sample', api.sample);
	app.get('/api/log-in', api.logIn);
	app.get('/api/log-out', api.logOut);
	app.get('/api/is-logged-in', api.isLoggedIn);
};