const pageDetails = {
  path: '/bps-payment',
  nextPath: '/',
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

function pageContent () {
  return {
    backPath: pageDetails.backPath,
    components: {
      // input: {

      // },
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
  }
]
