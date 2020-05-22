import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import cart from './modules/cart'
import kkbox from './modules/kkbox'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  modules: {
    loading,
    cart,
    kkbox
  }
})

