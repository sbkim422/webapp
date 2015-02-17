
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , routes = require('./lib/routes')
  , path = require('path')
  , app = express();

// all environments
app.configure(function(){
	app.set('port', process.env.PORT || 4567);
	app.set('views', __dirname + '/views');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

routes.configRoutes(app, server);


