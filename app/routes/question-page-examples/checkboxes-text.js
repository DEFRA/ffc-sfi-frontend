module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-checkboxes-text',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => ({}),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-date-parts',
      pageDefinition: {
        components: [{
          type: 'CheckboxesWithTextField',
          name: 'my-choices',
          title: 'Checkboxes With Text Field',
          titleForError: 'My error title',
          hint: 'My hint',
          options: {
            filterable: true,
            list: {
              type: 'string',
              items: [
                { value: 'first', text: ' Choice 1', description: 'First choice' },
                { value: 'second', text: ' Choice 2' },
                {
                  value: 'third',
                  text: ' Choice 3',
                  conditionalTextField: {
                    name: 'third-value',
                    title: 'Enter something'
                  }
                }
              ]
            }
          }
        }]
      }
    }
  }
}
