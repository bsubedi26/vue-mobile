// import ToastMessage from '../components/Message.vue'
const ToastMessage = {}

export default (router) => {
  const checkAuth = () => {
    const token = window.localStorage.getItem('feathers-jwt')
    if (!token) return false
    else return true
  }

  router.beforeEach((to, from, next) => {
    const authenticated = checkAuth()
    if (to.meta.requiresAuth) {
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
