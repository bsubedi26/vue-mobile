// auth module

import setupMutations from './mutations'
import setupActions from './actions'
import * as getters from './getters'
import state from './state'
import feathers from '../../feathers'

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

  const mutations = setupMutations(feathers, options)
  const actions = setupActions(feathers, options)

  store.registerModule(namespace, {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  })
}
