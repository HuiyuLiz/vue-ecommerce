import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'querystring'
import loading from './modules/loading'
import cart from './modules/cart'
import { EventBus } from "@/eventBus/eventBus";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    token_type: null
  },
  getters: {
    kkbox_token(state) {
      return `${state.token_type} ${state.token}`
    }
  },
  mutations: {
    get_token(state, { token, token_type }) {
      [state.token, state.token_type] = [token, token_type]
    }
  },
  actions: {
    GET_KKBOX_TOKEN({ commit }, payload) {
      let OAuth = {
        'grant_type': 'client_credentials',
        'client_id': process.env.VUE_APP_CLIENT_ID,
        'client_secret': process.env.VUE_APP_CLIENT_SECRET
      }
      axios.post('/token', qs.stringify(OAuth), {
        headers: {
          Access: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        let token = res.data.access_token ? res.data.access_token : null
        let token_type = res.data.token_type ? res.data.token_type : null
        commit('get_token', { token, token_type })
      }).catch(error => console.error(error))
    }
  },
  modules: {
    loading,
    cart
  }
})

