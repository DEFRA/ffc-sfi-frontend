const standardsTemplate = require('./standards-arr')
const { runRulesEngine } = require('./rules-engine')

function collectErrors (results) {
  return results.failureEvents.reduce((errors, fe) => {
    if (!errors.some(e => e.id === fe.params.id)) {
      errors.push(fe.params)
    }
    return errors
  }, [])
}

function updateStandards (input, errorList) {
  const standards = JSON.parse(JSON.stringify(standardsTemplate)) // 'deep' copy required
  errorList.forEach(e => {
    const standard = standards.find(s => s.id === e.id)
    standard.errorMessage = { text: e.text }
  })
  for (const [k, v] of Object.entries(input)) {
    const standard = standards.find(s => s.id === k)
    standard.value = v // make available for next page view
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
