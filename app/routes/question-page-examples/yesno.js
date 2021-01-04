module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-yesno',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => ({ 'my-yes-no': null }),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-html-components',
      pageDefinition: {
        components: [{
          type: 'YesNoField',
          name: 'my-yes-no',
          title: 'Yes No Field',
          titleForError: 'My error title',
          hint: 'My hint',
          options: {
            yesFirst: true
          }
        }]
      }
    }
  }
}
