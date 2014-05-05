/**
 * This is the module that is executed to run the whole application. This module sets up the express framework
 * and basic server configurations, and starts the routing.
 * 
 * @module app
 */

var express = require('express');
var http = require('http');
var path = require('path');

// extended requirement
var router = require('./router');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// using express session
app.use(express.cookieParser());
app.use(express.session({secret: '8qh)osf8!92hx*#ljbj0@#'}));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// disable view cache
app.disable('view cache');

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

// begin routing
router.route(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
