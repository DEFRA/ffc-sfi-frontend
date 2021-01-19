const session = require('./session-handler')
const Wreck = require('@hapi/wreck')
const { agreementServiceBaseUrl } = require('../../config/general')
const content = require('./standards-content')

const pageDetails = {
  path: '/select-standard',
  nextPath: '/selected-summary',
  backPath: '/land-values',
  template: 'select-standard'
}

function getContentDetails (payload, selected, errorText = null) {
  const standardsToShow = Object.entries(payload).reduce((acc, [k, v]) => {
    if (v?.userInput > 0) {
      acc.push({
        value: k,
        text: content[k].selectStandard.checkboxItemText(v.paymentRate),
        checked: selected ? selected.includes(k) : false,
        conditional: {
          html: content[k].selectStandard.hintText(v.userInput, v.payment)
        }
      })
    }
    return acc
  }, [])

  return {
    title: 'Funding options you qualify for',
    backPath: pageDetails.backPath,
    components: {
      standards: {
        idPrefix: 'standards',
        name: 'standards',
        hint: {
          text: "Choose the options you want funding for. We'll pay you in monthly instalments so that work can begin without delay."
        },
        items: standardsToShow,
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
