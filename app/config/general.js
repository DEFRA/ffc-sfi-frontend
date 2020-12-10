const agreementServiceHost = process.env.AGREEMENT_SERVICE_HOST
const agreementServicePort = process.env.AGREEMENT_SERVICE_PORT

const agreementServiceBaseUrl = `http://${agreementServiceHost}:${agreementServicePort}`

module.exports = {
  agreementServiceBaseUrl
}
