const { v4: uuid } = require('uuid')

const session = require('./session-handler')
const standardsTemplate = require('../../services/standards-v2')
const { updateAgreement } = require('../../messaging/senders')

// TODO: map the land types to the standards. doesn't matter which way round as
//       the relationship is assumed to be 1-to-1
//       for each
function hydrateStandards (landValues, actionValues) {
  // Could filter landValues to only those with a value greater than 0 but by
  // not doing this, they can run through the calculation and everything will
  // work, it'll be easier to reason about and if they were to be required
  // within the calculation at some point they are already there
  const actionValueSet = Object.keys(actionValues)
  return Object.entries(landValues).reduce((acc, cur) => {
    const [k, v] = cur
    standardsTemplate.filter(s => s.landType === k).forEach(s => {
      s.landValue = Number(v)
      acc[s.id] = s
      s.optionalActions.filter(a => actionValueSet.includes(a.id)).forEach(a => {
        a.inputValue = actionValues[a.id]
      })
    })
    return acc
  }, {})
}

// TODO: Update all instances where there is a call to the sfi-summary page
//       with a call to a calculation endpoint
//       This will send off the message and return a view that will be show a
//       loading message before redirecting to the sfi-summary page. This
//       effectively is a reworking on the loading endpoint.
//       Other stuff that is likely required - reworking the data model
//       internally and reworking the calculation service to work with the new
//       model.
module.exports = [{
  method: 'GET',
  path: '/calculating',
  handler: async (request, h) => {
    console.log('*********************GET calculating')
    // Do payment calculation
    const landValues = session.getValue(request, session.keys.landValues)
    const actionValues = session.getValue(request, session.keys.actionValues)
    const bpsPayment = session.getValue(request, session.keys.bpsPayment)
    const selectedStandards = session.getValue(request, session.keys.selectedStandards)
    const standards = hydrateStandards(landValues, actionValues)

    console.log('landValues', landValues)
    console.log('actionValues', actionValues)
    console.log('bpsPayment', bpsPayment)
    console.log('selectedStandards', selectedStandards)
    console.log('standards')
    console.log(JSON.stringify(standards, null, 2))

    // TODO: construct new message from data. below is the required format
    const standardsSet = {
      calculations: '',
      id: 'standardsSet',
      standards
    }
    // within the standards need to include the amount of land applicable to each one
    // and the value of the actions

    const correlationId = uuid()
    const msg = { body: standardsSet, correlationId }
    await updateAgreement(msg)
    // TODO: The resultant msg, requested in sfi-summary needs to calculate all
    //       of the standards, even if they are not selected

    session.setValue(request, session.keys.correlationId, correlationId)

    return h.view('calculating')
  }
}]
