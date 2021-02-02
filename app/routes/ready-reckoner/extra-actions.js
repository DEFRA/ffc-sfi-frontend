const standardRates = {
  arable: [13],
  'arable-soils': [114],
  'improved-grassland': [3],
  'improved-grassland-soils': [88, 56],
  waterbody: ['0.05'],
  woodland: [200]
}

const standards = [
  {
    id: 'improved-grassland',
    title: 'Improved grassland',
    hint: 'Add the number of trees on your improved grassland you want to maintain a 10 metre radius buffer around. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'improved-grassland',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardRates['improved-grassland'][0]} for each tree you maintain a buffer around</strong>.</p>`,
      label: 'Number of trees',
      unit: 'trees'
    }]
  },
  {
    id: 'improved-grassland-soils',
    title: 'Improved grassland soils',
    hint: 'Add how many hectares you want to use for each action. You can leave fields blank if you don\'t know.',
    actions: [{
      id: 'improved-grassland-soils1',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardRates['improved-grassland-soils'][0]} a hectare</strong> to reduce stocking density or remove livestock from wet soils.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    },
    {
      id: 'improved-grassland-soils2',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardRates['improved-grassland-soils'][1]} a hectare</strong> to maintain permanent grassland that you only re-seed by direct drilling or over-sowing.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    }]
  },
  {
    id: 'arable',
    title: 'Arable land',
    hint: 'Add the number of trees on your arable land you want to maintain a 10 metre radius buffer around. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'arable',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardRates.arable[0]} for each tree you maintain a buffer around</strong>.</p>`,
      label: 'Number of trees',
      unit: 'trees'
    }]
  },
  {
    id: 'arable-soils',
    title: 'Arable and horticultural soils',
    hint: 'Add the number of hectares of arable land at risk of surface runoff, soil erosion or flooding you want to establish green cover on. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'arable-soils',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardRates['arable-soils'][0]} a hectare</strong> to establish green cover.</p>`,
      label: 'Number of hectares',
      unit: 'ha'
    }]
  },
  {
    id: 'waterbody',
    title: 'Waterbody buffering',
    hint: 'Add the number of square meters of cultivated land you want to establish in-field grass strips or blocks on to intercept runoff water. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'waterbody',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardRates.waterbody[0]} a square meter</strong> to establish in-field grass strips or blocks.</p>`,
      label: 'Number of square meters',
      unit: 'm<sup>2</sup>'
    }]
  },
  {
    id: 'woodland',
    title: 'Farm woodland',
    hint: 'Add the number of square meters of newly planted woodland under 15 years old you want to maintain. You can leave this blank if you don\'t know.',
    actions: [{
      id: 'woodland',
      preHtml: `<p class="govuk-body govuk-!-margin-top-6">We’ll pay you <strong>£${standardRates.woodland[0]} a hectare</strong> to maintain newly planted woodland.</p>`,
      label: 'Number of square meters',
      unit: 'm<sup>2</sup>'
    }]
  }
]

const pageDetails = {
  path: '/extra-actions',
  nextPath: '/sfi-summary',
  backPath: '/select-std',
  template: 'extra-actions'
}

function pageContent (errorText = null) {
  return {
    title: 'Extra actions',
    hint: 'Add actions to increase your payments.',
    errorText,
    backPath: pageDetails.backPath,
    components: {
      standards: standards.map(standard => ({
        title: standard.title,
        hint: standard.hint,
        actions: standard.actions.map(action => ({
          preHtml: action.preHtml,
          input: {
            id: action.name,
            name: action.name,
            suffix: { html: action.unit },
            label: { html: action.label },
            classes: 'govuk-input--width-5',
            spellcheck: false
          }
        }))
      }))
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: (request, h) => {
      return h.view(pageDetails.template, pageContent())
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      const payload = { ...request.payload }
      console.log(payload)

      // if (errorList.length > 0) {
      //   const pageContent = pageContent(updatedStandards, payload, errorList)
      //   return h.view(pageDetails.template, pageContent)
      // }

      return h.redirect(pageDetails.nextPath)
    }
  }
]
