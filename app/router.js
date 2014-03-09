/**
 * New node file
 */
var routes = require('./routes')
	, signup = require('./routes/signup')
	, sub = require('./routes/sub')
	, events = require('./routes/events')
	, api = require('./routes/api')
	, account = require('./routes/account');

exports.route = function (app) {
	// view render
	
	// index
	app.get('/', routes.index);
	app.get('/about', routes.about);
	//app.get('/userMain', routes.userMain);
	
	// account
	app.get('/account/login', account.login);
	app.post('/account/login', account.login);
	app.get('/account/logout', account.logout);
	app.get('/account/register', account.register);
	app.post('/account/register', account.register);
	app.get('/account/registerValidate', account.registerValidate);
	app.post('/account/registerComplete/:type', account.registerComplete);
	
	//signup
	//app.get('/signUpPgs', signup.index);
	//app.post('/signUpPgs/signupMain', signup.signupMain);
	//app.post('/signUpPgs/signupValidate/:type', signup.signupValidate);
	//app.post('/signUpPgs/register/:type', signup.register);
	
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