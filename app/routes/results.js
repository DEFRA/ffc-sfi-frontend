const Joi = require('@hapi/joi')

module.exports = {
  method: 'POST',
  path: '/results',
  handler: (request, h) => {
    return h.view('results')
  },
  options: {
    validate: {
      payload: Joi.object({
        sbi: Joi.string().required()
      }),
      failAction: (request, h) => h.view('sbi').takeover()
    }
  }
}
