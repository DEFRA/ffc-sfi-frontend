const log = require('../services/loggers')
const msgCfg = require('../config/messaging')
const { MessageSender } = require('ffc-messaging')

let agreementSender
let eligibilitySender

async function stop () {
  await agreementSender.closeConnection()
  await eligibilitySender.closeConnection()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

async function sendMsg (sender, msgData, msgType) {
  await sender.connect()
  const msgBase = {
    type: msgType,
    source: msgCfg.msgSrc
  }
  const msg = { ...msgBase, ...msgData }
  console.log('sending message', msg)

  console.log('bunyan logging-------------------v')
  log.bunyan.info('this is just a string')
  log.bunyan.info(msg, 'msg as object, chance of over writing')
  log.bunyan.info({ unique: msg }, 'msg as property')

  console.log('pino logging-------------------v')
  log.pino.info('pino string')
  log.pino.info({ msg })
  log.pino.info(msg)

  console.log('winston logging-------------------v')
  log.winston.log({ level: 'info', message: 'winston message goes here', msg })
  log.winston.log('info', 'winston message goes here', msg)
  log.winston.info('winston message goes here', msg)

  await sender.sendMessage(msg)
  await sender.closeConnection()
}

module.exports = {
  updateAgreement: async function (agreementData) {
    agreementSender = new MessageSender(msgCfg.updateAgreementQueue)
    await sendMsg(agreementSender, agreementData, msgCfg.updateAgreementMsgType)
  },
  updateEligibility: async function (eligibilityData) {
    eligibilitySender = new MessageSender(msgCfg.updateEligibilityQueue)
    await sendMsg(eligibilitySender, eligibilityData, msgCfg.updateEligibilityMsgType)
  }
}
