const Joi = require('joi')
const session = require('./session-handler')

const pageDetails = {
  path: '/bps-payment',
  nextPath: '/land-calc',
  backPath: '/',
  template: 'bps-payment'
}

const validationMsg = 'Enter a value greater than or equal to 0, or leave blank'

const insetTextHtml = `
<ul class="govuk-list">
  <li>To check your BPS payments, <a href="https://www.gov.uk/claim-rural-payments/sign-in/prove-identity" target="_blank">sign into your Defra account (opens in a new tab)</a></li>
  <li>If you can’t log in, contact the Rural Payments team:</li>
  <li>Email: <a href="mailto:ruralpayments@defra.gov.uk">ruralpayments@defra.gov.uk</a></li>
  <li>Telephone on 03000 200 301</li>
</ul>
`

function pageContent (defaultValue, errorText = null) {
  return {
    backPath: pageDetails.backPath,
    components: {
      input: {
        name: 'bps-payment',
        prefix: { text: '£' },
        label: {
          text: 'How much Basic Payment Scheme (BPS) funding did you qualify for in 2020?',
          classes: 'govuk-label--l',
          isPageHeading: true
        },
        hint: { html: 'This includes any late payments you received after 31 December 2020.<br/>You can leave this blank if you’re not sure.' },
        classes: 'govuk-input--width-5',
        value: defaultValue,
        errorMessage: errorText ? { text: errorText } : null,
        spellcheck: false
      },
      insetText: {
        html: insetTextHtml
      },
      details: {
        summaryText: 'Why are we asking this?',
        text: 'This will help us calculate how your funding will change when you apply for SFI funding.'
      }
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: pageDetails.path,
    handler: (request, h) => {
      return h.view(pageDetails.template, pageContent(session.getValue(request, session.keys.bpsPayment)))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      session.setValue(request, session.keys.bpsPayment, request.payload['bps-payment'])
      console.log(session.getValue(request, session.keys.bpsPayment))
      return h.redirect(pageDetails.nextPath)
    },
    options: {
      validate: {
        payload: Joi.object({
          // Check for either a positive number (allowing 0), or if left blank (empty string), set to 0
          'bps-payment': [Joi.number().positive().allow(0), Joi.string().max(0).allow('').default(0)]
        }),
        failAction: async (request, h, error) => {
          return h.view(pageDetails.template, pageContent(request.payload['bps-payment'], validationMsg)).takeover()
        }
      }
    }
  }
]
