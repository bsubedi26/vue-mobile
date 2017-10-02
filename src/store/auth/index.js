// auth module
import setupMutations from './mutations'
import setupActions from './actions'
import * as getters from './getters'
import state from './state'

export default function setupAuthModule (store) {
  const mutations = setupMutations()
  const actions = setupActions()

  store.registerModule('auth', {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  })
}
