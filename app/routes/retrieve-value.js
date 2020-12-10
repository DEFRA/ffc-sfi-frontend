const Wreck = require('@hapi/wreck')
const { agreementServiceBaseUrl } = require('../config/general')

module.exports = {
  method: 'GET',
  path: '/retrieve-value',
  handler: async (request, h) => {
    const { correlationId } = request.query
    const url = `${agreementServiceBaseUrl}/value?correlationId=${correlationId}`
    console.log('Making request to:', url)
    const { payload } = await Wreck.get(url, { json: true })
    console.log(`Retrieved '${JSON.stringify(payload)}' for correlationId: '${correlationId}'.`)
    return h.view('agreement', { correlationId, payload })
  }
}
