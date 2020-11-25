const createServer = require('./server')

const init = async () => {
  const server = await createServer()

  await server.start()
  console.log(`Server running on ${server.info.uri}`)

  const senders = require('./messaging/queue-senders')
  senders.updateAgreement({ test: 'new test from frontend' })
  senders.updateEligibility({ test: 'new test from frontend' })
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
