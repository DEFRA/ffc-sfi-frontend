const standardTemplate = require('./standards')
const { runValidation } = require('./rule-engine')

function collectErrors (results) {
  return results.failureEvents.reduce((errorList, fe) => {
    errorList.push(fe.params)
    return errorList
  }, [])
}

function createResponse (input, errorList) {
  const standards = JSON.parse(JSON.stringify(standardTemplate)) // 'deep' copy required
  errorList.forEach(e => {
    standards[e.id].errorMessage = { text: e.text }
  })
  for (const [k, v] of Object.entries(input)) {
    standards[k].value = v // make available for next page view
  }
  return standards
}

async function validate (input) {
  const results = await runValidation(input)
  const errorList = collectErrors(results)
  const standards = createResponse(input, errorList)

  return { errorList, standards }
}

module.exports = {
  validate
}
