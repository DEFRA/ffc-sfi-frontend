const Joi = require('joi')
const session = require('./session-handler')
const content = require('./content-scratch')

const pageDetails = {
  path: '/land-calc',
  nextPath: '/select-std',
  backPath: '/bps-payment',
  template: 'land-calc'
}

const validationMsg = 'Enter the land area or boundary length for at least one option'

function pageContent (defaultValue, errorText = null) {
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
          name: feature.id,
          suffix: { text: feature.unit },
          label: { html: feature.label },
          classes: 'govuk-input--width-5',
          spellcheck: false,
          value: defaultValue?.[feature.id].toString()
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
      return h.view(pageDetails.template, pageContent(session.getValue(request, session.keys.landValues)))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      session.setValue(request, session.keys.landValues, request.payload)
      return h.redirect(pageDetails.nextPath)
    },
    options: {
      validate: {
        // Check any property for either a positive number (allowing 0), or if left blank set to 0
        payload: Joi.object().pattern(
          Joi.string(),
          [Joi.number().positive().allow(0), Joi.string().max(0).empty('').default(0)]
        ),
        failAction: async (request, h, error) => {
          return h.view(pageDetails.template, pageContent(request.payload, validationMsg)).takeover()
        }
      }
    }
  }
]
