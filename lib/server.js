var express = require('express');
var app = express();
var _config = null;

app.get('/config', function (req,res){
  config = getConfig();
  res.send(config);
});

app.get('/routes', function (re,res){
  var routes = getRoutes();
  res.send(routes);
});

app.get('/', function (req,res){
  res.send('Base URL');
});

app.get('*', function (req,res){
  res.send(req.url);
});

function start (useConfig) {
  _config = useConfig !== undefined ? useConfig : require('../config.json');

  app.listen(5555, function(){
    // app stuff
  });
}

/**
 * Return the current config.
 * @return object config data
 */
function getConfig () {
  return _config;
}

/**
 * Return the current routes
 * @return object current routes data
 */
function getRoutes () {
  return {
    'foobar': 'baz.json'
  };
}

exports.start = start;
exports.app = app;
exports.getConfig = getConfig;
exports.getRoutes = getRoutes;
