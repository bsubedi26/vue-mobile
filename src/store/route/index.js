const actions = {
  pushStack ({ commit }, route) {
    commit('ROUTE_CHANGED', route)
  },
  isBackButtonPresent ({ getters }) {
    return getters.backButtonPresent
  },
  setBackButtonPressed ({ commit }, trueOrFalse) {
    commit('SET_BACK_BUTTON_PRESSED', trueOrFalse)
  },
  removeLastRoute ({ commit }) {
    commit('REMOVE_LAST_ROUTE')
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
  SET_BACK_BUTTON_PRESSED (state, trueOrFalse) {
    state.backButtonPressed = trueOrFalse
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
