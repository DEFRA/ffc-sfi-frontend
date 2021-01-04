module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-text',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => ({}),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-yesno',
      pageDefinition: {
        components: [{
          type: 'TextField',
          name: 'my-text',
          title: 'Text Field',
          titleForError: 'My error title',
          hint: 'My hint',
          schema: {
            max: 20,
            trim: true
          }
        }]
      }
    }
  }
}
