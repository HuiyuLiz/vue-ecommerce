import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import cart from './modules/cart'
import kkbox from './modules/kkbox'
import { getShoppingListAll } from '@/api/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicCategories: []
  },
  getters: {
    categories (state) {
      return state.musicCategories
    }
  },
  mutations: {
    get_category (state, payload) {
      state.musicCategories = payload
    }
  },
  actions: {
    GET_CATEGORIES ({ commit }, payload) {
      getShoppingListAll().then(res => {
        if (res.data.success && res.data.products) {
          let categories = res.data.products.map(product => product.category)
          categories = res.data.products ? new Set(categories) : []
          commit('get_category', categories)
        }
      })
    }
  },
  modules: {
    loading,
    cart,
    kkbox
  }
})
