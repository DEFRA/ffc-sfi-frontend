const content = require('./content-scratch')

function tableRowContent (col1Text, col2Text, linkAddress) {
  return [{ text: col1Text }, { text: col2Text }, { html: `<a href="${linkAddress}">Change</a>`, format: 'numeric' }]
}

const pageDetails = {
  path: '/sfi-summary',
  nextPath: '/',
  backPath: '/extra-actions',
  template: 'sfi-summary'
}

const standardAmounts = {
  'improved-grassland': 999,
  'improved-grassland-soils': 888,
  'unimproved-grassland': 777,
  arable: 666,
  'arable-soils': 555,
  hedgerows: 444,
  'waterbody-buffers': 333,
  woodland: 222
}

const actionAmounts = {
  'improved-grassland0': {
    amount: 98,
    payment: 700
  },
  'improved-grassland-soils0': {
    amount: 87,
    payment: 600
  },
  'improved-grassland-soils1': {
    amount: 76,
    payment: 500
  },
  arable0: {
    amount: 65,
    payment: 400
  },
  'arable-soils0': {
    amount: 54,
    payment: 300
  },
  woodland0: {
    amount: 43,
    payment: 200
  },
  'waterbody-buffers0': {
    amount: 32,
    payment: 100
  }
}

const categoryAmounts = {
  grassland: {
    amountImproved: 111,
    amountUnimproved: 222,
    payment: 321,
    paymentOptional: 432
  },
  arable: {
    amount: 333,
    payment: 543,
    paymentOptional: 654
  },
  boundary: {
    amountHedgerows: 444,
    amountWaterbody: 555,
    payment: 765,
    paymentOptional: 876
  },
  woodland: {
    amount: 666,
    payment: 987,
    paymentOptional: 789
  }
}

function pageContent (errorText = null) {
  return {
    title: 'Summary',
    hint: 'How much you will get in 2022.',
    errorText,
    backPath: pageDetails.backPath,
    components: {
      insetText: {
        html: content.getTotalFunding(70002.123456, 6000.9999, 8000.3292, 78000.11111)
      },
      summaryTitle: 'Funding breakdown',
      summaryList: content.getFundingBreakdown().map(details => ({
        label: details.label,
        htmlBlurb: details.descriptionHtml(categoryAmounts[details.id]),
        standardsTable: {
          exists: details.standards.length > 0,
          noTableMsg: '<p class="govuk-body">No standards selected. <a href="/select-std">Change</a></p>',
          head: [{ text: 'Standard', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.standards.map(standard =>
            tableRowContent(standard.title, standardAmounts[standard.id], '/select-std')
          )
        },
        actionsTable: {
          exists: details.extraActions.length > 0,
          noTableMsg: '<p class="govuk-body">No extra actions selected. <a href="/extra-actions">Change</a></p>',
          head: [{ text: 'Extra action', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.extraActions.map(action =>
            tableRowContent(action.label(actionAmounts[action.id].amount), actionAmounts[action.id].payment, '/extra-actions')
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

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: (request, h) => {
      return h.view(pageDetails.template, pageContent())
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      const payload = { ...request.payload }
      console.log(payload)

      // if (errorList.length > 0) {
      //   const pageContent = pageContent(updatedStandards, payload, errorList)
      //   return h.view(pageDetails.template, pageContent)
      // }

      return h.redirect(pageDetails.nextPath)
    }
  }
]
