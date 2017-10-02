module.exports = app => {
  class Cookie extends app.Service {
    set (key, value, config = {}) {
      // cookie is valid for one month
      const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      this.ctx.cookies.set(key, value, Object.assign({
        expires,
        overwrite: true,
        secure: false,
        encrypt: true
      }, config))
    }
    get (key) {
      return this.ctx.cookies.get(key, {
        overwrite: true,
        encrypt: true
      })
    }
    setUser (user) {
      this.set('mockerUser', JSON.stringify(user))
    }
    getUser () {
      try {
        return JSON.parse(this.get('mockerUser'))
      } catch (e) {
        return null
      }
    }
    clearUser (user) {
      this.set('mockerUser', '', {
        expires: Date.now()
      })
    }
  }
  return Cookie
}
