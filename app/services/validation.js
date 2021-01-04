const standards = require('./standards')
// there are a series of rules that need to be checked on each standard
// look at the rule engine for implementing this
// FACTS - the state of the system e.g. input values
// CONDITIONS - the rules e.g. upper bounds, lower bounds, number, etc.
// EVENT - the output e.g. the error message

// run input through the rules for the standard
// add a single error per standard
// add error on the response for each standard
// include input value on the response
function validate (input) {
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
  validate
}
