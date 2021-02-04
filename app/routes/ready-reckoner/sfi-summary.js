const content = require('./content-scratch')

function tableRowContent (col1Text, col2Text, linkAddress) {
  return [
    { text: col1Text }, { text: col2Text }, { html: `<a href="${linkAddress}">Change</a>`, format: 'numeric' }
  ]
}

const standards = {
  arable: {
    title: 'Arable land'
  },
  'arable-soils': {
    title: 'Arable and horticultural soils'
  },
  'improved-grassland': {
    title: 'Improved grassland'
  },
  'improved-grassland-soils': {
    title: 'Improved grassland soils'
  },
  'unimproved-grassland': {
    title: 'Semi-improved and unimproved grassland'
  },
  woodland: {
    title: 'Farm woodland'
  },
  hedgerows: {
    title: 'Hedgerows'
  },
  'waterbody-buffers': {
    title: 'Waterbody buffering'
  }
}

const extraActions = {
  'improved-grassland0': { label: (amount) => `${amount} trees with a buffer around` },
  'improved-grassland-soils0': { label: (amount) => `${amount} hectares with reduced or removed livestock` },
  'improved-grassland-soils1': { label: (amount) => `${amount} hectares of permanent grassland` },
  arable0: { label: (amount) => `${amount} trees with a buffer around` },
  'arable-soils0': { label: (amount) => `${amount} hectares of green cover` },
  woodland0: { label: (amount) => `${amount} square metres of newly planted woodland` },
  'waterbody-buffers0': { label: (amount) => `${amount} square metres of in-field grass strips or blocks` }
}

const pageDetails = {
  path: '/sfi-summary',
  nextPath: '/',
  backPath: '/extra-actions',
  template: 'sfi-summary'
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
        htmlBlurb: details.htmlBlurb({ amountImproved: 999, amountUnimproved: 666, payment: 777, paymentOptional: 333, amount: 222 }),
        standardsTable: {
          exists: details.standards.length > 0,
          noTableMsg: '<p class="govuk-body">No standards selected. <a href="/select-std">Change</a></p>',
          head: [{ text: 'Standard', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.standards.map(standard =>
            tableRowContent(standards[standard].title, '£100', '/select-std')
          )
        },
        actionsTable: {
          exists: details.extraActions.length > 0,
          noTableMsg: '<p class="govuk-body">No extra actions selected. <a href="/extra-actions">Change</a></p>',
          head: [{ text: 'Extra action', classes: 'govuk-!-width-three-quarters' }, { text: 'Payment' }, { text: '' }],
          rows: details.extraActions.map(action =>
            tableRowContent(extraActions[action].label('999'), '£100', '/extra-actions')
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
