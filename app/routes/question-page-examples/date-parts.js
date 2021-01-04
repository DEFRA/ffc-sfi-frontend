module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-date-parts',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => ({ 'my-date': new Date() }),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-email-address',
      pageDefinition: {
        components: [{
          type: 'DatePartsField',
          name: 'my-date',
          title: 'Date Parts Field',
          titleForError: 'My error title',
          hint: 'My hint'
        }]
      }
    }
  }
}
