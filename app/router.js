/**
 * Handles routing for all GET and POST requests for application
 * 
 * @module router
 * @requires module:controls/main_control
 * @requires module:controls/api_control
 * @requires module:controls/user_control
 * @requires module:controls/embedded_control
 * @requires module:controls/annc_control
 * @requires module:controls/admin_control
 */

var mainControl	= require('./controls/main_control');
var apiControl	= require('./controls/api_control');
var userControl	= require('./controls/user_control');
var embeddedControl = require('./controls/embedded_control');
var anncControl = require('./controls/annc_control');
var adminControl = require('./controls/admin_control');

/**
 * This function controls and handles all routing for GET and POST requests for all pages
 * and functionalities
 * 
 * @param {object} app The application framework - express
 */
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
	app.get('/embedded/followers', embeddedControl.followers);
	app.get('/embedded/followings', embeddedControl.followings);
	app.get('/embedded/suggestedusers', embeddedControl.suggestedUsers);
	
	// api - used for light dynamic requests
	app.post('/api/follow', apiControl.follow);
	
	//announcement
	app.get('/announcement/create', anncControl.create);
	app.post('/announcement/create', anncControl.createPost);
	app.get('/announcement/:id', anncControl.detail);
	app.post('/announcement/bookmark', anncControl.bookmark);
	app.post('/announcement/unbookmark', anncControl.unbookmark);
	app.get('/announcement/edit/:id', anncControl.edit);
	app.post('/announcement/edit/:id', anncControl.editPost);
	app.post('/announcement/delete', anncControl.deletePost);
	app.post('/announcement/apply', anncControl.applyPost);

	app.post('/admin/approve', adminControl.approve);
	app.post('/admin/disapprove', adminControl.disapprove);
};
