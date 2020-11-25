const messagingConfig = require('../config/messaging')
const { MessageSender } = require('ffc-messaging')

let eligibilitySender

const createMessage = eligibilityData => ({
  body: eligibilityData,
  type: `${messagingConfig.messageTypePrefix}.eligibility.update`,
  source: messagingConfig.messageSource
})

async function stop () {
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

module.exports = {
  publish: async function (eligibilityData) {
    eligibilitySender = new MessageSender(messagingConfig.updateEligibilityQueue)
    await eligibilitySender.connect()
    const message = createMessage(eligibilityData)
    await eligibilitySender.sendMessage(message)
    await eligibilitySender.closeConnection()
  }
}
