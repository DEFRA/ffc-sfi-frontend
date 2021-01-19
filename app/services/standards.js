const enabled = {
  arable: false,
  grassland: true,
  hedgerow: true
}

const allStandards = [{
  calculations: [{
    condition: 'userInput <= 1000',
    expression: 'userInput * paymentRate * percentage / 100.0'
  }, {
    condition: 'userInput > 1000',
    expression: '1000 * paymentRate * percentage / 100.0'
  }],
  id: 'arable',
  paymentRate: 26,
  percentage: 5,
  ui: {
    hint: 'A minimum of 5% of all arable land will need to be set aside. Payment rate is £123 per hectare of total arable land area.',
    text: 'Enter the amount of arable land you have'
  },
  units: {
    name: 'hectares',
    symbol: 'ha'
  },
  validationRules: [{
    operator: 'lessThanInclusive',
    text: 'Area of arable land must be less than or equal to 9999',
    value: 9999
  }, {
    operator: 'greaterThanInclusive',
    text: 'Area of arable land must not be less than 0',
    value: 0
  }]
},
{
  calculations: [{
    condition: 'userInput <= 1000',
    expression: 'userInput * paymentRate * percentage / 100.0'
  }, {
    condition: 'userInput > 1000',
    expression: '1000 * paymentRate * percentage / 100.0'
  }],
  id: 'grassland',
  paymentRate: 30,
  percentage: 5,
  ui: {
    hint: 'A minimum of 5% of all grassland will need to be set aside. Payment rate is £456 per hectare of total grassland area.',
    text: 'Enter the amount of grassland you have'
  },
  units: {
    name: 'hectares',
    symbol: 'ha'
  },
  validationRules: [{
    operator: 'lessThanInclusive',
    text: 'Area of grassland land must be less than or equal to 9999',
    value: 9999
  }, {
    operator: 'greaterThanInclusive',
    text: 'Area of grassland land must not be less than 0',
    value: 0
  }]
},
{
  calculations: [{
    expression: 'userInput * paymentRate / 100.0'
  }],
  id: 'hedgerow',
  paymentRate: 16,
  percentage: 5,
  ui: {
    hint: 'Need to think about this for hedgerows. Payment rate is £111 per meter of hedgerow.',
    text: 'Enter the length of hedgerow you have'
  },
  units: {
    name: 'meters',
    symbol: 'm'
  },
  validationRules: [{
    operator: 'lessThanInclusive',
    text: 'Length of hedgerow must be less than or equal to 99999',
    value: 99999
  }, {
    operator: 'greaterThanInclusive',
    text: 'Length of hedgerow must not be less than 0',
    value: 0
  }]
}]

module.exports = (() => allStandards.filter(s => enabled[s.id]))()
