const standards = require('../../services/standards')
// const { runValidation } = require('../../services/validation')
// const toShow = ['arable', 'grassland', 'hedgerow']

// FIXME: make this into a function that returns a pageDetails object
// Pass into the function the value and error messages to add to the content
const pageDetails = {
  path: '/land-values',
  nextPath: '/select-standard',
  template: 'land-values',
  content: {
    title: 'What land and boundaries do you manage?',
    components: {
      details: {
        summaryText: 'Why are we asking this?',
        text: 'This will help us suggest options your land qualifies for.'
      },
      inputs: [
        // FIXME: the only difference here is the label text, define this elsewhere and map to standard id
        // then these three can be generated via a loop-da-loop
        {
          id: standards.arable.id,
          name: standards.arable.id,
          suffix: { text: standards.arable.units.symbol },
          label: { text: 'Arable land' },
          classes: 'govuk-input--width-5',
          value: null,
          spellcheck: false
        },
        {
          id: standards.grassland.id,
          name: standards.grassland.id,
          suffix: { text: standards.grassland.units.symbol },
          label: { text: 'Grassland' },
          classes: 'govuk-input--width-5',
          value: null,
          spellcheck: false
        },
        {
          id: standards.hedgerow.id,
          name: standards.hedgerow.id,
          suffix: { text: standards.hedgerow.units.symbol },
          label: { text: 'Hedgerows' },
          classes: 'govuk-input--width-5',
          value: null,
          spellcheck: false
        }
      ]
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: (request, h) => {
      return h.view(pageDetails.template, pageDetails.content)
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      console.log(request.payload)
      // const body = { ...request.payload }
      // const { errorList, standards } = await runValidation(body)
      // console.log(errorList, standards)

      // pageDetails.content.errorList = errorList

      // if (errorList.length > 0) {
      //   return h.view(pageDetails.template, pageDetails.content)
      // }
      // else {
      //   const partialMsg = addRules(body)
      //   const correlationId = uuid()
      //   const msgToSend = { correlationId, body: partialMsg }
      //   await updateAgreement(msgToSend)

      //   // return a page that will auto redirect to the page with the id generated
      //   return h.view('message-sent', { correlationId })
      // }

      return h.redirect(pageDetails.nextPath)
    }
  }
]
