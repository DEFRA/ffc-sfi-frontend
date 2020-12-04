const messagingConfig = require('../config/messaging')
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

async function sendMessage (sender, msgData, messageType) {
  await sender.connect()
  const msgBase = {
    type: messageType,
    source: messagingConfig.messageSource
  }
  const msg = { ...msgBase, ...msgData }
  console.log('sending message', msg)
  await sender.sendMessage(msg)
  await sender.closeConnection()
}

module.exports = {
  updateAgreement: async function (agreementData) {
    agreementSender = new MessageSender(messagingConfig.updateAgreementQueue)
    await sendMessage(agreementSender, agreementData, messagingConfig.updateAgreementMessageType)
  },
  updateEligibility: async function (eligibilityData) {
    eligibilitySender = new MessageSender(messagingConfig.updateEligibilityQueue)
    await sendMessage(eligibilitySender, eligibilityData, messagingConfig.updateEligibilityMessageType)
  }
}
