import Vue from 'vue'
import Router from 'vue-router'
import routerAuth from './auth'

Vue.use(Router)

const load = (page) => () => import(`@/${page.toLowerCase()}/${page}.vue`) // '@' is alias for src/views
const loadIndex = (folder) => () => import(`@/${folder}/index.vue`) // '@' is alias for src/views
const loadChildren = (folder, subFolder) => () => import(`@/${folder}/${subFolder}/index.vue`) // '@' is alias for src/views

const loadLayout = (folder) => () => import(`@/${folder}/layout.vue`) // '@' is alias for src/views
const loadChild = (folder, subFolder) => () => import(`@/${folder}/index.vue`) // '@' is alias for src/views
// const loadCmp = (folder, component) => import(`@/${folder}/${component}.vue`)

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
      // component: loadIndex('search'),
      component: loadLayout('search'),
      children: [
        {
          path: '',
          // component: loadChildren('search', 'list')
          component: loadChild('search/list')
        }
        // {
        //   path: 'details/:name',
        //   component: loadChildren('Search', 'SearchDetails')
        // }
      ]
    },
    { path: '/login', component: load('login') },
    { path: '/settings', component: loadIndex('settings') },
    { path: '/signup', component: load('signup') },
    { path: '/about', component: loadIndex('about') },
    { path: '/', redirect: '/currency' },
    // Error as last component to catch if route is not found
    { path: '*', component: load('Error') } // Not found
  ]
})

routerAuth(router)

export default router
