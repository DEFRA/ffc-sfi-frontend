// const Joi = require('joi')
const content = require('./content')
const session = require('./session-handler')

const pageDetails = {
  path: '/select-std',
  nextPath: '/extra-actions',
  backPath: '/land-calc',
  template: 'select-std'
}

// const validationMsg = 'Select at least one option'

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
          name: `standards-${standard.id}`,
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

function determineSelectedStandards (payload) {
  return Object.entries(payload).reduce((acc, cur) => {
    const [k, v] = cur
    if (k.startsWith('standards-')) {
      acc.push(v)
    }
    return acc
  }, [])
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
      const selectedStandards = determineSelectedStandards(request.payload)
      session.setValue(request, session.keys.selectedStandards, selectedStandards)
      return h.redirect(pageDetails.nextPath)
    }
    // TODO: replace with appropriate validation check
    // options: {
    //   validate: {
    //     payload: Joi.object({
    //       // Either a string (if one checkbox selected) or array (if multiple checkboxes selected)
    //       // 'standards' property is required
    //       // standards: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).required()
    //     }),
    //     failAction: async (request, h, error) => {
    //       console.log('******************', request.payload)
    //       const selectedStandards = [request.payload.standards].flat()
    //       const landValues = session.getValue(request, session.keys.landValues)
    //       return h.view(pageDetails.template, pageContent(selectedStandards, landValues, validationMsg)).takeover()
    //     }
    //   }
    // }
  }
]
