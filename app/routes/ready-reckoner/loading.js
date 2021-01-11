module.exports = {
  method: 'GET',
  path: '/loading',
  handler: (request, h) => {
    return h.view('loading')
  }
}
