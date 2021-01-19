const standards = require('../../services/standards')

const pageDetails = {
  path: '/enable-standards',
  nextPath: '/',
  backPath: '/',
  template: 'enable-standards'
}

function getPageDetails () {
  return {
    title: 'Select standards to enable',
    backPath: pageDetails.backPath,
    components: {
      standards: {
        idPrefix: 'standards',
        name: 'standards',
        items: standards.allStandards.map(s => ({
          value: s.id,
          text: s.id.charAt(0).toUpperCase() + s.id.slice(1),
          checked: standards.enabledState[s.id]
        }))
      }
    }
  }
}

module.exports = [{
  method: 'GET',
  path: pageDetails.path,
  handler: (request, h) => {
    return h.view(pageDetails.template, getPageDetails())
  }
},
{
  method: 'POST',
  path: pageDetails.path,
  handler: (request, h) => {
    Object.keys(standards.enabledState).forEach(k => (standards.enabledState[k] = request.payload.standards.includes(k)))
    console.log(standards.enabledState)
    return h.redirect(pageDetails.nextPath)
  }
}]
