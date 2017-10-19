import store from 'src/store'

export default (router) => {
  router.beforeEach((to, from, next) => {
    // const _this = router.app
    const stack = Object.assign({}, { to, from })
    // if the destination route is a children route
    // Example: from.fullPath='/page/currency && to.fullPath='/page/currency/details/1' 
    if (to.fullPath.indexOf(from.fullPath) >= 0) {
      // console.log('child route! ', to.fullPath.indexOf(from.fullPath))
      store.dispatch('route/pushStack', stack)
    }

    // if the destination route is NOT a children route
    if (to.fullPath.indexOf(from.fullPath) === -1) {
      // console.log('NOT CHILD route! ', to.fullPath.indexOf(from.fullPath))
    }
    next()
  })

  return router
}
