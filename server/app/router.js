const { displayRoutesTable } = require('./util')
const configureAllRoutes = require('./router/index')
// const configureKnex = require('./knex')

module.exports = app => {
  // const apiStat = app.middlewares.apiStat()
  // const credentials = app.middlewares.credentials()
  // console.log(Object.keys(app))
  // console.log(app.router)

  configureAllRoutes(app)
  // configureKnex(app)
  displayRoutesTable(app.router)
}
