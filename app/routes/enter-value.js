module.exports = {
  method: 'GET',
  path: '/enter-value',
  handler: (request, h) => {
    return h.view('enter-value')
  }
}