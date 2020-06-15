import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import bootstrap from 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkLogIn } from '@/api/api'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import currency from './filters/currency'
import dateFormat from './filters/dateFormat'
import trackDuration from './filters/trackDuration'
import { i18n } from '@/plugins/i18n.js'
import Validate from '@/plugins/vee-validate.js'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import Toasted from 'vue-toasted'
import App from './App.vue'
import router from './router/index'
import store from './store'
import scrollanimation from './directives/scrollanimation'

Vue.use(require('vue-moment'))
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Validate)
Vue.use(datePicker)
Vue.component('Loading', Loading)

Vue.filter('currency', currency)
Vue.filter('dateFormat', dateFormat)
Vue.filter('trackDuration', trackDuration)

Vue.directive('scrollanimation', scrollanimation)
Vue.use(Toasted, {
  router
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === true) {
    checkLogIn().then(res => {
      if (res.data.success === true) {
        next()
      } else if (res.data.success === false) {
        return next({ path: '/login' })
      }
    })
  } else {
    next()
  }
})
