const standards = require('../../services/standards')

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
      inputs: Object.entries(standards).map(([key, standard]) => ({
        id: standard.id,
        name: standard.id,
        suffix: { text: standard.units.symbol },
        label: { text: labelText[key] },
        classes: 'govuk-input--width-5',
        value: values?.[key],
        errorMessage: standard?.errorMessage,
        spellcheck: false
      }))
    }
  }
}

function addRules (input) {
  const msg = { ...standards }
  for (const [k, v] of Object.entries(input)) {
    msg[k].userInput = Number(v)
  }
  return msg
}

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: (request, h) => {
      return h.view(pageDetails.template, getContentDetails(standards, request.yar.get('landValues')))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      const body = { ...request.payload }
      const { errorList, standards: updatedStandards } = await runValidation(body)

      request.yar.set('landValues', body)

      if (errorList.length > 0) {
        const pageContent = getContentDetails(updatedStandards, request.yar.get('landValues'), errorList)
        return h.view(pageDetails.template, pageContent)
      } else {
        const partialMsg = addRules(body)
        const correlationId = uuid()
        const msgToSend = { correlationId, body: partialMsg }
        await updateAgreement(msgToSend)

        request.yar.set('correlationId', correlationId)
        return h.redirect(pageDetails.nextPath)
      }
    }
  }
]
