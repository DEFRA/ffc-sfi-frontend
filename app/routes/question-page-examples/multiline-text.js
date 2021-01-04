module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-multiline-text',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => ({}),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-names',
      pageDefinition: {
        components: [{
          type: 'MultilineTextField',
          name: 'my-text',
          title: 'Multiline Text Field',
          titleForError: 'My error title',
          hint: 'My hint',
          options: {
            rows: 10
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
