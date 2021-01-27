// FIXME: these aren't STANDARDS and ACTIONS. They are categorised land features.
const standards = [
  {
    title: 'Arable and cropland',
    actions: [
      {
        label: 'Arable land',
        name: 'arable',
        unit: 'ha'
      }
    ]
  },
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
    title: 'On farm woodland',
    actions: [
      {
        label: 'Farm woodland <strong>over</strong> 15 years old',
        name: 'mature-woodland',
        unit: 'ha'
      },
      {
        label: 'Farm woodland <strong>under</strong> 15 years old',
        name: 'new-woodland',
        unit: 'ha'
      }
    ]
  },
  {
    title: 'Hedgerows and boundaries',
    actions: [
      {
        label: 'Hedgerows',
        name: 'hedgerows',
        unit: 'm'
      }
    ]
  },
  {
    title: 'Water bodies',
    actions: [
      {
        label: 'Waterbody buffers',
        name: 'waterbody',
        unit: 'm'
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
    title: 'Add your total land and boundaries',
    hint: 'Fill in as many fields as you want to check the funding you could get.',
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
