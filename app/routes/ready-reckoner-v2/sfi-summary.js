const Wreck = require('@hapi/wreck')

const content = require('./content')
const standards = require('./standards')
const session = require('./session-handler')
const { agreementServiceBaseUrl } = require('../../config/general')

function tableRowContent (col1Text, col2Text, linkAddress) {
  return [
    { text: col1Text },
    { text: `${col2Text.toLocaleString('en-GB', { currency: 'GBP', style: 'currency' })}` },
    { html: `<a href="${linkAddress}">Change</a>`, format: 'numeric' }]
}

const pageDetails = {
  path: '/sfi-summary',
  nextPath: '/',
  template: 'sfi-summary'
}

function pageContent (categoryAmounts, actionValues, paymentAmounts) {
  return {
    title: 'Summary',
    hint: 'How much you will get in 2022.',
    backPath: pageDetails.backPath,
    components: {
      insetText: {
        html: content.getTotalFunding(
          paymentAmounts.sfiTotal,
          paymentAmounts.sfiMonthly,
          paymentAmounts.bpsPayment,
          paymentAmounts.grandTotal
        )
      },
      summaryTitle: 'Funding breakdown',
      summaryList: content.getFundingBreakdown().map(details => ({
        visible: categoryAmounts[details.id].visible,
        label: details.label,
        htmlBlurb: details.descriptionHtml(categoryAmounts[details.id]),
        standardsTable: {
          exists: categoryAmounts[details.id].payment > 0,
          noTableMsg: '<p class="govuk-body">No standards selected. <a href="/select-std">Change</a></p>',
          head: [{ text: 'Standard', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.standards.filter(standard => paymentAmounts[standard.id].base > 0).map(standard =>
            tableRowContent(standard.title, paymentAmounts[standard.id].base, '/select-std')
          )
        },
        actionsTable: {
          exists: categoryAmounts[details.id].paymentOptional > 0,
          noTableMsg: '<p class="govuk-body">No extra actions selected. <a href="/extra-actions">Change</a></p>',
          head: [{ text: 'Extra action', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.extraActions.filter(action => paymentAmounts[action.standard].optional[action.id] > 0).map(
            action => tableRowContent(
              action.label(actionValues?.[action.id] ?? 0),
              paymentAmounts[action.standard].optional[action.id],
              '/extra-actions'
            )
          )
        }
      })),
      radios: {
        classes: 'govuk-radios--inline',
        name: 'start-application',
        fieldset: {
          legend: {
            text: 'Are you ready to start your application?',
            classes: 'govuk-fieldset__legend--m'
          }
        },
        items: [{ value: 'yes', text: 'Yes' }, { value: 'no', text: 'No' }
        ]
      }
    }
  }
}

function doPaymentCalculations (landValues, actionValues, bpsPayment, selectedStandards) {
  const standardsRates = standards.standardsRates
  const landFeatures = standards.landFeatures

  let bps = 0
  let bpsRemainder = bpsPayment

  switch (true) {
    case (bpsRemainder > 150000):
      // 25% reduction over 150000
      bps += (bpsRemainder - 150000) * 0.75
      bpsRemainder = 150000
    case (bpsRemainder > 50000):
      // 20% reduction between 50000 and 150000
      bps += (bpsRemainder - 50000) * 0.8
      bpsRemainder = 50000
    case (bpsRemainder > 30000):
      // 10% reduction between 30000 and 50000
      bps += (bpsRemainder - 30000) * 0.9
      bpsRemainder = 30000
    default:
      // 5% reduction up to 30000
      bps += bpsRemainder * 0.95
  }

  const paymentTotals = {
    sfiTotal: 0,
    bpsPayment: bps
  }

  Object.entries(landFeatures).forEach(([featureId, feature]) => {
    feature.standards.forEach(standardId => {
      paymentTotals[standardId] = {
        base: (selectedStandards.includes(standardId) ? landValues[featureId] : 0) * standardsRates[standardId].mandatory,
        optional: {}
      }

      paymentTotals.sfiTotal += paymentTotals[standardId].base

      standards.standards[standardId].optionalActions.forEach((actionId, i) => {
        paymentTotals[standardId].optional[actionId] = (actionValues?.[actionId] ?? 0) * standardsRates[standardId].optional[i]

        // Payment rates for this is in hectares, but user input is in meters square
        if (actionId === 'woodland0') {
          paymentTotals[standardId].optional[actionId] /= 10000
        }

        paymentTotals.sfiTotal += paymentTotals[standardId].optional[actionId]
      })
    })
  })

  paymentTotals.sfiMonthly = paymentTotals.sfiTotal / 12
  paymentTotals.grandTotal = paymentTotals.sfiTotal + paymentTotals.bpsPayment

  return paymentTotals
}

// TODO: Figure out why the page is being requested twice
module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: async (request, h) => {
      console.log('********************GET to sfi-summary', Date.now())
      // FIXME: is there a nicer way of doing this?
      pageDetails.backPath = 'javascript:history.go(-1)'

      // TODO: Update this with a call to the agreement service to get the calculation msg
      const correlationId = session.getValue(request, session.keys.correlationId)
      console.log('***************correlationId', correlationId)
      const url = `${agreementServiceBaseUrl}/value?correlationId=${correlationId}`
      const { payload } = await Wreck.get(url, { json: true })
      console.log('payload', payload)

      // Do payment calculation
      const landValues = session.getValue(request, session.keys.landValues)
      const actionValues = session.getValue(request, session.keys.actionValues)
      const bpsPayment = session.getValue(request, session.keys.bpsPayment)
      const selectedStandards = session.getValue(request, session.keys.selectedStandards)
      const paymentAmounts = doPaymentCalculations(landValues, actionValues, bpsPayment, selectedStandards)

      const landFeatures = standards.landFeatures
      const landFeatureCategories = standards.landFeatureCategories
      const categoryAmounts = {}

      Object.entries(landFeatureCategories).forEach(([id, category]) => {
        categoryAmounts[id] = {
          visible: false,
          payment: 0,
          paymentOptional: 0
        }

        category.features.forEach(feature => {
          categoryAmounts[id][feature] = landValues[feature]
          landFeatures[feature].standards.forEach(standard => {
            if (selectedStandards.includes(standard)) {
              categoryAmounts[id].visible = true
              categoryAmounts[id].payment += paymentAmounts[standard].base
            }

            standards.standards[standard].optionalActions.forEach(
              action => (categoryAmounts[id].paymentOptional += paymentAmounts[standard].optional[action])
            )
          })
        })

        categoryAmounts[id].payment += categoryAmounts[id].paymentOptional
      })

      console.log('categoryAmount', categoryAmounts)
      console.log('actionValues', actionValues)
      console.log('paymentAmounts', paymentAmounts)

      return h.view(pageDetails.template, pageContent(categoryAmounts, actionValues, paymentAmounts))
    }
  }
]
