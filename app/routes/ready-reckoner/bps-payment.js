const pageDetails = {
  path: '/bps-payment',
  nextPath: '/land-calc',
  backPath: '/',
  template: 'bps-payment'
}

const insetTextHtml = `
<ul class="govuk-list">
  <li>To check your BPS payments, <a href="https://www.gov.uk/claim-rural-payments/sign-in/prove-identity" target="_blank">sign into your Defra account (opens in a new tab)</a></li>
  <li>If you can’t log in, contact the Rural Payments team:</li>
  <li>Email: <a href="mailto:ruralpayments@defra.gov.uk">ruralpayments@defra.gov.uk</a></li>
  <li>Telephone on 03000 200 301</li>
</ul>
`

function pageContent (errorText = null, defaultValue = null) {
  return {
    backPath: pageDetails.backPath,
    components: {
      input: {
        id: 'test',
        name: 'test',
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
      return h.view(pageDetails.template, pageContent())
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: async (request, h) => {
      const payload = { ...request.payload }
      const bpsPayment = Number(payload.test)

      if (bpsPayment < 0 || isNaN(bpsPayment)) {
        return h.view(pageDetails.template, pageContent('Give me postive number yar', payload.test))
      }

      return h.redirect(pageDetails.nextPath)
    }
  }
]
