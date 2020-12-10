const Wreck = require('@hapi/wreck')
const { agreementServiceBaseUrl } = require('../config/general')

module.exports = {
  method: 'GET',
  path: '/retrieve-value',
  handler: async (request, h) => {
    const { correlationId } = request.query
    const { payload } = await Wreck.get(`${agreementServiceBaseUrl}/value?correlationId=${correlationId}`, { json: true })
    console.log(`Retrieving '${JSON.stringify(payload)}' for correlationId: '${correlationId}'.`)
    return h.view('agreement', { correlationId, payload })
  }
}
