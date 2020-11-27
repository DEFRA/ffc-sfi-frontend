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

async function sendMessage (sender, messageData, messageType) {
  await sender.connect()
  const message = {
    body: messageData,
    type: messageType,
    source: messagingConfig.messageSource
  }
  await sender.sendMessage(message)
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
