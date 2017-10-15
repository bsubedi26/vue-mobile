const user = require('./user')

module.exports = app => {
  console.log('works')
  user(app)
}
