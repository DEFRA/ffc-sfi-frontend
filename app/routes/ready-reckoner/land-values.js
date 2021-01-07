const allStandards = require('../../services/standards')
const toShow = ['arable', 'grassland', 'hedgerow']

module.exports = [
  {
    method: 'GET',
    path: '/land-values',
    handler: (request, h) => {
      const standards = {}
      toShow.forEach(std => (standards[std] = allStandards[std]))

      standards.arable.ui.hint = ''
      standards.arable.ui.text = 'Arable land'
      standards.grassland.ui.hint = ''
      standards.grassland.ui.text = 'Grassland'
      standards.hedgerow.ui.hint = ''
      standards.hedgerow.ui.text = 'Hedgerows'

      return h.view('land-values', { standards })
    }
  },
  {
    method: 'POST',
    path: '/land-values',
    handler: (request, h) => {
      return h.redirect('/')
    }
  }
]
