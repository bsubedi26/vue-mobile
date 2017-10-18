// import ToastMessage from '../components/Message.vue'
const ToastMessage = {}

export default (router) => {
  const checkAuth = () => {
    const token = window.localStorage.getItem('feathers-jwt')
    if (!token) return false
    else return true
  }

  router.beforeEach((toRoute, fromRoute, next) => {
    // console.log('route.beforeEach')
    const authenticated = checkAuth()
    if (toRoute.meta.requiresAuth) {
      if (!authenticated) {
        ToastMessage.present('authRequired')
        next({
          path: '/login'
          // query: { redirect: to.fullPath }
        })
      }
      else {
        next()
      }
    }
    else {
      next() // make sure to always call next()
    }
  })

  return router
}
