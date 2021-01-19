const enabledStandards = require('../../services/standards')
const selectStandardHints = require('./select-standard-hint-content')

const content = {
  arable: {
    label: 'Arable land',
    selectStandard: {
      checkboxItemText: (paymentRate) => `Arable land, £${paymentRate} a hectare, plus £13 per tree`,
      hintText: (amount, payment) => selectStandardHints.arable(amount, payment)
    }
  },
  grassland: {
    label: 'Grassland',
    selectStandard: {
      checkboxItemText: (paymentRate) => `Grassland, £${paymentRate} a hectare, plus £3 per tree`,
      hintText: (amount, payment) => selectStandardHints.grassland(amount, payment)
    }
  },
  hedgerow: {
    id: 'hedgerow',
    label: 'Hedegrows',
    selectStandard: {
      checkboxItemText: (paymentRate) => `Hedgrows, £${paymentRate} for every 100 meters`,
      hintText: (amount, payment) => selectStandardHints.hedgerow(amount, payment)
    }
  },
  woodland: {
    label: 'Wooland',
    selectStandard: {
      checkboxItemText: (paymentRate) => `Woodland, £${paymentRate} a hectare`,
      hintText: (amount, payment) => selectStandardHints.woodland(amount, payment)
    }
  }
}

module.exports = (() => enabledStandards.reduce((acc, cur) => {
  acc[cur.id] = { ...content[cur.id] }
  return acc
}, {}))()
