const inert = require('@hapi/inert')
const yar = require('@hapi/yar')
const Hapi = require('@hapi/hapi')
const nunjucks = require('nunjucks')
const vision = require('@hapi/vision')
const catboxMemory = require('@hapi/catbox-memory')

const resultsRoute = require('./routes/results')

const routes = [
  require('./routes/assets'),
  require('./routes/healthy'),
  require('./routes/healthz'),
  require('./routes/home'),
  require('./routes/sbi'),
  require('./routes/ready-reckoner/loading'),
  ...require('./routes/ready-reckoner/land-values'),
  ...require('./routes/ready-reckoner/select-standard'),
  ...require('./routes/ready-reckoner/selected-summary'),
  ...require('./routes/ready-reckoner/bps-payment'),
  ...require('./routes/ready-reckoner-v2/land-calc'),
  ...require('./routes/ready-reckoner-v2/select-std'),
  ...require('./routes/ready-reckoner-v2/extra-actions'),
  ...require('./routes/ready-reckoner-v2/sfi-summary')
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

  await server.register(
    {
      plugin: yar,
      options: {
        storeBlank: true,
        cookieOptions: {
          password: 'this is just a test, this is just a test',
          isSecure: false
        }
      }
    }
  )

  await server.register(inert)
  await server.register(vision)

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
      'app/views'
    ]
  })

  return server
}

module.exports = createServer
