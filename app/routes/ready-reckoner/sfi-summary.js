function toDisplay (value) {
  return value.toLocaleString('en-GB', { maximumFractionDigits: 2 })
}

function getInsetText (sfiTotal, sfiMonthly, bpsTotal, total) {
  return `
    <p class="govuk-body">For SFI you'll get <strong>£${toDisplay(sfiTotal)}</strong> in 12 monthly payments of <strong>£${toDisplay(sfiMonthly)}</strong>.</p>
    <p class="govuk-body">Your BPS payment will be <strong>£${toDisplay(bpsTotal)}</strong>.</p>
    <p class="govuk-body">Total: <strong>£${toDisplay(total)}</strong>.</p>
    <p class="govuk-body">Find out how <a href="">BPS payments are reducing</a>.</p>
    <details class="govuk-details" data-module="govuk-details">
      <summary class="govuk-details__summary">
        <span class="govuk-details__summary-text">How do we calculate this?</span>
      </summary>
      <div class="govuk-details__text">
        We multiply the payment rate for each standard by the number of hectares you enter
      </div>
    </details>`
}

function grasslandBlurb (improvedAmount, unimprovedAmount, payment, paymentExtra) {
  return `
    <p class="govuk-body">Based on your <strong><a href="/land-calc">${toDisplay(improvedAmount)} hectares</a></strong>
    of improved grassland and <strong><a href="/land-calc">${toDisplay(unimprovedAmount)} hectares</a></strong>
    of semi-improved or unimproved grassland, you would receive <strong>£${toDisplay(payment)} per year</strong>,
    including <strong>£${toDisplay(paymentExtra)}</strong> in extra payments.</p>`
}

function arableBlurb (amount, payment, paymentExtra) {
  return `
    <p class="govuk-body">Based on your <strong><a href="/land-calc">${toDisplay(amount)} hectares</a></strong>
    of arable land, you would recieve <strong>£${toDisplay(payment)} per year</strong>, including
    <strong>£${toDisplay(paymentExtra)}</strong> in extra payments.</p>`
}

function boundaryBlurb (hedgerowAmount, waterbodyAmount, payment, paymentExtra) {
  return `<p class="govuk-body">Based on your <strong><a href="/land-calc">${toDisplay(hedgerowAmount)} hectares</a></strong>
    of hedgerows and <strong><a href="/land-calc">${toDisplay(waterbodyAmount)} hectares</a></strong> of waterbody buffering,
    you would recieve <strong>£${toDisplay(payment)} per year</strong>, including
    <strong>£${toDisplay(paymentExtra)}</strong> in extra payments.</p>`
}

function woodlandBlurb (amount, payment, paymentExtra) {
  return `<p class="govuk-body">Based on your <strong><a href="/land-calc">${toDisplay(amount)} hectares</a></strong>
    of farm woodland, you would recieve <strong>£${toDisplay(payment)} per year</strong>, including
    <strong>£${toDisplay(paymentExtra)}</strong> in extra payments.</p>`
}

function tableRowContent (col1Text, col2Text, linkAddress) {
  return [
    { text: col1Text }, { text: col2Text }, { html: `<a href="${linkAddress}">Change</a>`, format: 'numeric' }
  ]
}

const summaryCategories = {
  grassland: {
    label: 'Grassland',
    htmlBlurb: grasslandBlurb(100, 40, 300, 20),
    standards: ['improved-grassland', 'improved-grassland-soils', 'unimproved-grassland'],
    extraActions: ['improved-grassland', 'improved-grassland-soils1', 'improved-grassland-soils2']
  },
  arable: {
    label: 'Arable and cropland',
    htmlBlurb: arableBlurb(200, 1039.433, 100),
    standards: ['arable', 'arable-soils'],
    extraActions: ['arable', 'arable-soils']
  },
  boundary: {
    label: 'Boundary features',
    htmlBlurb: boundaryBlurb(22, 33, 1044.555, 99),
    standards: ['hedgerows', 'waterbody'],
    extraActions: ['waterbody']
  },
  woodland: {
    label: 'On farm woodland',
    htmlBlurb: woodlandBlurb(382, 522, 77),
    standards: ['woodland'],
    extraActions: ['woodland']
  }
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
  waterbody: {
    title: 'Waterbody buffering'
  }
}

const extraActions = {
  'improved-grassland': { label: (amount) => `${amount} trees with a buffer around` },
  'improved-grassland-soils1': { label: (amount) => `${amount} hectares with reduced or removed livestock` },
  'improved-grassland-soils2': { label: (amount) => `${amount} hectares of permanent grassland` },
  arable: { label: (amount) => `${amount} trees with a buffer around` },
  'arable-soils': { label: (amount) => `${amount} hectares of green cover` },
  woodland: { label: (amount) => `${amount} square metres of newly planted woodland` },
  waterbody: { label: (amount) => `${amount} square metres of in-field grass strips or blocks` }
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
        html: getInsetText(70000.123456, 6000.9999, 8000.3292, 78000.11111)
      },
      summaryTitle: 'Funding breakdown',
      summaryList: Object.values(summaryCategories).map(details => ({
        label: details.label,
        htmlBlurb: details.htmlBlurb,
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
