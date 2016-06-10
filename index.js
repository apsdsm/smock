// var express = require('express');
// var app = express();

// app.get('/', function(request,response){
//   response.send('Base URL');
// });

// app.get('*', function(request,response){
//   console.log(request.baseUrl);
//   response.send(request.url);
// });

// app.listen(5555, function(){
//   console.log('Listening on port 5555');
// });
// 


var server = require('./lib/server');

console.log('starting app...');

server.start();

console.log('started...');