// auth module
import setupMutations from './mutations'
import setupActions from './actions'
import * as getters from './getters'
import state from './state'
import feathers from 'src/util/feathers'

export default function setupAuthModule (store) {
  const options = {
    idField: '_id',
    auth: {
      namespace: 'auth',
      userService: '/users'
    }
  }

  const { auth } = options
  const { namespace } = auth

  const actions = setupActions(feathers, options)
  const mutations = setupMutations(feathers, options)

  store.registerModule(namespace, {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  })
}
