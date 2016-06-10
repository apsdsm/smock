var assert = require('chai').assert;
var matcher = require('../lib/matcher.js');

var matchlist = {
  '/foo': 'foo.json',
  '/foo/bar': 'foobar.json',
  '/foo/bar?a=b&c=d': 'uri_params.json'
};

describe('Matcher', function() {

  it('should return null when there is no match', function(){
    assert.isNull(matcher.getMatch());
  });

  it('should return a match if in matchlist', function(){
    var result = matcher.getMatch('/foo', matchlist);
    assert.equal('foo.json', result);    

    var result = matcher.getMatch('/foo/bar', matchlist);
    assert.equal('foobar.json', result);
  });

  it('should return a match for an entry that has URI characters', function(){
    var result = matcher.getMatch('/foo/bar?a=b&c=d', matchlist);
    assert.equal('uri_params.json', result);
  });

});