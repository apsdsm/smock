var server = require('./lib/server');

console.log('starting smock...');

server.start(__dirname);

console.log('started... Ctrl-C to exit');