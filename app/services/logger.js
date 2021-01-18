const logger = require('bunyan').createLogger({ name: 'ffc-sfi' })

// Log error with optional msg to provide additional context
function logError (err, msg) {
  if (msg) {
    logger.info(err, msg)
  } else {
    logger.info(err)
  }
}

function log (msg, ctx) {
  if (ctx) {
    logger.info({ ctx }, msg)
  } else {
    logger.info(msg)
  }
}

module.exports = {
  log,
  logError
}
