import store from 'src/store'

export default (router) => {
  router.beforeEach((to, from, next) => {
    const { backButtonPressed } = store.state.route
    const isChildRoute = to.fullPath.includes(from.fullPath)
    const payload = Object.assign({}, { to, from })
    // console.log('INDEX', to.fullPath.indexOf(from.fullPath))
    console.log('INCLUDES', to.fullPath.includes(from.fullPath))

    // if (!backButtonPressed) {
    //   store.dispatch('route/pushStack', payload)
    // }
    // if the destination route is a children route
    // Example: from.fullPath='/page/currency && to.fullPath='/page/currency/details/1' 
    if (isChildRoute) {
      console.log('CHILD')
      if (!backButtonPressed) {
        store.dispatch('route/pushStack', payload)
      }
      // store.dispatch('route/pushStack', stack)
    }

    // if the destination route is NOT a children route
    if (!isChildRoute) {
      // store.dispatch('route/pushStack', payload)
    }
    next()
  })

  router.afterEach((to, from) => {
    const { backButtonPressed } = store.state.route
    if (backButtonPressed) {
      // RESET BACK BUTTON BACK TO FALSE  && remove last route item from stack
      store.dispatch('route/removeLastRoute')
      store.dispatch('route/setBackButtonPressed', false)
    }
  })

  return router
}
