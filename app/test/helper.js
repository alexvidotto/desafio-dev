'use strict';

const
  env             = require('node-env-file')(__dirname + '/../src/.env'),
  dependencies    = require('../src/modules/factory'),
  chai            = require('chai'),
  util            = require('util'),
  nock            = require('nock'),
  chaiAsPromised  = require('chai-as-promised');

dependencies.register();
chai.should();
chai.use(chaiAsPromised);

beforeEach(function() {
  nock.cleanAll();
});
