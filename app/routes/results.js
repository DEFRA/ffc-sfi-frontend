module.exports = {
  method: 'POST',
  path: '/results',
  handler: (request, h) => {
    return h.view('results')
  }
}
