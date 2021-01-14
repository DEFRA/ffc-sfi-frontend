const { v4: uuid } = require('uuid')
const { updateAgreement } = require('../messaging/senders')
const standardsTemplate = require('../services/standards')
const { runValidation } = require('../services/validation')

function addState (input) {
  return Object.entries(input).reduce((acc, cur) => {
    const [k, v] = cur
    const standard = standardsTemplate.find(s => s.id === k)
    standard.userInput = Number(v)
    acc[k] = standard
    return acc
  }, {})
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
      const partialMsg = addState(body)
      const correlationId = uuid()
      const msgToSend = { correlationId, body: partialMsg }
      await updateAgreement(msgToSend)

      // return a page that will auto redirect to the page with the id generated
      return h.view('message-sent', { correlationId })
    }
  }
}
