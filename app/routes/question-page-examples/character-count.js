module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-character-count',
  handler: {
    'hapi-govuk-question-page': {
      getData: async request => ({ 'my-field': 'Example' }),
      setData: async (request, data) => {
        console.log(data)
      },
      nextPath: '/question-page-example-checkboxes',
      pageDefinition: {
        components: [{
          type: 'CharacterCountField',
          name: 'my-field',
          title: 'Character Count Field',
          titleForError: 'My error title',
          hint: 'Max 10 words, words left count once 50% of words added',
          options: { threshold: 50 },
          schema: { maxwords: 10 }
        }]
      }
    }
  }
}
