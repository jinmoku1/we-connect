/**
 * 
 */

var mainControl	= require('./controls/main_control');
var apiControl	= require('./controls/api_control');
var userControl	= require('./controls/user_control');

exports.route = function (app) {
	// main
	app.get('/', mainControl.index);
	app.get('/about', mainControl.about);
	
	// account (user)
	app.get('/account/login', userControl.login);
	app.post('/account/login', userControl.loginPost);
	
	app.get('/account/logout', userControl.logout);
	
	app.get('/account/register', userControl.register);
	app.get('/account/register/:type', userControl.register);
	app.post('/account/register/:type', userControl.registerPost);
	
	// api - used for light dynamic requests
	app.get('/api/sample', apiControl.sample);
};