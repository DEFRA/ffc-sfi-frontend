const { v4: uuid } = require('uuid')

const session = require('./session-handler')
const standardsTemplate = require('../../services/standards-v2')
const { updateAgreement } = require('../../messaging/senders')

// NOTE: map the land types to the standards. doesn't matter which way round as
//       the relationship is assumed to be 1-to-1
function hydrateStandards (landValues, actionValues, selectedStandards) {
  // Could filter landValues to only those with a value greater than 0 but by
  // not doing this, they can run through the calculation and everything will
  // work, it'll be easier to reason about and if they were to be required
  // within the calculation at some point they are already there
  const actionValueSet = Object.keys(actionValues)
  return Object.entries(landValues).reduce((acc, cur) => {
    const [k, v] = cur
    standardsTemplate.filter(s => s.landType === k).forEach(s => {
      s.inputValue = Number(v)
      // flag to determine which standard(s) are included in total payment calc
      s.selected = selectedStandards.includes(s.id)
      acc[s.id] = s
      // actions are implicitly selected if they contain a value, no need to flag them as such
      s.optionalActions.filter(a => actionValueSet.includes(a.id)).forEach(a => {
        a.inputValue = actionValues[a.id]
      })
    })
    return acc
  }, {})
}

module.exports = [{
  method: 'GET',
  path: '/calculating',
  handler: async (request, h) => {
    const landValues = session.getValue(request, session.keys.landValues)
    const actionValues = session.getValue(request, session.keys.actionValues)
    const selectedStandards = session.getValue(request, session.keys.selectedStandards)
    const standards = hydrateStandards(landValues, actionValues, selectedStandards)

    // TODO: msg format doesn't include calculations. calc MS has been updated
    //       to support msgs with and without calculations
    const standardsSet = {
      id: 'standardsSet',
      standards
    }

    const correlationId = uuid()
    const msg = { body: standardsSet, correlationId }
    await updateAgreement(msg)

    session.setValue(request, session.keys.correlationId, correlationId)

    return h.view('calculating')
  }
}]
