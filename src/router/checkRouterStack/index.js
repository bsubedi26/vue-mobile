import store from 'src/store'

export default (router) => {
  router.beforeEach((to, from, next) => {
    const { backButtonPressed } = store.state.route
  
    if (!backButtonPressed) {
      const payload = Object.assign({}, { to, from })
      store.dispatch('route/pushStack', payload)
    }

    // if the destination route is a children route
    // Example: from.fullPath='/page/currency && to.fullPath='/page/currency/details/1' 
    if (to.fullPath.indexOf(from.fullPath) >= 0) {
      // store.dispatch('route/pushStack', stack)
    }

    // if the destination route is NOT a children route
    if (to.fullPath.indexOf(from.fullPath) === -1) {}
    next()
  })

  router.afterEach((to, from) => {
    const { backButtonPressed } = store.state.route
    if (backButtonPressed) {
      store.commit('route/REMOVE_LAST_ROUTE')
    }
    store.commit('route/RESET_BACK_BUTTON')
  })

  return router
}
