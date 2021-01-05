const standardTemplate = require('./standards')
const { runRulesEngine } = require('./rules-engine')

function collectErrors (results) {
  return results.failureEvents.reduce((errors, fe) => {
    errors.push(fe.params)
    return errors
  }, [])
}

function updateStandards (input, errorList) {
  const standards = JSON.parse(JSON.stringify(standardTemplate)) // 'deep' copy required
  errorList.forEach(e => {
    standards[e.id].errorMessage = { text: e.text }
  })
  for (const [k, v] of Object.entries(input)) {
    standards[k].value = v // make available for next page view
  }
  return standards
}

async function runValidation (input) {
  const results = await runRulesEngine(input)
  const errorList = collectErrors(results)
  const standards = updateStandards(input, errorList)

  return { errorList, standards }
}

module.exports = {
  runValidation
}
