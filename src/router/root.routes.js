import Vue from 'vue'
import Router from 'vue-router'
// import { sync } from 'vuex-router-sync'
// import { sync } from 'src/store/route'
import routerAuth from './auth'
// import store from 'src/store'

Vue.use(Router)

const loadLayout = (folder) => () => import(`@/${folder}/layout.vue`) // '@' is alias for src/views
const loadChild = (folder) => () => import(`@/${folder}/index.vue`) // '@' is alias for src/views

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
    {
      path: '/currency',
      component: loadLayout('currency'),
      children: [
        {
          path: '',
          component: loadChild('currency/list')
        },
        {
          path: 'details/:name',
          component: loadChild('currency/details')
        }
      ]
    },

    {
      path: '/search',
      component: loadLayout('search'),
      children: [
        {
          path: '',
          component: loadChild('search/list')
        }
        // {
        //   path: 'details/:name',
        //   component: loadChildren('Search', 'SearchDetails')
        // }
      ]
    },
    { path: '/login', component: loadLayout('login') },
    { path: '/settings', component: loadLayout('settings') },
    { path: '/signup', component: loadLayout('signup') },
    { path: '/about', component: loadLayout('about') },
    { path: '/', redirect: '/currency' },
    // Error as last component to catch if route is not found
    { path: '*', component: loadLayout('Error') } // Not found
  ]
})

// sync(store, router)
routerAuth(router)

export default router
