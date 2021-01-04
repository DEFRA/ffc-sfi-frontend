module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-names',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => ({}),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-number',
      pageDefinition: {
        components: [{
          type: 'NamesField',
          name: 'my-text',
          title: 'Names Field',
          titleForError: 'My error title',
          hint: 'My hint',
          options: {
            autocomplete: true
          },
          schema: {
            max: 100,
            trim: true
          }
        }]
      }
    }
  }
}
