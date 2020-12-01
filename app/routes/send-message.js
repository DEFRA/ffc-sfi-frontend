const { v4: uuid } = require('uuid')
const { updateAgreement } = require('../messaging/senders')

module.exports = {
  method: 'POST',
  path: '/send-message',
  handler: async (request, h) => {
    const { value } = request.payload
    const correlationId = uuid()
    const msg = { correlationId, value }
    console.log('Sending message', msg)
    await updateAgreement(msg)

    // wait for message to be received from agreement update
    // until that topic exists, hook into the existing

    // return a page that will auto redirect to the page with the id generated
    return h.view('message-sent')
  }
}
