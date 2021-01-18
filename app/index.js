const createServer = require('./server')
const { log } = require('./services/logger')

const init = async () => {
  const server = await createServer()

  await server.start()
  log(`Server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  log(err)
  process.exit(1)
})

init()
