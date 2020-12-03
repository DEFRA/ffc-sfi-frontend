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

    // return a page that will auto redirect to the page with the id generated
    return h.view('message-sent', { correlationId })
  }
}
