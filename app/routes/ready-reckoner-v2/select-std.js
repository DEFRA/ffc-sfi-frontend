const Joi = require('joi')
const content = require('./content-scratch')
const session = require('./session-handler')

const pageDetails = {
  path: '/select-std',
  nextPath: '/extra-actions',
  backPath: '/land-calc',
  template: 'select-std'
}

const validationMsg = 'Select at least one option'

function pageContent (defaultValue, landValues, errorText = null) {
  return {
    title: 'Choose which standards you want to do',
    hint: 'Any actions you\'re already doing count towards these standards.<br/><br/>We\'ll pay you in monthly instalments so that work can begin without delay.',
    errorText,
    backPath: pageDetails.backPath,
    components: {
      standards: content.getStandards().map(standard => ({
        visible: landValues[standard.landFeature] > 0,
        title: standard.title,
        descriptionHtml: standard.descriptionHtml,
        checkbox: {
          name: 'standards',
          items: [{
            text: standard.checkboxLabel,
            value: standard.id,
            checked: defaultValue ? defaultValue.includes(standard.id) : false
          }]
        }
      }))
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: (request, h) => {
      const selectedStandards = session.getValue(request, session.keys.selectedStandards)
      const landValues = session.getValue(request, session.keys.landValues)
      return h.view(pageDetails.template, pageContent(selectedStandards, landValues))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      // request.payload.standards is a string if only a single standard is chosen, array otherwise
      // so force it to be alway be an array to avoid potential errors elsewhere
      session.setValue(request, session.keys.selectedStandards, [request.payload.standards].flat())
      return h.redirect(pageDetails.nextPath)
    },
    options: {
      validate: {
        payload: Joi.object({
          // Either a string (if one checkbox selected) or array (if multiple checkboxes selected)
          // 'standards' property is required
          standards: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).required()
        }),
        failAction: async (request, h, error) => {
          const selectedStandards = [request.payload.standards].flat()
          const landValues = session.getValue(request, session.keys.landValues)
          return h.view(pageDetails.template, pageContent(selectedStandards, landValues, validationMsg)).takeover()
        }
      }
    }
  }
]
