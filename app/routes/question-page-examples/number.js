module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-number',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => ({ 'my-number': 7 }),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-radios',
      pageDefinition: {
        components: [{
          type: 'NumberField',
          name: 'my-number',
          title: 'Number Field',
          titleForError: 'My error title',
          hint: 'My hint',
          schema: {
            integer: true,
            greater: -6,
            less: 11
          }
        }]
      }
    }
  }
}
