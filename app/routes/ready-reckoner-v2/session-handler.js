const keys = {
  bpsPayment: 'bpsPayment',
  landValues: 'landValues',
  selectedStandards: 'selectedStandards',
  actionValues: 'actionValues'
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
