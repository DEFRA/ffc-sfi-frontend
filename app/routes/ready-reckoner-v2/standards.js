const landFeatures = {
  'improved-grassland': {
    label: 'Improved grassland',
    unit: 'ha',
    standards: ['improved-grassland', 'improved-grassland-soils']
  },
  'unimproved-grassland': {
    label: 'Semi-improved and unimproved grassland',
    unit: 'ha',
    standards: ['unimproved-grassland']
  },
  arable: {
    label: 'Arable and horticultural land',
    unit: 'ha',
    standards: ['arable', 'arable-soils']
  },
  hedgerows: {
    label: 'Hedgerows',
    unit: 'ha',
    standards: ['hedgerows']
  },
  'waterbody-buffers': {
    label: 'Waterbody buffers',
    unit: 'ha',
    standards: ['waterbody-buffers']
  },
  woodland: {
    label: 'Farm woodland over 15 years old',
    unit: 'ha',
    standards: ['woodland']
  }
}

const landFeatureCategories = {
  grassland: {
    label: 'Grassland',
    features: ['improved-grassland', 'unimproved-grassland']
  },
  arable: {
    label: 'Arable/horticultural land',
    features: ['arable']
  },
  boundary: {
    label: 'Boundary features',
    features: ['hedgerows', 'waterbody-buffers']
  },
  woodland: {
    label: 'On farm woodland',
    features: ['woodland']
  }
}

const standardsRates = {
  'improved-grassland': {
    mandatory: 27,
    optional: [3]
  },
  'improved-grassland-soils': {
    mandatory: 6,
    optional: [88, 56]
  },
  'unimproved-grassland': {
    mandatory: 22,
    optional: []
  },
  arable: {
    mandatory: 28,
    optional: [13]
  },
  'arable-soils': {
    mandatory: 30,
    optional: [114]
  },
  hedgerows: {
    mandatory: 200,
    optional: []
  },
  'waterbody-buffers': {
    mandatory: 200,
    optional: [0.05]
  },
  woodland: {
    mandatory: 49,
    optional: [200, 25, 100]
  }
}

const standards = {
  'improved-grassland': {
    title: 'Improved grassland',
    optionalActions: ['improved-grassland0']
  },
  'improved-grassland-soils': {
    title: 'Improved grassland soils',
    optionalActions: ['improved-grassland-soils0', 'improved-grassland-soils1']
  },
  'unimproved-grassland': {
    title: 'Semi-improved and unimproved grassland',
    optionalActions: []
  },
  arable: {
    title: 'Arable and horticultural land',
    optionalActions: ['arable0']
  },
  'arable-soils': {
    title: 'Arable and horticultural soils',
    optionalActions: ['arable-soils0']
  },
  hedgerows: {
    title: 'Hedgerows',
    optionalActions: []
  },
  'waterbody-buffers': {
    title: 'Waterbody buffering',
    optionalActions: ['waterbody-buffers0']
  },
  woodland: {
    title: 'Farm woodland',
    optionalActions: ['woodland0']
  }
}

module.exports = {
  landFeatures,
  landFeatureCategories,
  standards,
  standardsRates
}
