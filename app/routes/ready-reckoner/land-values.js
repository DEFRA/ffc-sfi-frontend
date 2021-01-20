const { v4: uuid } = require('uuid')
const session = require('./session-handler')
const standardsTemplate = require('../../services/standards')
const { runValidation } = require('../../services/validation')
const { updateAgreement } = require('../../messaging/senders')

const labelText = {
  arable: 'Arable land',
  grassland: 'Grassland',
  hedgerow: 'Hedgerows'
}

const pageDetails = {
  path: '/land-values',
  nextPath: '/loading',
  backPath: '/',
  template: 'land-values'
}

function getContentDetails (standards, values, errorList, errorText = null) {
  return {
    title: 'What land and boundaries do you manage?',
    errorList,
    errorText,
    backPath: pageDetails.backPath,
    components: {
      details: {
        summaryText: 'Why are we asking this?',
        text: 'This will help us suggest options your land qualifies for.',
        classes: 'govuk-!-margin-top-6'
      },
      inputs: standards.map(s => ({
        id: s.id,
        name: s.id,
        suffix: { text: s.units.symbol },
        label: { text: labelText[s.id] },
        classes: 'govuk-input--width-5',
        value: values?.[s.id],
        errorMessage: s?.errorMessage,
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
      session.setLandValues(request, payload)

      const { errorList, standards: updatedStandards } = await runValidation(payload)

      if (errorList.length > 0) {
        const pageContent = getContentDetails(updatedStandards, payload, errorList)
        return h.view(pageDetails.template, pageContent)
      }

      if (Object.values(payload).filter(value => Number(value) > 0).length === 0) {
        const errorMsg = 'Enter at least one positive value'
        const pageContent = getContentDetails(standardsTemplate, payload, [{ text: errorMsg }], errorMsg)
        return h.view(pageDetails.template, pageContent)
      }

      const body = addState(payload)
      const correlationId = uuid()
      const msg = { correlationId, body }
      await updateAgreement(msg)

      session.setCorrelationId(request, correlationId)
      return h.redirect(pageDetails.nextPath)
    }
  }
]
