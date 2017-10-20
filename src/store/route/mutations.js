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

export default mutations
