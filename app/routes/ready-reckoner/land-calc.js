const content = require('./content-scratch')

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
      standards: content.getLandFeatureCategories().map(category => ({
        title: category.label,
        inputs: category.features.map(feature => ({
          id: feature.name,
          name: feature.name,
          suffix: { text: feature.unit },
          label: { html: feature.label },
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
