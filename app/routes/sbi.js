module.exports = {
  method: 'GET',
  path: '/sbi',
  handler: (request, h) => {
    return h.view('sbi')
  }
}
