// FIXME: these aren't STANDARDS and ACTIONS. They are categorised land features.
const standards = [
  {
    title: 'Grassland',
    actions: [
      {
        label: 'Improved grassland',
        name: 'improved-grassland',
        unit: 'ha'
      },
      {
        label: 'Semi-improved and unimproved grassland',
        name: 'unimproved-grassland',
        unit: 'ha'
      }
    ]
  },
  {
    title: 'Arable/horticultural land',
    actions: [
      {
        label: 'Arable and horticultural land',
        name: 'arable',
        unit: 'ha'
      }
    ]
  },
  {
    title: 'Boundary features',
    actions: [
      {
        label: 'Hedgerows',
        name: 'hedgerows',
        unit: 'ha'
      },
      {
        label: 'Waterbody buffers',
        name: 'waterbody',
        unit: 'ha'
      }
    ]
  },
  {
    title: 'On farm woodland',
    actions: [
      {
        label: 'Farm woodland over 15 years old',
        name: 'woodland',
        unit: 'ha'
      }
    ]
  }
]

const pageDetails = {
  path: '/land-calc',
  nextPath: '/select-std',
  backPath: '/bps-payment',
  template: 'land-calc'
}

function pageContent (errorText = null) {
  return {
    title: 'Add your land and boundaries',
    hint: 'Enter amounts.',
    errorText,
    backPath: pageDetails.backPath,
    components: {
      details: {
        summaryText: 'Why are we asking this?',
        text: 'This will help us suggest options your land qualifies for.',
        classes: 'govuk-!-margin-top-8'
      },
      standards: standards.map(standard => ({
        title: standard.title,
        inputs: standard.actions.map(action => ({
          id: action.name,
          name: action.name,
          suffix: { text: action.unit },
          label: { html: action.label },
          classes: 'govuk-input--width-5',
          spellcheck: false
        }))
      }))
      // standards.map(s => ({
      //   id: s.id,
      //   name: s.id,
      //   suffix: { text: s.units.symbol },
      //   label: { text: labelText[s.id] },
      //   classes: 'govuk-input--width-5',
      //   value: values?.[s.id],
      //   errorMessage: s?.errorMessage,
      //   spellcheck: false
      // }))
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
      //      const payload = { ...request.payload }

      // if (errorList.length > 0) {
      //   const pageContent = pageContent(updatedStandards, payload, errorList)
      //   return h.view(pageDetails.template, pageContent)
      // }

      return h.redirect(pageDetails.nextPath)
    }
  }
]
