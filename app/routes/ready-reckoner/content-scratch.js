const stdDescription = require('./content-std-description')

const landFeatures = {
  'improved-grassland': {
    label: 'Improved grassland',
    unit: 'ha'
  },
  'unimproved-grassland': {
    label: 'Semi-improved and unimproved grassland',
    unit: 'ha'
  },
  arable: {
    label: 'Arable and horticultural land',
    unit: 'ha'
  },
  hedgerows: {
    label: 'Hedgerows',
    unit: 'ha'
  },
  'waterbody-buffers': {
    label: 'Waterbody buffers',
    unit: 'ha'
  },
  woodland: {
    label: 'Farm woodland over 15 years old',
    unit: 'ha'
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
    base: 27,
    additional: [3]
  },
  'improved-grassland-soils': {
    base: 6,
    additional: [88, 56]
  },
  'unimproved-grassland': {
    base: 22,
    additional: []
  },
  arable: {
    base: 28,
    additional: [13]
  },
  'arable-soils': {
    base: 30,
    additional: [114]
  },
  hedgerows: {
    base: 200,
    additional: []
  },
  waterbody: {
    base: 200,
    additional: [0.05]
  },
  woodland: {
    base: 49,
    additional: [200, 25, 100]
  }
}

const standardsContent = {
  'improved-grassland': {
    title: 'Improved grassland',
    checkboxLabel: 'Add the improved grassland standard to my calculation'
  },
  'improved-grassland-soils': {
    title: 'Improved grassland soils',
    checkboxLabel: 'Add the improved grassland soils standard to my calculation'
  },
  'unimproved-grassland': {
    title: 'Semi-improved and unimproved grassland',
    checkboxLabel: 'Add the semi-improved or unimproved grassland standard to my calculation'
  },
  arable: {
    title: 'Arable and horticultural land',
    checkboxLabel: 'Add the arable land standard to my calculation'
  },
  'arable-soils': {
    title: 'Arable and horticultural soils',
    checkboxLabel: 'Add the arable and horticultural soils standard to my calculation'
  },
  hedgerows: {
    title: 'Hedgerows',
    checkboxLabel: 'Add the hedgerows standard to my calculation'
  },
  waterbody: {
    title: 'Waterbody buffering',
    checkboxLabel: 'Add the waterbody buffering standard to my calculation'
  },
  woodland: {
    title: 'Farm woodland',
    checkboxLabel: 'Add the farm woodland standard to my calculation'
  }
}

const extraActions = {
  'improved-grassland': {
    hint: 'Add the number of trees on your improved grassland you want to maintain a 10 metre radius buffer around. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'improved-grassland',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates['improved-grassland'].additional[0]} for each tree you maintain a buffer around</strong>.</p>`,
      label: 'Number of trees',
      unit: 'trees'
    }]
  },
  'improved-grassland-soils': {
    hint: 'Add how many hectares you want to use for each action. You can leave fields blank if you don\'t know.',
    actions: [{
      id: 'improved-grassland-soils1',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates['improved-grassland-soils'].additional[0]} a hectare</strong> to reduce stocking density or remove livestock from wet soils.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    },
    {
      id: 'improved-grassland-soils2',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates['improved-grassland-soils'].additional[1]} a hectare</strong> to maintain permanent grassland that you only re-seed by direct drilling or over-sowing.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    }]
  },
  arable: {
    hint: 'Add the number of trees on your arable land you want to maintain a 10 metre radius buffer around. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'arable',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates.arable.additional[0]} for each tree you maintain a buffer around</strong>.</p>`,
      label: 'Number of trees',
      unit: 'trees'
    }]
  },
  'arable-soils': {
    hint: 'Add the number of hectares of arable land at risk of surface runoff, soil erosion or flooding you want to establish green cover on. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'arable-soils',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates['arable-soils'].additional[0]} a hectare</strong> to establish green cover.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    }]
  },
  waterbody: {
    hint: 'Add the number of square meters of cultivated land you want to establish in-field grass strips or blocks on to intercept runoff water. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'waterbody',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates.waterbody.additional[0]} a square meter</strong> to establish in-field grass strips or blocks.</p>`,
      label: 'Number of square meters',
      unit: 'm<sup>2</sup>'
    }]
  },
  woodland: {
    hint: 'Add the number of square meters of newly planted woodland under 15 years old you want to maintain. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'woodland',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardsRates.woodland.additional[0]} a hectare</strong> to maintain newly planted woodland.</p>`,
      label: 'Number of square meters',
      unit: 'm<sup>2</sup>'
    }]
  }
}

module.exports = {
  // Used by land-calc.js
  getLandFeatureCategories: () => Object.entries(landFeatureCategories).map(([id, category]) => ({
    id,
    label: category.label,
    features: category.features.map(categoryId => ({
      id: categoryId,
      ...landFeatures[categoryId]
    }))
  })),
  // Used by select-std.js
  getStandards: () => Object.entries(standardsContent).map(([id, standard]) => ({
    id,
    descriptionHtml: stdDescription(id, [standardsRates[id].base, standardsRates[id].additional].flat()),
    ...standard
  })),
  // Used by extra-actions.js
  getExtraActions: () => Object.entries(extraActions).map(([id, standard]) => ({
    id,
    title: standardsContent[id].title,
    ...standard
  }))
}
