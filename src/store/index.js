import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexLoader } from 'vuex-loading'
// import createPersistedState from 'vuex-persistedstate'
// import IdleVue from 'idle-vue'
import authModule from './auth'

const VuexLoading = createVuexLoader({
  moduleName: 'loading',
  componentName: 'v-loading',
  className: 'v-loading'
})

Vue.use(Vuex)
Vue.use(VuexLoading)

const store = new Vuex.Store({
  modules: {
    // product,
    // cryptoCurrency
  },
  plugins: [
    authModule,
    VuexLoading.Store
    // createPersistedState()
  ]
})

// Vue.use(IdleVue, { 
//   store,
//   idleTime: 3000
// })

export default store
