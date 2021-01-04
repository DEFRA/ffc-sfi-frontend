module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-checkboxes',
  handler: {
    'hapi-govuk-question-page': {
      getConfig: async request => ({ 'my-choices': { filter: ['first', 'third'] } }),
      getData: async request => ({}),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-checkboxes-text',
      pageDefinition: {
        components: [{
          type: 'CheckboxesField',
          name: 'my-choices',
          title: 'Checkboxes Field',
          titleForError: 'My error title',
          hint: 'My hint',
          options: {
            filterable: true,
            list: {
              type: 'string',
              items: [
                { value: 'first', text: ' Choice 1', description: 'First choice' },
                { value: 'second', text: ' Choice 2' },
                { value: 'third', text: ' Choice 3', conditionalHtml: '<span>You have <strong>selected me</strong></span>' }
              ]
            }
          }
        }]
      }
    }
  }
}
