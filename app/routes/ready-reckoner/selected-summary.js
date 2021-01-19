const session = require('./session-handler')
const content = require('./standards-content')

const pageDetails = {
  path: '/selected-summary',
  nextPath: '/',
  backPath: '/select-standard',
  template: 'selected-summary'
}

function getContentDetails (calculation, selectedStandards) {
  let totalPayment = 0
  let optionHtml = ''

  selectedStandards.forEach(s => {
    totalPayment += calculation[s].payment
    optionHtml += content[s].label + '<br>'
  })

  const landHtml = Object.entries(calculation).reduce((acc, [k, v]) => {
    if (Object.prototype.hasOwnProperty.call(content, k)) {
      acc += `${v.userInput} ${v.units.symbol} - ${content[k].label}<br>`
    }
    return acc
  }, '')

  return {
    title: 'Summary',
    backPath: pageDetails.backPath,
    components: {
      insetText: {
        text: `Based on your information and options, you would receive at least £${totalPayment.toFixed(2)} a year, paid in 12 monthly installments of £${(totalPayment / 12.0).toFixed(2)}.`
      },
      summaryList: {
        rows: [
          {
            key: {
              text: 'Land and boundaries'
            },
            value: {
              html: landHtml
            },
            actions: {
              items: [
                {
                  href: '/land-values',
                  text: 'Change',
                  visuallyHiddenText: 'land and boundaries'
                }
              ]
            }
          },
          {
            key: {
              text: 'Options'
            },
            value: {
              html: optionHtml
            },
            actions: {
              items: [
                {
                  href: '/select-standard',
                  text: 'Change',
                  visuallyHiddenText: 'options'
                }
              ]
            }
          }
        ]
      },
      radios: {
        classes: 'govuk-radios--inline',
        idPrefix: 'changed-name',
        name: 'changed-name',
        fieldset: {
          legend: {
            text: 'Are you ready to start your application?',
            classes: 'govuk-fieldset__legend--m'
          }
        },
        items: [
          {
            value: 'yes',
            text: 'Yes'
          },
          {
            value: 'no',
            text: 'No'
          }
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
      const calculation = session.getCalculationResult(request)
      const selectedStandards = [session.getSelectedStandards(request)].flat()

      return h.view(pageDetails.template, getContentDetails(calculation, selectedStandards))
    }
  },
  {
    method: 'POST',
    path: pageDetails.path,
    handler: (request, h) => {
      return h.redirect('/')
    }
  }
]
