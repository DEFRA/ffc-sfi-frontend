const { updateAgreement } = require('../messaging/senders')

module.exports = {
  method: 'POST',
  path: '/send-message',
  handler: async (request, h) => {
    const { value } = request.payload
    const msg = { value }
    console.log('Sending message', msg)
    await updateAgreement(msg)

    return h.view('message-sent')
  }
}
