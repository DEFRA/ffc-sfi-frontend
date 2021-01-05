const { Engine } = require('json-rules-engine')
const standards = require('./standards')

// only create rules for standards that exist on the input
// else the engine errors
function createRules (input) {
  return Object.keys(input).reduce((rules, key) => {
    const standard = standards[key]

    rules.push({
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
    return rules
  }, [])
}

function createFacts (input) {
  return Object.entries(input).reduce((facts, cur) => {
    facts[cur[0]] = cur[1]
    return facts
  }, {})
}

async function runRulesEngine (input) {
  const engine = new Engine()
  const rules = createRules(input)
  rules.forEach(r => engine.addRule(r))

  const facts = createFacts(input)
  return await engine.run(facts)
}

module.exports = {
  runRulesEngine
}
