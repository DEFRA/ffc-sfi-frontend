const session = require('./session-handler')
const htmlContent = require('./select-standard-content')
const Wreck = require('@hapi/wreck')
const { agreementServiceBaseUrl } = require('../../config/general')

const itemText = {
  arable: (paymentRate) => `Arable land, £${paymentRate} a hectare, plus £13 per tree`,
  grassland: (paymentRate) => `Grassland, £${paymentRate} a hectare, plus £3 per tree`,
  hedgerow: (paymentRate) => `Hedgrows, £${paymentRate} for every 100 meters`
}

const pageDetails = {
  path: '/select-standard',
  nextPath: '/selected-summary',
  template: 'select-standard'
}

function getContentDetails (payload, selected, errorText = null) {
  const items = Object.entries(payload).reduce((acc, [k, v]) => {
    if (v?.userInput > 0) {
      acc.push({
        value: v.id,
        text: itemText[v.id](v.paymentRate),
        checked: selected ? selected.includes(v.id) : false,
        conditional: {
          html: htmlContent[v.id](v.userInput, v.payment)
        }
      })
    }
    return acc
  }, [])

  return {
    title: 'Funding options you qualify for',
    components: {
      standards: {
        idPrefix: 'standards',
        name: 'standards',
        hint: {
          text: "Choose the options you want funding for. We'll pay you in monthly instalments so that work can begin without delay."
        },
        items,
        errorMessage: errorText
      },
      message: 'If you take part in another environmental scheme, for example Countryside Stewardship, you cannot apply for the same activity through SFI.'
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: async (request, h) => {
      const correlationId = session.getCorrelationId(request)
      const url = `${agreementServiceBaseUrl}/value?correlationId=${correlationId}`
      const { payload } = await Wreck.get(url, { json: true })

      session.setCalculationResult(request, payload.body)

      return h.view(pageDetails.template, getContentDetails(payload.body, session.getSelectedStandards(request)))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: (request, h) => {
      session.setSelectedStandards(request, request.payload.standards)

      if (!request.payload.standards) {
        return h.view(
          pageDetails.template,
          getContentDetails(
            session.getCalculationResult(request),
            session.getSelectedStandards(request),
            { text: 'Select at least one option.' }
          )
        )
      }

      return h.redirect(pageDetails.nextPath)
    }
  }
]
