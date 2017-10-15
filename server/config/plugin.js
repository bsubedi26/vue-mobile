
// had enabled by egg
// exports.static = true;
exports['egg-cors'] = {
  enable: true,
  package: 'egg-cors'
}
exports['egg-mongoose'] = {
  enable: true,
  package: 'egg-mongoose'
}
exports.security = false
exports.validate = {
  package: 'egg-validate'
}

exports.knex = {
  enable: true,
  package: 'egg-knex'
}
