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

function pageContent (defaultValue, errorText = null) {
  return {
    title: 'Choose which standards you want to do',
    hint: 'Any actions you\'re already doing count towards these standards.<br/><br/>We\'ll pay you in monthly instalments so that work can begin without delay.',
    errorText,
    backPath: pageDetails.backPath,
    components: {
      standards: content.getStandards().map(standard => ({
        title: standard.title,
        descriptionHtml: standard.descriptionHtml,
        checkbox: {
          name: 'standards',
          items: [{
            text: standard.checkboxLabel,
            value: standard.id,
            // defaultValue could be a string or array, but both have an includes() method that does what we want
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
      return h.view(pageDetails.template, pageContent(session.getValue(request, session.keys.selectedStandards)))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      session.setValue(request, session.keys.selectedStandards, request.payload.standards)
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
          return h.view(pageDetails.template, pageContent(request.payload.standards, validationMsg)).takeover()
        }
      }
    }
  }
]
