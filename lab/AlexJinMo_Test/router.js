/**
 * New node file
 */
var routes = require('./routes')
	, signup = require('./routes/signup')
	, sub = require('./routes/sub')
	, events = require('./routes/events')
	, api = require('./routes/api');

exports.route = function (app) {
	// view render
	
	// index
	app.get('/', routes.index);
	app.get('/about', routes.about);
	app.get('/userMain', routes.userMain);
	
	// signup
	app.get('/signUpPgs', signup.index);
	app.post('/signUpPgs/signupMain', signup.signupMain);
	app.post('/signUpPgs/register/:type', signup.register);

	// sub
	app.get('/sub', sub.index);
	app.get('/sub/some-page', sub.some_page);
	
	// events
	app.get('/events', events.index);
	app.get('/events/:id', events.detail);
	
	// api
	app.get('/api/sample', api.sample);
};