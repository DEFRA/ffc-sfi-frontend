const session = require('./session-handler')
const standardsTemplate = require('../../services/standards-arr')
const { v4: uuid } = require('uuid')
const { updateAgreement } = require('../../messaging/senders')
const { runValidation } = require('../../services/validation')

const labelText = {
  arable: 'Arable land',
  grassland: 'Grassland',
  hedgerow: 'Hedgerows'
}

const pageDetails = {
  path: '/land-values',
  nextPath: '/loading',
  template: 'land-values'
}

function getContentDetails (standards, values, errorList) {
  return {
    title: 'What land and boundaries do you manage?',
    errorList,
    components: {
      details: {
        summaryText: 'Why are we asking this?',
        text: 'This will help us suggest options your land qualifies for.'
      },
      inputs: standards.map(standard => ({
        id: standard.id,
        name: standard.id,
        suffix: { text: standard.units.symbol },
        label: { text: labelText[standard.id] },
        classes: 'govuk-input--width-5',
        value: values?.[standard.id],
        errorMessage: standard?.errorMessage,
        spellcheck: false
      }))
    }
  }
}

function addState (input) {
  return Object.entries(input).reduce((acc, cur) => {
    const [k, v] = cur
    const standard = standardsTemplate.find(s => s.id === k)
    standard.userInput = Number(v)
    acc[k] = standard
    return acc
  }, {})

  // leaving here for discussion
  // const msg = {}
  // for (const [k, v] of Object.entries(input)) {
  //   const standard = standardsTemplate.find(s => s.id === k)
  //   standard.userInput = Number(v)
  //   msg[k] = standard
  // }
  // return msg
}

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: (request, h) => {
      return h.view(pageDetails.template, getContentDetails(standardsTemplate, session.getLandValues(request)))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      const payload = { ...request.payload }
      const { errorList, standards: updatedStandards } = await runValidation(payload)

      session.setLandValues(request, payload)

      if (errorList.length > 0) {
        const pageContent = getContentDetails(updatedStandards, payload, errorList)
        return h.view(pageDetails.template, pageContent)
      } else {
        const body = addState(payload)
        const correlationId = uuid()
        const msgToSend = { correlationId, body }
        await updateAgreement(msgToSend)

        session.setCorrelationId(request, correlationId)
        return h.redirect(pageDetails.nextPath)
      }
    }
  }
]
