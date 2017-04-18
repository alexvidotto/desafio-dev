'use strict';

require('../helper');

const
  geocoder        = require('../../src/modules/api/geocode/')
  ,nock            = require('nock')
  ,util            = require('util')
  ,fs              = require('fs');

describe('when requesting a geocode service', function() {

  let
    response  = JSON.parse(fs.readFileSync(__dirname + '/../../fixtures/geocode/response.json').toString())
    ,signature = "XGnPxdlyy6qLdPd58S-5sLJUEis"
    ,qs        = {"q":"Brasil","limit":"1","applicationCode":"desafiodev","signature": signature }
    ;

  nock('http://api.maplink.com.br:80', {"encodedQueryParams":true})
    .get('/v0/search')
    .query()
    .reply(200, response);

  describe ('with a valid signature', function() {
    it ('the request must occurs with success', function() {
      return geocoder.geocode("q=Brasil&limit=1").should.eventually.deep.equal(response);
    });
  });
});
