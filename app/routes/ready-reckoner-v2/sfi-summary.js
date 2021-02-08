const content = require('./content-scratch')
const session = require('./session-handler')

function tableRowContent (col1Text, col2Text, linkAddress) {
  return [{ text: col1Text }, { text: col2Text }, { html: `<a href="${linkAddress}">Change</a>`, format: 'numeric' }]
}

const pageDetails = {
  path: '/sfi-summary',
  nextPath: '/',
  template: 'sfi-summary'
}

const standardAmounts = {
  'improved-grassland': 0,
  'improved-grassland-soils': 0,
  'unimproved-grassland': 0,
  arable: 0,
  'arable-soils': 0,
  hedgerows: 0,
  'waterbody-buffers': 0,
  woodland: 0
}

// const actionAmounts = {
//   'improved-grassland0': {
//     amount: 98,
//     payment: 700
//   },
//   'improved-grassland-soils0': {
//     amount: 87,
//     payment: 600
//   },
//   'improved-grassland-soils1': {
//     amount: 76,
//     payment: 500
//   },
//   arable0: {
//     amount: 65,
//     payment: 400
//   },
//   'arable-soils0': {
//     amount: 54,
//     payment: 300
//   },
//   woodland0: {
//     amount: 43,
//     payment: 200
//   },
//   'waterbody-buffers0': {
//     amount: 32,
//     payment: 100
//   }
// }

const paymentAmounts = {
  'improved-grassland': {
    base: 150,
    optional: {
      'improved-grassland0': 100
    }
  },
  'improved-grassland-soils': {
    base: 250,
    optional: {
      'improved-grassland-soils0': 200,
      'improved-grassland-soils1': 225
    }
  },
  'unimproved-grassland': {
    base: 350,
    optional: {}
  },
  arable: {
    base: 450,
    optional: {
      arable0: 400
    }
  },
  'arable-soils': {
    base: 550,
    optional: {
      'arable-soils0': 500
    }
  },
  hedgerows: {
    base: 650,
    optional: {}
  },
  'waterbody-buffers': {
    base: 750,
    optional: {
      'waterbody-buffers0': 700
    }
  },
  woodland: {
    base: 850,
    optional: {
      woodland0: 800
    }
  }
}

// const categoryAmounts = {
//   grassland: {
//     amountImproved: null,
//     amountUnimproved: null,
//     payment: 321,
//     paymentOptional: 432
//   },
//   arable: {
//     amount: null,
//     payment: 543,
//     paymentOptional: 654
//   },
//   boundary: {
//     amountHedgerows: null,
//     amountWaterbody: null,
//     payment: 765,
//     paymentOptional: 876
//   },
//   woodland: {
//     amount: null,
//     payment: 987,
//     paymentOptional: 789
//   }
// }

function pageContent (categoryAmounts, actionValues, errorText = null) {
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
        visible: categoryAmounts[details.id].visible,
        label: details.label,
        htmlBlurb: details.descriptionHtml(categoryAmounts[details.id]),
        standardsTable: {
          exists: details.standards.length > 0,
          noTableMsg: '<p class="govuk-body">No standards selected. <a href="/select-std">Change</a></p>',
          head: [{ text: 'Standard', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.standards.filter(standard => paymentAmounts[standard.id].base > 0).map(standard =>
            tableRowContent(standard.title, paymentAmounts[standard.id].base, '/select-std')
          )
        },
        actionsTable: {
          exists: details.extraActions.length > 0,
          noTableMsg: '<p class="govuk-body">No extra actions selected. <a href="/extra-actions">Change</a></p>',
          head: [{ text: 'Extra action', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.extraActions.filter(action => paymentAmounts[action.standard].optional[action.id] > 0).map(
            action => tableRowContent(
              action.label(actionValues?.[action.id] ?? 0),
              paymentAmounts[action.standard].optional[action.id],
              '/extra-actions')
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
      // FIXME: is there a nicer way of doing this?
      pageDetails.backPath = '/' + request.info.referrer.split('/').slice(-1)[0]

      const landValues = session.getValue(request, session.keys.landValues)
      const actionValues = session.getValue(request, session.keys.actionValues)
      const selectedStandards = session.getValue(request, session.keys.selectedStandards)
      const landFeatures = content.landFeatures
      const landFeatureCategories = content.landFeatureCategories
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
            }

            categoryAmounts[id].payment += paymentAmounts[standard].base
            content.standards[standard].optionalActions.forEach(
              action => (categoryAmounts[id].paymentOptional += paymentAmounts[standard].optional[action])
            )
          })
        })
      })

      console.log(categoryAmounts)
      console.log(actionValues)

      return h.view(pageDetails.template, pageContent(categoryAmounts, actionValues))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      return h.redirect(pageDetails.nextPath)
    }
  }
]
