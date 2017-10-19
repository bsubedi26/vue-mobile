const actions = {
  pushStack ({ commit }, route) {
    commit('ROUTE_CHANGED', route)
  },
  isBackButtonPresent ({ getters }) {
    return getters.backButtonPresent
  },
  backButtonClick ({ commit }) {
    commit('BACK_BUTTON_CLICKED')
  }
}

const getters = {
  stack: (state) => state.stack,
  backButtonPresent: (state) => state.stack.length > 1
}

const state = {
  stack: [],
  backButtonPressed: false
}

const mutations = {
  ROUTE_CHANGED (state, stack) {
    state.stack.push(stack)
  },
  RESET_BACK_BUTTON (state) {
    state.backButtonPressed = false
  },
  BACK_BUTTON_CLICKED (state) {
    state.backButtonPressed = true
  },
  REMOVE_LAST_ROUTE (state) {
    if (state.stack.length > 1) {
      state.stack = state.stack.slice(0, state.stack.length - 1)
    }
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
