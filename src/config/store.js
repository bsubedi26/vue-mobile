import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
// import IdleVue from 'idle-vue'

import { createVuexLoader } from 'vuex-loading'
import authModule from './store/auth'
import fClient from './feathers'
import fVuex from 'feathers-vuex'

const VuexLoading = createVuexLoader({
  moduleName: 'loading',
  componentName: 'v-loading',
  className: 'v-loading'
})

Vue.use(Vuex)
Vue.use(VuexLoading)

const featherVuex = fVuex(fClient, {
  idField: '_id'
})

const store = new Vuex.Store({
  modules: {
    // product,
    // cryptoCurrency
  },
  plugins: [
    authModule,
    VuexLoading.Store,
    featherVuex.service('/email'),
    featherVuex.service('/message'),
    featherVuex.service('/users')
    // createPersistedState()
  ]
})

// const idleOptions = { 
//   idleTime: 3000,
//   store: store
// }
// Vue.use(IdleVue, idleOptions)

export default store
