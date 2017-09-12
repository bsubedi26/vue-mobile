// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)
import Vue from 'vue'
import Quasar, { QBtn, QCard, QCardTitle, QCardSeparator, QCardMain } from 'quasar'
import router from './router'

import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(Quasar, {
  components: {
    QBtn,
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain
  }
}) // Install Quasar Framework
Vue.use(ElementUI)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'
// import Navbar from './common/Navbar.vue'
// Vue.component('app-navbar', Navbar)

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
