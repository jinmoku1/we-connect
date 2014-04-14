/**
 * 
 */

var mainControl	= require('./controls/main_control');
var apiControl	= require('./controls/api_control');
var userControl	= require('./controls/user_control');
var embeddedControl = require('./controls/embedded_control');
var anncControl = require('./controls/annc_control');

exports.route = function (app) {
	// main
	app.get('/', mainControl.index);
	app.get('/about', mainControl.about);
	
	// account (user)
	app.get('/account/login', userControl.login);
	app.post('/account/login', userControl.loginPost);
	
	app.get('/account/logout', userControl.logout);
	
	app.get('/account/agreement', userControl.agreement);
	app.post('/account/agreement', userControl.agreementPost);
	
	app.get('/account/register/:userType', userControl.register);
	app.post('/account/register/validate', userControl.registerValidate);
	app.post('/account/register/:userType', userControl.registerPost);

	app.get('/setting', userControl.setting);
	app.post('/setting/profile', userControl.settingProfile);
	app.post('/setting/changePW', userControl.settingChangePW);
	app.post('/setting/additionalInfo', userControl.settingAdditionalInfo);
	
	// embedded view - used for ajax embedded view
	app.get('/embedded/profile/:id', embeddedControl.profile);
	app.get('/embedded/followings', embeddedControl.followings);
	app.get('/embedded/followees', embeddedControl.followees);
	
	// api - used for light dynamic requests
	app.get('/api/sample', apiControl.sample);
	
	app.post('/api/follow', apiControl.follow);
	
	//announcement
	app.get('/announcement/create', anncControl.create);
	app.post('/announcement/create', anncControl.createPost);
	app.get('/announcement/:id', anncControl.detail);
	app.post('/announcement/bookmark', anncControl.bookmark);
	app.post('/announcement/unbookmark', anncControl.unbookmark);
	app.get('/announcement/edit/:id', anncControl.edit);
	app.post('/announcement/edit/:id', anncControl.editPost);
	app.get('/announcement/apply/:id', anncControl.apply);
	app.post('/announcement/apply/:id', anncControl.applyPost);
};
