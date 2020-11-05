const path = require('path')

const inert = require('@hapi/inert')
const Hapi = require('@hapi/hapi')
const nunjucks = require('nunjucks')
const vision = require('@hapi/vision')
const catboxMemory = require('@hapi/catbox-memory')

const routes = [
  require('./routes/assets'),
  require('./routes/healthy'),
  require('./routes/healthz'),
  require('./routes/home'),
  require('./routes/results'),
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

  server.route(routes)

  server.views({
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)
          return context => template.render(context)
        }
      }
    },
    relativeTo: __dirname,
    compileOptions: {
      environment: nunjucks.configure([
        path.join(__dirname, 'views'),
        path.join(__dirname, 'assets', 'dist'),
        'node_modules/govuk-frontend/'
      ])
    },
    path: './views/'
  })

  return server
}

module.exports = createServer
