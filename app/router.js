/**
 * New node file
 */
var routes = require('./routes')
	, signup = require('./routes/signup')
	, login = require('./routes/login')
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
	app.post('/signUpPgs/signupValidate/:type', signup.signupValidate);
	app.post('/signUpPgs/register/:type', signup.register);
	
	// login
	app.post('/login', login.index);
	
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