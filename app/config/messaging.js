const sharedConfig = {
  host: process.env.SERVICE_BUS_HOST,
  password: process.env.SERVICE_BUS_PASSWORD,
  username: process.env.SERVICE_BUS_USER,
  type: 'queue',
  usePodIdentity: process.env.NODE_ENV === 'production'
}

const msgTypePrefix = 'uk.gov.ffc.sfi'

module.exports = {
  updateEligibilityQueue: {
    address: process.env.UPDATE_ELIGIBILITY_QUEUE_ADDRESS,
    ...sharedConfig
  },
  updateAgreementQueue: {
    address: process.env.UPDATE_AGREEMENT_QUEUE_ADDRESS,
    ...sharedConfig
  },
  updateAgreementMsgType: `${msgTypePrefix}.agreement.update`,
  updateEligibilityMsgType: `${msgTypePrefix}.eligibility.update`,
  msgSrc: 'ffc-sfi-frontend'
}
