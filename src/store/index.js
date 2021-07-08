import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import cart from './modules/cart'
import kkbox from './modules/kkbox'
import { getShoppingListAll } from '@/api/api'
import { getToken } from '@/utils/auth.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicCategories: [],
    token: getToken()
  },
  getters: {
    categories (state) {
      return state.musicCategories
    },
    token (state) {
      return state.token
    },
    isAuthenticated (state) {
      return !!state.token
    }
  },
  mutations: {
    get_category (state, payload) {
      state.musicCategories = payload
    },
    set_isAuthenticated (state, payload) {
      state.isAuthenticated = !!payload
    },
    set_token (state, payload) {
      state.token = payload
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
    },
    GET_ISAUTHENTICATED ({ commit }, payload) {
      commit('set_isAuthenticated', payload)
    }
  },
  modules: {
    loading,
    cart,
    kkbox
  }
})
