// const allStandards = require('../../services/standards')
// const toShow = ['arable', 'grassland', 'hedgerow']
const routePath = '/selected-summary'
const pageTitle = 'Summary'

module.exports = [
  {
    method: 'GET',
    path: routePath,
    handler: (request, h) => {
      return h.view('selected-summary', { pageTitle })
    }
  },
  {
    method: 'POST',
    path: routePath,
    handler: (request, h) => {
      // const body = { ...request.payload }
      // const { errorList, standards } = await runValidation(body)

      // if (errorList.length > 0) {
      //   return h.view('enter-value', { errorList, standards })
      // } else {
      //   const partialMsg = addRules(body)
      //   const correlationId = uuid()
      //   const msgToSend = { correlationId, body: partialMsg }
      //   await updateAgreement(msgToSend)

      //   // return a page that will auto redirect to the page with the id generated
      //   return h.view('message-sent', { correlationId })
      // }

      return h.redirect('/')
    }
  }
]
