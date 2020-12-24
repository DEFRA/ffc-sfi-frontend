const { v4: uuid } = require('uuid')
const { updateAgreement } = require('../messaging/senders')
const rules = require('../services/get-rules')
const standardsDefinitions = require('../services/standards')

function addRules (input) {
  const msg = { ...rules }
  for (const [k, v] of Object.entries(input)) {
    msg[k].totalArea = Number(v)
  }
  return msg
}

// run input through the rules for the standard
// add a single error per standard
// add error on the response for each standard
// include input value on the response
function validate (input, standards) {
  const errors = []
  console.log('***************input ->', input)
  for (const [k, v] of Object.entries(input)) {
    console.log('k, v', k, v)
    const standard = standards[k]
    console.log('standard', standard)
    const text = standard.validation.text
    const href = `#${standard.id}`
    standard.value = v // make available for next page view
    const val = Number(v)
    // TODO: Typing required for input, currently this only works for Numbers
    if (Number.isNaN(val) || val > standard.bounds.upper || val < standard.bounds.lower) {
      standard.errorMessage = { text }
      errors.push({ href, text })
    }
  }
  return [errors, standards]
}

module.exports = {
  method: 'POST',
  path: '/send-message',
  handler: async (request, h) => {
    const body = { ...request.payload }
    const [errorList, standardsResponse] = validate(body, standardsDefinitions)

    if (errorList.length > 0) {
      console.log('errorList', errorList)
      return h.view('enter-value', { standards: standardsResponse, errorList })
    } else {
      const partialMsg = addRules(body)
      const correlationId = uuid()
      const msgToSend = { correlationId, body: partialMsg }
      await updateAgreement(msgToSend)

      // return a page that will auto redirect to the page with the id generated
      return h.view('message-sent', { correlationId })
    }
  }
}
