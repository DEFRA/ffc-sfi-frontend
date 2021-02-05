const keys = {
  bpsPayment: 'bpsPayment'
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
