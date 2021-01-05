module.exports = {
  arable: {
    id: 'arable',
    paymentRate: 123,
    percentage: 5,
    ui: {
      hint: 'A minimum of 5% of all arable land will need to be set aside. Payment rate is £123 per hectare of total arable land area.',
      text: 'Enter the amount of arable land you have'
    },
    units: {
      name: 'hectares',
      symbol: 'ha'
    },
    validation: {
      bounds: {
        lower: 0,
        upper: 999
      },
      text: 'Please fix this generic error for the arable field'
    }
  },
  grassland: {
    id: 'grassland',
    paymentRate: 456,
    percentage: 5,
    ui: {
      hint: 'A minimum of 5% of all grassland will need to be set aside. Payment rate is £456 per hectare of total grassland area.',
      text: 'Enter the amount of grassland you have'
    },
    units: {
      name: 'hectares',
      symbol: 'ha'
    },
    validation: {
      bounds: {
        lower: 0,
        upper: 999
      },
      text: 'Please fix this generic error for the grassland field'
    }
  },
  hedgerow: {
    id: 'hedgerow',
    paymentRate: 111,
    percentage: 5,
    ui: {
      hint: 'Need to think about this for hedgerows. Payment rate is £111 per meter of hedgerow.',
      text: 'Enter the length of hedgerow you have'
    },
    units: {
      name: 'meters',
      symbol: 'm'
    },
    validation: {
      bounds: {
        lower: 0,
        upper: 999
      },
      text: 'Please fix this error for the hedgerow field'
    }
  }
}
