const keys = {
  actionValues: 'actionValues',
  bpsPayment: 'bpsPayment',
  correlationId: 'correlationId',
  landValues: 'landValues',
  selectedStandards: 'selectedStandards'
}

function setValue (request, key, value) {
  request.yar.set(key, value)
}

function getValue (request, key) {
  return request.yar.get(key)
}

module.exports = {
  setValue,
  getValue,
  keys
}
