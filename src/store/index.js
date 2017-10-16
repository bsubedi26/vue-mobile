import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexLoader } from 'vuex-loading'
// import createPersistedState from 'vuex-persistedstate'
// import IdleVue from 'idle-vue'
import authModule from './auth'
import crypto from './crypto'

const VuexLoading = createVuexLoader({
  moduleName: 'loading',
  componentName: 'v-loading',
  className: 'v-loading'
})

Vue.use(Vuex)
Vue.use(VuexLoading)

// const actionLogger = (store) => {
//   store.subscribeAction((action, state) => {
//     console.log(`Dispatching: "${action.type}" Payload: ${JSON.stringify(action.payload)}`)
//   })
// }

const store = new Vuex.Store({
  modules: {
    crypto
  },
  plugins: [
    authModule,
    VuexLoading.Store
    // actionLogger
    // createPersistedState()
  ]
})

// Vue.use(IdleVue, { 
//   store,
//   idleTime: 3000
// })

export default store
