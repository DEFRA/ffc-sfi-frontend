const Joi = require('joi')
const content = require('./content-scratch')
const session = require('./session-handler')

const pageDetails = {
  path: '/extra-actions',
  nextPath: '/sfi-summary',
  backPath: '/select-std',
  template: 'extra-actions'
}

const validationMsg = 'Enter only numerical values'

function pageContent (defaultValue, selectedStandards, errorText = null) {
  return {
    title: 'Extra actions',
    hint: 'Add actions to increase your payments.',
    errorText,
    backPath: pageDetails.backPath,
    components: {
      standards: content.getExtraActions().map(standard => ({
        visible: selectedStandards.includes(standard.id),
        title: standard.title,
        hint: standard.hint,
        actions: standard.actions.map(action => ({
          preHtml: action.preHtml,
          input: {
            name: action.id,
            suffix: { html: action.unit },
            label: { html: action.label },
            classes: 'govuk-input--width-5',
            spellcheck: false,
            value: defaultValue?.[action.id]?.toString()
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
      const selectedStandards = session.getValue(request, session.keys.selectedStandards)

      // If there aren't any actions for the selected standard then redirect to the next page
      // FIXME: I need to know what the extra actions are before content rendering
      // so that we can redirect if there are no extra actions to show
      // asking for the content here is ugly, data should be got from elsewhere
      if (!content.getExtraActions().find(a => selectedStandards.includes(a.id))) {
        return h.redirect(pageDetails.nextPath)
      }

      const actionValues = session.getValue(request, session.keys.actionValues)
      return h.view(pageDetails.template, pageContent(actionValues, selectedStandards))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      session.setValue(request, session.keys.actionValues, request.payload)
      return h.redirect(pageDetails.nextPath)
    },
    options: {
      validate: {
        payload: Joi.object().pattern(
          Joi.string(),
          [Joi.number().positive().allow(0), Joi.string().max(0).empty('').default(0)]
        ),
        failAction: async (request, h, error) => {
          const selectedStandards = session.getValue(request, session.keys.selectedStandards)
          return h.view(pageDetails.template, pageContent(request.payload, selectedStandards, validationMsg)).takeover()
        }
      }
    }
  }
]
