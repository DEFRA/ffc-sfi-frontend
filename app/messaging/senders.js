const { log } = require('../services/logger')
const msgCfg = require('../config/messaging')
const { MessageSender } = require('ffc-messaging')

const agreementSender = new MessageSender(msgCfg.updateAgreementQueue)
const eligibilitySender = new MessageSender(msgCfg.updateEligibilityQueue)

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
  const msgBase = {
    type: msgType,
    source: msgCfg.msgSrc
  }
  const msg = { ...msgBase, ...msgData }

  log('sending message', msg)

  await sender.sendMessage(msg)
}

module.exports = {
  updateAgreement: async function (agreementData) {
    await sendMsg(agreementSender, agreementData, msgCfg.updateAgreementMsgType)
  },
  updateEligibility: async function (eligibilityData) {
    await sendMsg(eligibilitySender, eligibilityData, msgCfg.updateEligibilityMsgType)
  }
}
