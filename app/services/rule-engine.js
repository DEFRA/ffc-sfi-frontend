const { Engine } = require('json-rules-engine')
const standards = require('./standards')

// only create rules for standards that exist on the input
// else the engine errors
function createRules (input) {
  return Object.keys(input).reduce((acc, key) => {
    const standard = standards[key]

    acc.push({
      conditions: {
        all: [{
          fact: key,
          operator: 'greaterThan',
          value: standard.bounds.lower
        }, {
          fact: key,
          operator: 'lessThanInclusive',
          value: standard.bounds.upper
        }]
      },
      event: {
        type: 'validate-bounds',
        params: {
          href: `#${standard.id}`,
          id: standard.id,
          text: standard.validation.text
        }
      }
    })
    return acc
  }, [])
}

function createFacts (input) {
  return Object.entries(input).reduce((acc, cur) => {
    acc[cur[0]] = cur[1]
    return acc
  }, {})
}

async function runValidation (input) {
  const engine = new Engine()
  const rules = createRules(input)
  rules.forEach(r => engine.addRule(r))

  const facts = createFacts(input)
  return await engine.run(facts)
}

module.exports = {
  runValidation
}
