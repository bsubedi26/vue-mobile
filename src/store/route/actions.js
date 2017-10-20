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

export default actions
