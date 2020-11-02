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
        sbi: Joi.string().pattern(/^[0-9]{9}/).required()
      }),
      failAction: (request, h) => h.view('sbi', { errors: [{ text: 'Please enter an SBI', href: '#sbi' }] }).takeover()
    }
  }
}
