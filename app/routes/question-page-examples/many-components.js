module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-many-components',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => (
        {
          'my-text': 'Sample Name',
          'my-email-address': 'test@test.com'
        }
      ),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/',
      pageDefinition: {
        title: 'Many Components',
        components: [
          {
            type: 'Details',
            title: 'Some <strong>details</strong>',
            content: 'Here is <em>some</em> content'
          },
          {
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
          },
          {
            type: 'EmailAddressField',
            name: 'my-email-address',
            title: 'Email Address Field',
            titleForError: 'My error title',
            hint: 'My hint',
            options: {
              autocomplete: false
            }
          }
        ]
      }
    }
  }
}
