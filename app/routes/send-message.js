const { v4: uuid } = require('uuid')
const { updateAgreement } = require('../messaging/senders')
const rules = require('../services/get-rules')
const { runValidation } = require('../services/validation')

function addRules (input) {
  const msg = { ...rules }
  for (const [k, v] of Object.entries(input)) {
    msg[k].totalArea = Number(v)
  }
  return msg
}

module.exports = {
  method: 'POST',
  path: '/send-message',
  handler: async (request, h) => {
    const body = { ...request.payload }
    const { errorList, standards } = await runValidation(body)

    if (errorList.length > 0) {
      return h.view('enter-value', { errorList, standards })
    } else {
      const partialMsg = addRules(body)
      const correlationId = uuid()
      const msgToSend = { correlationId, body: partialMsg }
      await updateAgreement(msgToSend)

      // return a page that will auto redirect to the page with the id generated
      return h.view('message-sent', { correlationId })
    }
  }
}
