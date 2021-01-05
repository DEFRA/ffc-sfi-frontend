const Joi = require('@hapi/joi')

module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-telephone-number',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => ({}),
      setData: async (request, data) => {
        console.log(data)

        const validation = Joi.object({
          'my-telephone': Joi.string().pattern(/^\d+$/).required().messages({
            'string.pattern.base': 'Must be only digits'
          })
        }).validate(data)

        const mapErrorsForDisplay = (joiError) => {
          return {
            titleText: 'Fix the following errors',
            errorList: joiError.details.map(err => {
              const name = err.path[0]

              return {
                href: `#${name}`,
                name: name,
                text: err.message
              }
            })
          }
        }

        return { errors: validation.error ? mapErrorsForDisplay(validation.error) : null }
      },
      nextPath: '/question-page-example-text',
      pageDefinition: {
        components: [{
          type: 'TelephoneNumberField',
          name: 'my-telephone',
          title: 'Telephone Number Field',
          titleForError: 'My error title',
          hint: 'My hint',
          options: {
            autocomplete: false
          },
          schema: {
            max: 10,
            trim: true
          }
        }]
      }
    }
  }
}
