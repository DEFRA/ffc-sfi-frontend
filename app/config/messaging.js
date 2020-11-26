const sharedConfig = {
  host: process.env.SERVICE_BUS_HOST,
  password: process.env.SERVICE_BUS_PASSWORD,
  username: process.env.SERVICE_BUS_USER,
  type: 'queue',
  usePodIdentity: process.env.NODE_ENV === 'production'
}

const messageTypePrefix = 'uk.gov.ffc.sfi'

module.exports = {
  updateEligibilityQueue: {
    address: process.env.UPDATE_ELIGIBILITY_QUEUE_ADDRESS,
    ...sharedConfig
  },
  updateAgreementQueue: {
    address: process.env.UPDATE_AGREEMENT_QUEUE_ADDRESS,
    ...sharedConfig
  },
  updateAgreementMessageType: `${messageTypePrefix}.agreement.update`,
  updateEligibilityMessageType: `${messageTypePrefix}.eligibility.update`,
  messageSource: 'ffc-sfi-frontend'
}
