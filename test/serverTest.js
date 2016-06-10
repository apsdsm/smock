var assert = require('chai').assert;
var request = require('supertest');
var mockfs = require('mock-fs');

var server = require('../lib/server');

describe('Server', function(){

  before(function(){
    var default_routes = {
      'foobar': 'baz.json'
    };

    var alternative_routes = {
      'foobar': 'altbaz.json'
    }

    mockfs({
      'routes': {
        'default.json': default_routes,
        'alternative.json': alternative_routes
      },
      'responses': {
        'baz.json': "baz.json contents",
        'altbaz.json': "altbaz.json contents"
      }
    });

    var config = {
      "host": "localhost",
      "port": "5555",  
      "routes": "routes",
      "responses": "responses"
    }

    server.start(config);
  });

  after(function(){
    mockfs.restore();
  });

  it('shows the active config', function(done){
    request(server.app)
      .get('/config')
      .set('Accept', 'application/json')
      .expect(200, {
        host: 'localhost',
        port: '5555',
        routes: 'routes',
        responses: 'responses'
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('shows the active routes', function(done){
    request(server.app)
      .get('/routes')
      .set('Accept', 'application/json')
      .expect(200, {
        'foobar': 'baz.json'
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

});