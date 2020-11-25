const connectionDetails = {
  host: process.env.MESSAGE_QUEUE_HOST,
  password: process.env.MESSAGE_QUEUE_PASSWORD,
  username: process.env.MESSAGE_QUEUE_USER
}

module.exports = {
  updateEligibilityQueue: {
    address: process.env.UPDATE_ELIGIBILITY_QUEUE_ADDRESS,
    type: 'queue',
    usePodIdentity: process.env.NODE_ENV === 'production',
    ...connectionDetails
  },
  updateAgreementQueue: {
    address: process.env.UPDATE_AGREEMENT_QUEUE_ADDRESS,
    type: 'queue',
    usePodIdentity: process.env.NODE_ENV === 'production',
    ...connectionDetails
  },
  messageTypePrefix: 'uk.gov.ffc.sfi',
  messageSource: 'ffc-sfi-frontend'
}
