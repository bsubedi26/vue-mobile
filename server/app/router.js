const pathToRegexp = require('path-to-regexp')

module.exports = app => {
  const apiStat = app.middlewares.apiStat()
  const credentials = app.middlewares.credentials()
  const mockUrl = pathToRegexp('/client/:id/:url*', [])

  // user
  app.get('/test', 'user.test')
  app.get('/auth/user/cookie', 'user.cookie')
  app.get('/auth/user', 'user.get')
  app.post('/auth/user/register', 'user.create')
  app.post('/auth/user/login', 'user.login')
  app.get('/auth/user/logout', 'user.logout')
  app.post('/auth/user/recovery/password/ticket', 'user.sentResetPassTicket')
  app.post('/auth/user/recovery/password/code', 'user.sentResetPassCode')
  app.put('/auth/user/recovery/password', 'user.resetPasswordByTicket')
  app.put('/server/user/password', 'user.updatePassword')
  app.put('/server/user', 'user.update')
  app.get('/server/user/search', 'user.search')

  // const mockUrl = '/client/:id'
  app.post('/client/real', 'client.real')
  app.get(mockUrl, credentials, apiStat, 'client.show')
  app.post(mockUrl, credentials, apiStat, 'client.create')
  app.put(mockUrl, credentials, apiStat, 'client.put')
  app.patch(mockUrl, credentials, apiStat, 'client.patch')
  app.delete(mockUrl, credentials, apiStat, 'client.delete')
}
