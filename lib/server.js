var express = require('express');
var app = express();
var path = require('path');
var matcher = require('./matcher')

// config file
var _config = null;

// application basepath
var _basePath = null;

// current routes file
var _routes = null;
var _routesPath = null;

/**
 * Return current config
 */
app.get('/config', function (req,res){
  config = getConfig();
  res.send(config);
});

/**
 * Return list of routes
 */
app.get('/routes', function (re,res){
  var routes = getRoutes();
  res.send(routes);
});

/**
 * Return index page
 */
app.get('/', function (req,res){
  
  var basePath = getBasePath();

  res.sendFile(path.join(basePath + '/assets/html/index.html'), {}, function(err) {
    if (err) {
      res.status(404).send('page not found');
    }
  });
});

/**
 * Return preconfigured responses
 */
app.get('*', function (req,res){
  var match = matcher.getMatch(req.url, getRoutes());

  if (match !== null) {
    var responsePath = getResponsePath(match)
  
    res.sendFile(responsePath, {}, function(err) {
      if (err) {
        res.status(404).send('route found, but response missing');
      }
    });
  
  } else {
    res.status(404).send('route not found');
  }
});

/**
 * Start the server.
 * 
 * @param useConfig (optional) json object to use as config
 */
function start (basePath, useConfig) {

  _basePath = basePath !== undefined ? basePath : '';
  _config = useConfig !== undefined ? useConfig : require(path.join(basePath, 'config.json'));
  _routesPath = path.join(_basePath, _config.routes);
  _routes = require(path.join(_routesPath, 'default.json'));

  _resourcePath = path.join(_basePath, _config.responses);

  app.listen(5555, function(){});
}

/**
 * Return the current config.
 * 
 * @return object config data
 */
function getConfig () {
  return _config;
}

/**
 * Return the current routes
 * 
 * @return object current routes data
 */
function getRoutes () {
  var routesPath = path.join(_routesPath, 'default.json');
  delete require.cache[require.resolve(routesPath)]
  var routes = require(routesPath);
  return routes;
}

/**
 * Return the current base path
 * 
 * @return string current base path
 */
function getBasePath () {
  return _basePath;
}

/**
 * Return the path for responses
 */
function getResponsePath (response) {
  return path.join(_resourcePath, response);
}

exports.start = start;
exports.app = app;
