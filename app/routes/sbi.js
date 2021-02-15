module.exports = {
  method: 'GET',
  path: '/sbi',
  handler: (_, h) => {
    return h.view('sbi')
  }
}
