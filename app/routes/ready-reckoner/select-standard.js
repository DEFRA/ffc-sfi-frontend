const htmlContent = require('./select-standard-content')

const pageDetails = {
  path: '/select-standard',
  nextPath: '/selected-summary',
  template: 'select-standard',
  content: {
    title: 'Funding options you qualify for',
    components: {
      standards: {
        idPrefix: 'standards',
        name: 'standards',
        hint: {
          text: "Choose the options you want funding for. We'll pay you in monthly instalments so that work can begin without delay."
        },
        items: [
          {
            value: 'arable',
            text: 'Arable land, £26 a hectare, plus £13 per tree',
            conditional: {
              html: htmlContent.arable
            }
          },
          {
            value: 'grassland',
            text: 'Grassland, £30 a hectare, plus £3 per tree',
            conditional: {
              html: htmlContent.grassland
            }
          },
          {
            value: 'hedgerow',
            text: 'Hedgrows, £16 for every 100 meters',
            conditional: {
              html: htmlContent.hedgerow
            }
          }
        ]
      },
      message: 'If you take part in another environmental scheme, for example Countryside Stewardship, you cannot apply for the same activity through SFI.'
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
    handler: (request, h) => {
      console.log(request.payload)
      return h.redirect(pageDetails.nextPath)
    }
  }
]
