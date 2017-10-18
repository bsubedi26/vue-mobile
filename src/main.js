// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/animate'
if (__THEME === 'mat') require('quasar-extras/roboto-font')
// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar, {
  QBtn,
  QCard,
  QCardTitle,
  QCardSeparator,
  QCardMain,
  QLayout,
  QInput,
  QInnerLoading,
  QChip,
  QIcon,
  QModal,
  QTabs,
  QRouteTab,
  GoBack
} from 'quasar'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import { checkPercentChange, currencyWithCommas, cleanJson } from './filter'
import './components/index'
Vue.directive('go-back', GoBack)
Vue.filter('checkPercentChange', checkPercentChange)
Vue.filter('currencyWithCommas', currencyWithCommas)
Vue.filter('cleanJson', cleanJson)
Vue.use(Quasar, {
  components: {
    QLayout,
    QBtn,
    QChip,
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QInput,
    QInnerLoading,
    QModal,
    QIcon,
    QTabs,
    QRouteTab
  }
})

Vue.use(Vuelidate)

/* 
  * INITIALIZE MAIN APPLICATION
*/
Vue.config.productionTip = false
Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App'))
  })
})
