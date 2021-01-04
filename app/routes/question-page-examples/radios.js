module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-radios',
  handler: {
    'hapi-govuk-question-page': {
      getConfig: async request => ({ 'my-choice': { filter: [1, 2, 4] } }),
      getData: async request => ({}),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-select',
      pageDefinition: {
        components: [{
          type: 'RadiosField',
          name: 'my-choice',
          title: 'Radios Field',
          titleForError: 'My error title',
          hint: 'My hint',
          options: {
            filterable: true,
            bold: true,
            list: {
              type: 'number',
              items: [
                { value: 1, text: ' Choice 1', description: 'First choice' },
                { value: 2, text: ' Choice 2', conditionalHtml: '<span>You have <strong>selected me</strong></span>' },
                { value: 3, text: ' Choice 3' },
                { value: 4, text: ' Choice 4', description: 'Fourth choice' }
              ]
            }
          }
        }]
      }
    }
  }
}
