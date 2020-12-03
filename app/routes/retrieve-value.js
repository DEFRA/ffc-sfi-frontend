module.exports = {
  method: 'GET',
  path: '/retrieve-value',
  handler: async (request, h) => {
    const { correlationId } = request.query
    console.log(`Retrieving agreement for correlationId: ${correlationId}.`)
    const data = 'PENDING'
    return h.view('agreement', { correlationId, data })
  }
}
