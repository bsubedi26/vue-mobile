const chalk = require('chalk')

exports.displayRoutesTable = function (router) {
  return router.stack.map(route => {
    let method = (route.methods.indexOf('GET') > 0) ? 'GET' : route.methods
    method = method.toString()
    switch (method) {
      case 'GET': {
        console.log(chalk.blue(`${method}`), chalk.green(`  ${route.path}`))
        break
      }
      case 'POST': {
        console.log(chalk.yellow(`${method}`), chalk.green(`  ${route.path}`))
        break
      }
      case 'PUT': {
        console.log(chalk.red(`${method}`), chalk.green(`  ${route.path}`))
        break
      }
      default: {
        console.log(chalk.black(`${method}`), chalk.green(`  ${route.path}`))
        break
      }
    }
  })
}
