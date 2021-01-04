module.exports = {
  method: ['GET', 'POST'],
  path: '/question-page-example-html-components',
  handler: {
    'hapi-govuk-question-page': {
      getConfig: async request => ({ 'my-dynamic-html': { parameterValues: ['Hello', new Date()] } }),
      nextPath: '/question-page-example-many-components',
      pageDefinition: {
        title: 'Html components',
        components: [
          {
            type: 'Details',
            title: 'Some <strong>details</strong>',
            content: 'Here is <em>some</em> content'
          },
          {
            type: 'DynamicHtml',
            name: 'my-dynamic-html',
            templateHtml: '<p>$PARAM$, example of <strong>dynamic Html</strong> and the date is $PARAM$</p>'
          },
          {
            type: 'Html',
            content: '<p>This is some <strong>Html</strong></p>'
          },
          {
            type: 'InsetText',
            content: 'Some inset text'
          },
          {
            type: 'Para',
            content: 'An example of a paragraph of text'
          },
          {
            type: 'WarningText',
            text: 'Some warning text'
          }
        ]
      }
    }
  }
}
