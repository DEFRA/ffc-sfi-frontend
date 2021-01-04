module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-email-address',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => ({}),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-multiline-text',
      pageDefinition: {
        components: [{
          type: 'EmailAddressField',
          name: 'my-email-address',
          title: 'Email Address Field',
          titleForError: 'My error title',
          hint: 'My hint',
          options: {
            autocomplete: false
          }
        }]
      }
    }
  }
}
