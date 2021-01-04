module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-telephone-number',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => ({}),
      setData: async (request, data) => {
        console.log(data)
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
