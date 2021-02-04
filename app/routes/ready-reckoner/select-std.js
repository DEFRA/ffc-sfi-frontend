const content = require('./content-scratch')

const pageDetails = {
  path: '/select-std',
  nextPath: '/extra-actions',
  backPath: '/land-calc',
  template: 'select-std'
}

function pageContent (errorText = null) {
  return {
    title: 'Choose which standards you want to do',
    hint: 'Any actions you\'re already doing count towards these standards.<br/><br/>We\'ll pay you in monthly instalments so that work can begin without delay.',
    errorText,
    backPath: pageDetails.backPath,
    components: {
      standards: content.getStandards().map(standard => ({
        title: standard.title,
        htmlBlurb: standard.descriptionHtml,
        checkbox: {
          name: 'standards',
          items: [{ text: standard.checkboxLabel, value: standard.id, id: standard.id }]
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
