var assert = require('chai').assert;
var request = require('supertest');
var mockfs = require('mock-fs');
var server = require('../lib/server');


describe('Server', function () {

  before(function () {

    var rootDir = __dirname+'/../';

    var config = {
      "host": "localhost",
      "port": "5555",
      "routes": "test/fixtures/routes",
      "responses": "test/fixtures/responses"
    }

    server.start(rootDir, config);
  });

  after(function () {
    mockfs.restore();
  });

  it('shows the base page', function (done) {
    request(server.app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  })

  it('shows the active config', function (done) {
    request(server.app)
      .get('/config')
      .set('Accept', 'application/json')
      .expect(200, {
        host: 'localhost',
        port: '5555',
        routes: 'test/fixtures/routes',
        responses: 'test/fixtures/responses'
      })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('shows the active routes', function (done) {
    request(server.app)
      .get('/routes')
      .set('Accept', 'application/json')
      .expect(200, {
        '/foobar': 'default.json'
      })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('returns the content of a requested file', function (done) {
    request(server.app)
      .get('/foobar')
      .set('Accept', 'application/json')
      .expect(200, {
        content: "default content"
      })
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('returns a 404 if there is no match for request', function (done) {
    request(server.app)
      .get('/not-found')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  })

});