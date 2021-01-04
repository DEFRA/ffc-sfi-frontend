module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-select',
  handler: {
    'hapi-govuk-question-page': {
      getConfig: async request => ({ 'my-choice': { filter: [1, 2, 4] } }),
      getData: async request => ({}),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-telephone-number',
      pageDefinition: {
        components: [{
          type: 'SelectField',
          name: 'my-choice',
          title: 'Select Field',
          titleForError: 'My error title',
          hint: 'My hint',
          options: {
            filterable: true,
            list: {
              type: 'number',
              items: [
                { value: 1, text: ' Choice 1' },
                { value: 2, text: ' Choice 2' },
                { value: 3, text: ' Choice 3' },
                { value: 4, text: ' Choice 4' }
              ]
            }
          }
        }]
      }
    }
  }
}
