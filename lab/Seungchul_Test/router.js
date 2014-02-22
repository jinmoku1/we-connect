/**
 * New node file
 */
var routes = require('./routes')
	, sub = require('./routes/sub')
	, events = require('./routes/events')
	, mongotest = require('./routes/mongotest')
	, api = require('./routes/api')
	// Add variables for db
	, mongo = require('mongodb')
	, monk = require('monk')
	, db = monk('localhost:27017/Seungchul_Test');

exports.route = function (app) {
	// view render
	
	// index
	app.get('/', routes.index);
	app.get('/about', routes.about);
	
	// sub
	app.get('/sub', sub.index);
	app.get('/sub/some-page', sub.some_page);
	
	// events
	app.get('/events', events.index);
	app.get('/events/:id', events.detail);
	
	// Seungchul world
	app.get('/mongotest', mongotest.index(db));
	
	// api
	app.get('/api/sample', api.sample);
};