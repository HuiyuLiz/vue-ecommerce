import Vue from 'vue'
import boostrap from 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { checkLogIn } from "@/api/api";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import currency from './filters/currency';
import date from './filters/date';
import { i18n } from "@/i18n.js";
import { veeValidate } from "@/vee-validate.js";
import { EventBus } from '@/eventBus/eventBus'
import Toasted from 'vue-toasted';
import App from './App.vue'
import router from './router'

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
  render: h => h(App),
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    checkLogIn().then(res => {
      if (res.data.success) {
        next()
      } else {
        next({ path: '/login' })
      }
    })
  } else {
    next()
  }
})

