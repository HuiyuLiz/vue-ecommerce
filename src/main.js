import Vue from 'vue'
import bootstrap from 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkLogIn } from "@/api/api";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import currency from './filters/currency';
import date from './filters/date';
import { i18n } from "@/plugins/i18n.js";
import { veeValidate } from "@/plugins/vee-validate.js";
import { EventBus } from '@/eventBus/eventBus'
import Toasted from 'vue-toasted';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)
Vue.filter('currency', currency)
Vue.filter('date', date)
Vue.use(Toasted, {
  router
});
axios.defaults.withCredentials = true

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
      } else {
        return next({ path: '/login' })
      }
    })
  } else {
    next()
  }
})

