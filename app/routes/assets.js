module.exports = {
  method: 'GET',
  path: '/assets/{path*}',
  options: {
    handler: {
      directory: {
        path: ['app/frontend/dist']
      }
    },
    cache: {
      privacy: 'private'
    }
  }
}
