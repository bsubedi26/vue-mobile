import Vue from 'vue'
import Router from 'vue-router'
import routerAuth from './auth'

Vue.use(Router)

const load = (page) => () => import(`@/${page}.vue`) // '@' is alias for src/views

const router = new Router({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('Home') },
    { path: '/login', component: load('Login') },
    { path: '/signup', component: load('Signup') },
    // Lx eave error as last component
    { path: '*', component: load('Error404') } // Not found
  ]
})

routerAuth(router)

export default router