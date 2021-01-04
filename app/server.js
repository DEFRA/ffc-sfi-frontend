const inert = require('@hapi/inert')
const Hapi = require('@hapi/hapi')
const nunjucks = require('nunjucks')
const vision = require('@hapi/vision')
const catboxMemory = require('@hapi/catbox-memory')

const resultsRoute = require('./routes/results')

const routes = [
  require('./routes/question-page-examples/character-count'),
  require('./routes/question-page-examples/checkboxes'),
  require('./routes/question-page-examples/checkboxes-text'),
  require('./routes/question-page-examples/date-parts'),
  require('./routes/question-page-examples/email-address'),
  require('./routes/question-page-examples/multiline-text'),
  require('./routes/question-page-examples/names'),
  require('./routes/question-page-examples/number'),
  require('./routes/question-page-examples/radios'),
  require('./routes/question-page-examples/select'),
  require('./routes/question-page-examples/telephone-number'),
  require('./routes/question-page-examples/text'),
  require('./routes/question-page-examples/html-components'),
  require('./routes/question-page-examples/yesno'),
  require('./routes/question-page-examples/many-components'),
  require('./routes/assets'),
  require('./routes/enter-value'),
  require('./routes/healthy'),
  require('./routes/healthz'),
  require('./routes/home'),
  require('./routes/retrieve-value'),
  require('./routes/send-message'),
  require('./routes/sbi')
]

async function createServer () {
  const server = Hapi.server({
    cache: {
      name: 'in-memory',
      provider: {
        constructor: catboxMemory
      }
    },
    port: process.env.PORT
  })

  await server.register(inert)
  await server.register(vision)
  await server.register({
    plugin: require('@envage/hapi-govuk-question-page'),
    options: {
      pageTemplateName: 'layouts/layout.njk'
    }
  })

  server.route(routes)
  resultsRoute(server)

  server.views({
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)
          return context => template.render(context)
        },
        prepare: (options, next) => {
          options.compileOptions.environment = nunjucks.configure([
            'node_modules/govuk-frontend',
            ...options.path
          ])
          return next()
        }
      }
    },
    path: [
      'app/views',
      'node_modules/@envage/hapi-govuk-question-page'
    ]
  })

  return server
}

module.exports = createServer
