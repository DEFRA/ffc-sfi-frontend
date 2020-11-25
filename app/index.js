const createServer = require('./server')

const init = async () => {
  const server = await createServer()

  await server.start()
  console.log(`Server running on ${server.info.uri}`)

  require('./messaging/update-agreement').publish({ test: 'agreement test' })
  require('./messaging/update-eligibility').publish({ test: 'eligibility test' })
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
