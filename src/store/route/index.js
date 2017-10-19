const actions = {
  pushStack ({ commit }, route) {
    commit('ROUTE_CHANGED', route)
  },
  backButton ({ commit }) {
    commit('HANDLE_BACK_BUTTON')
  },
  isBackButtonPresent ({ getters }) {
    return getters.backButtonPresent
  }
}

const getters = {
  stack: (state) => state.stack,
  backButtonPresent: (state) => state.stack.length > 1
}

const state = {
  stack: []
}

const mutations = {
  ROUTE_CHANGED (state, stack) {
    state.stack.push(stack)
  },
  HANDLE_BACK_BUTTON (state) {
    // Twice b/c: undo the push to the stack for route.beforeEach AND remove last route
    // state.stack = state.stack.slice(0, state.stack.length - 1)
    state.stack = state.stack.slice(0, state.stack.length - 1)
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
