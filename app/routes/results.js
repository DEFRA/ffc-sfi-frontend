const Joi = require('@hapi/joi')

function results (server) {
  server.route({
    method: 'POST',
    path: '/results',
    handler: async (request, h) => {
      const { sbi } = request.payload
      const landcover = await server.methods.getSBIData(sbi)
      return h.view('results', { sbi, landcover })
    },
    options: {
      validate: {
        payload: Joi.object({
          sbi: Joi.string().pattern(/^[0-9]{9}/).required()
        }),
        failAction: (request, h) => h.view('sbi', { errors: [{ text: 'Please enter an SBI', href: '#sbi' }] }).takeover()
      }
    }
  })
}

module.exports = results
