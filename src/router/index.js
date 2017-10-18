import Vue from 'vue'
import Router from 'vue-router'
import routerAuth from './auth'

Vue.use(Router)

const load = (page) => () => import(`@/${page.toLowerCase()}/${page}.vue`) // '@' is alias for src/views
const loadIndex = (folder) => () => import(`@/${folder}/index.vue`) // '@' is alias for src/views
const loadChildren = (folder, subFolder) => () => import(`@/${folder}/${subFolder}/index.vue`) // '@' is alias for src/views

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
      component: loadIndex('currency'),
      children: [
        {
          path: '',
          component: loadChildren('currency', 'list')
        },
        {
          path: 'details/:name',
          component: loadChildren('currency', 'details')
        }
      ]
    },

    {
      path: '/search',
      component: loadIndex('search'),
      children: [
        {
          path: '',
          component: loadChildren('search', 'list')
        }
        // {
        //   path: 'details/:name',
        //   component: loadChildren('Search', 'SearchDetails')
        // }
      ]
    },
    // { path: '/currency', component: load('Currency') },
    // { path: '/currency/:name', component: load('Details') },
    // { path: '/login', component: load('Login') },
    // { path: '/signup', component: load('Signup') },
    { path: '/', redirect: '/currency' },
    { path: '/about', component: loadIndex('about') },
    // Error as last component to catch if route is not found
    { path: '*', component: load('Error') } // Not found
  ]
})

routerAuth(router)

export default router
