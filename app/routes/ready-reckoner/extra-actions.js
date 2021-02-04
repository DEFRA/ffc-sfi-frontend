const content = require('./content-scratch')

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
      standards: content.getExtraActions().map(standard => ({
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
