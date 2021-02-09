const Joi = require('@hapi/joi')

const { log, logError } = require('../services/logger')
const getSBIData = require('../services/get-sbi')

function results (server) {
  server.route({
    method: 'POST',
    path: '/results',
    handler: async (request, h) => {
      const { sbi } = request.payload
      log(`Handling '/results' for SBI ${sbi}`)
      const landcover = await server.methods.getSBIData(sbi)
      return h.view('results', { sbi, landcover })
    },
    options: {
      validate: {
        payload: Joi.object({
          sbi: Joi.string().pattern(/^[0-9]{9}/).required()
        }),
        failAction: (request, h, error) => {
          logError(error)
          return h.view('sbi', { errors: [{ text: 'Please enter an SBI', href: '#sbi' }] }).takeover()
        }
      }
    }
  })

  server.method('getSBIData', getSBIData, {
    cache: {
      cache: 'in-memory',
      expiresIn: 24 * 3600 * 1000,
      generateTimeout: 20 * 1000
    }
  })
}

module.exports = results
