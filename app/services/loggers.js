const bunyan = require('bunyan').createLogger({ name: 'ffc-sfi' })
const pino = require('pino')()
const winston = require('winston')

module.exports = {
  bunyan,
  pino,
  winston: winston.createLogger({
    // format: winston.format.combine(
    //   winston.format.label({ name: 'ffc-sfi' }),
    //   winston.format.timestamp()
    // ),
    transports: [new winston.transports.Console()]
  })
}
