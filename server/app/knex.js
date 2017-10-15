const assert = require('assert')
const knex = require('knex')
const helpers = require('knex/lib/helpers')
const co = require('co')

const isSqlite = client => client === 'sqlite'

const SUPPORTS = [ 'sqlite', 'mysql', 'mysql2', 'oracle', 'mssql', 'maria', 'mariasql', 'mariadb', 'pg', 'postgresql' ]

const isSupport = dialect => SUPPORTS.indexOf(dialect) !== -1

const clientDesc = config => [
  config.filename,
  config.host,
  config.port,
  config.database,
  config.user ].filter(c => !!c).join('#')
module.exports = app => {
  init(app)
}

let count = 0
function init (app) {
  app.knexLogger = app.getLogger('knex')
  enhanceKnexHelpers(app, helpers)

  app.addSingleton('knex', (config, app) => {
    config.client = config.client || config.dialect || 'mysql'

    const connection = config.connection
    assert(isSupport(config.client),
      `[egg-knex] ${config.client} is not in (${SUPPORTS})`)
    if (!isSqlite(config.client)) {
      assert(connection.host && connection.user && connection.database,
        `[egg-knex] ${config.client} 'host: ${connection.host}', 'user: ${connection.user}', 'database: ${connection.database}' are required on config`)

      app.knexLogger.info('[egg-knex] %s connecting %s@%s:%s/%s', config.client, connection.user, connection.host, connection.port || 3306, connection.database)
    } else {
      assert(connection.filename, `[egg-knex] sqlite 'filename: ${connection.filename}' are required on config`)

      app.knexLogger.info('[egg-knex] %s connection %s', connection.filename)
    }

    if (app.config.env === 'local') {
      config.debug = config.debug || true
    }

    const index = count++
    const done = app.readyCallback(`createKnex-${index}`)

    const client = createInstance(app, config, (...args) => {
      done(...args)
      app.knexLogger.info(`[egg-knex] instance[${index}] status OK`)
    })

    return client
  })

  if (app.config.knex.clients) {
    app.knex.end = function (...args) {
      let key = args[0]
      let callback = args[1]
      if (args.length === 1 && typeof args[0] === 'function') {
        callback = args[0]
      } else if (args.length === 2) {
        key = args[0]
        callback = args[1]
      }
      const client = app.knex.get(key)
      if (!client) {
        callback = callback || function () { }
        return callback()
      }
      return client.destroy(callback)
    }
  } else {
    app.knex.end = app.knex.destroy
  }
}

function createInstance (app, config, callback) {
  const client = createKnexClient(config)
  client.dialect = config.client

  if (app.instrument) {
    injectInstrument(app, client)
  }

  if (config.debug) {
    explainAfterQuery(app, client)
  }

  co(function* isReady () {
    const [ rows ] = yield client.raw('show tables')
    if (rows && rows.length) {
      return rows.length
    }
  }).then(num => {
    app.knexLogger.info(`[egg-knex] ${config.client} ${clientDesc(config.connection)} status OK, got ${num} tables`)
    callback(undefined, client)
  }).catch(e => {
    app.knexLogger.error(e)
    callback(e)
  })

  return client
}

function createKnexClient (config) {
  const client = knex(config)
  promisifyTransaction(client)
  return client
}

function injectInstrument (app, knex) {
  const client = knex.client
  [ 'query', 'stream' ].forEach(method => {
    client[`_raw_${method}`] = client[method]
    client[method] = function (connection, obj) {
      if (typeof obj === 'string') {
        obj = { sql: obj }
      }
      obj.bindings = this.prepBindings(obj.bindings)
      const ins = app.instrument(client.dialect, this._formatQuery(obj.sql, obj.bindings))
      return this[`_raw_${method}`]
        .apply(this, [ connection, obj ])
        .then(result => {
          ins.end()
          return result
        })
    }
  })
}

function promisifyTransaction (client) {
  client._raw_transaction = client.transaction

  client.transaction = function (...args) {
    if (typeof args[0] === 'function') {
      if (isGenerator(args[0])) args[0] = co.wrap(args[0])
      return client._raw_transaction.apply(client, args)
    }
    let config
    let outTx
    if (args.length > 0) outTx = args.pop()
    if (args.length > 0) config = args.pop()

    return new Promise(resolve => {
      client._raw_transaction.apply(client, [
        function _container (trx) {
          trx.rollback = function (conn, error) {
            return this.query(conn, 'ROLLBACK', error ? 2 : 1, error)
              .timeout(5000)
              .catch(Promise.TimeoutError, () => {
                this._resolver()
              })
          }
          trx.rollbackTo = function (conn, error) {
            return this.query(conn, `ROLLBACK TO SAVEPOINT ${this.txid}`, error ? 2 : 1, error)
              .timeout(5000)
              .catch(Promise.TimeoutError, () => {
                this._resolver()
              })
          }
          resolve(trx)
        },
        config,
        outTx,
      ])
    })
  }
}

function enhanceKnexHelpers (app, helpers) {
  helpers.warn = app.knexLogger.warn.bind(app.knexLogger, '[egg-knex]')
  helpers.error = app.knexLogger.error.bind(app.knexLogger, '[egg-knex]')
  helpers.debugLog = function (msg) {
    if (isExplainQuery(msg)) return
    app.knexLogger.info('[egg-knex]', msg)
  }
}

function explainAfterQuery (app, knex) {
  knex.on('query-response', (_response, { sql, bindings }) => {
    sql = knex.client._formatQuery(sql, bindings).trim()
    if (haveQueryPlan(sql)) {
      knex.raw(`explain ${sql}`).then(([ [ explained ] ]) => {
        app.knexLogger.info('[egg-knex] explain %s\n=====> result is: %j', sql, explained)
      })
    }
  })
}

function isGenerator (fn) {
  return Object.prototype.toString.call(fn) === '[object GeneratorFunction]'
}

function isExplainQuery (sql) {
  if (typeof sql === 'string') {
    const method = `${sql}`.split(' ').shift().toUpperCase()
    return method === 'EXPLAIN'
  }

  if (sql && sql.sql) return isExplainQuery(sql.sql)
  return false
}

function haveQueryPlan (sql) {
  const method = `${sql}`.split(' ').shift().toUpperCase()
  return [ 'INSERT', 'SELECT', 'DELETE', 'UPDATE' ].includes(method)
}
