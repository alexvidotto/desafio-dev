'use strict';

const
  winston     = require('winston'),
  fs          = require('fs'),
  _           = require('lodash');

exports.initialize = function (app, parameters) {

  let
    params = parameters || {},
    configuration = {
      transportConsoleParams: {
        level           : 'debug',
        handleExceptions: false,
        json            : false,
        colorize        : true
      },
      transportFileParams: {
        level           : 'error',
        handleExceptions: true,
        timestamp       : true,
        json            : true,
        maxsize         : 5242880, //5MB
        maxFiles        : 10,
        colorize        : true
      }
    };

  _.assign(configuration, params);

  // HACK(alex): Remove default (Console) transport before adds new (Console)
  // with custom options. This prevent an application crash when we add a
  // transport that already exists.
  winston.remove(winston.transports.Console);
  winston.add(winston.transports.Console, configuration.transportConsoleParams);

  if (configuration.transportFileParams.filename) {
    winston.add(winston.transports.File, configuration.transportFileParams);
  }

  winston.log('debug', 'APPLICATION STARTED');
};

// TODO(alex) improve log methods
exports.log = function (levelOrMessage, message) {
  let _level, _message;
  if (!message) {
      _level    = 'debug';
      _message  = levelOrMessage;
  } else {
    _level      = levelOrMessage;
    _message    = message;
  }
  winston.log(_level, _message);
};

exports.error = function (e) {
  winston.log('error', e);
};
