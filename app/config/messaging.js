const sharedConfig = {
  host: process.env.MESSAGE_QUEUE_HOST,
  password: process.env.MESSAGE_QUEUE_PASSWORD,
  username: process.env.MESSAGE_QUEUE_USER,
  type: 'queue',
  usePodIdentity: process.env.NODE_ENV === 'production'
}

module.exports = {
  updateEligibilityQueue: {
    address: process.env.UPDATE_ELIGIBILITY_QUEUE_ADDRESS,
    ...sharedConfig
  },
  updateAgreementQueue: {
    address: process.env.UPDATE_AGREEMENT_QUEUE_ADDRESS,
    ...sharedConfig
  },
  messageTypePrefix: 'uk.gov.ffc.sfi',
  messageSource: 'ffc-sfi-frontend'
}
