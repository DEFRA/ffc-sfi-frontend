const { getCalculationResult, getSelectedStandards } = require('./session-handler')

const pageDetails = {
  path: '/selected-summary',
  nextPath: '/',
  template: 'selected-summary'
}

const textMapping = {
  arable: 'Arable land',
  grassland: 'Grassland',
  hedgerow: 'Hedgerows'
}

function getContentDetails (calculation, selectedStandards) {
  let totalPayment = 0
  let optionHtml = ''

  selectedStandards.forEach(s => {
    totalPayment += calculation[s].payment
    optionHtml += textMapping[s] + '<br> '
  })

  return {
    title: 'Summary',
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
              html: `${calculation.arable.userInput} ha - Arable land<br>${calculation.grassland.userInput} ha - Grassland<br>${calculation.hedgerow.userInput} m - Hedgrows`
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
              html: optionHtml.substring(0, optionHtml.length - 5)
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
      const calculation = getCalculationResult(request.yar)
      const selectedStandards = [getSelectedStandards(request.yar)].flat()

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
