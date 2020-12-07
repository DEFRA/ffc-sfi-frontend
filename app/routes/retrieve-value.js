const Wreck = require('@hapi/wreck')

module.exports = {
  method: 'GET',
  path: '/retrieve-value',
  handler: async (request, h) => {
    const { correlationId } = request.query
    // TODO: needs to work in cluster
    const { payload } = await Wreck.get(`http://host.docker.internal:3001/value?correlationId=${correlationId}`, { json: true })
    console.log(`Retrieving '${JSON.stringify(payload)}' for correlationId: '${correlationId}'.`)
    return h.view('agreement', { correlationId, payload })
  }
}
