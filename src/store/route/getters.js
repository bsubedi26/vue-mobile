const getters = {
  stack: (state) => state.stack,
  backButtonPresent: (state) => state.stack.length > 1
}

export default getters
