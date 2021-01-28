const { log } = require('../services/logger')
const msgCfg = require('../config/messaging')
const { MessageSender } = require('ffc-messaging')
const { DefaultAzureCredential } = require('@azure/identity')

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
  const msgBase = {
    type: msgType,
    source: msgCfg.msgSrc
  }
  const msg = { ...msgBase, ...msgData }

  log('sending message', msg)

  await sender.sendMessage(msg)
  await sender.closeConnection()
}

module.exports = {
  updateAgreement: async function (agreementData) {
    const cred = new DefaultAzureCredential()
    console.log('Asking for token ...')
    const token = await cred.getToken('https://servicebus.azure.net/.default')
    console.log(token)

    agreementSender = new MessageSender(msgCfg.updateAgreementQueue)
    await sendMsg(agreementSender, agreementData, msgCfg.updateAgreementMsgType)
  },
  updateEligibility: async function (eligibilityData) {
    eligibilitySender = new MessageSender(msgCfg.updateEligibilityQueue)
    await sendMsg(eligibilitySender, eligibilityData, msgCfg.updateEligibilityMsgType)
  }
}
