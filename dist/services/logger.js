/*  */
'use strict'

const winston = require('winston')

winston.setLevels({
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
})

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'magenta'
})

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: process.env.SERVICE_DEFAULT_LOGGER_LEVEL,
      colorize: true,
      stderrLevels: ['error']
    })
  ]
})

module.exports.Default = logger
