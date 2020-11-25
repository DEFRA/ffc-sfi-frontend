const messagingConfig = require('../config/messaging')
const { MessageSender } = require('ffc-messaging')

let agreementSender

const createMessage = agreementData => ({
  body: agreementData,
  type: `${messagingConfig.messageTypePrefix}.agreement.update`,
  source: messagingConfig.messageSource
})

async function stop () {
  await agreementSender.closeConnections()
}

process.on('SIGTERM', async () => {
  await stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await stop()
  process.exit(0)
})

async function publishUpdateAgreement (agreementData) {
  agreementSender = new MessageSender(messagingConfig.updateAgreementQueue)
  await agreementSender.connect()
  const message = createMessage(agreementData)
  await agreementSender.sendMessage(message)
  await agreementSender.closeConnection()
}

module.exports = publishUpdateAgreement
