import Axios from 'axios'
import qs from 'querystring'
import { getCharts } from '@/api/kkbox';
import { EventBus } from '@/eventBus/eventBus';
export default ({
  namespaced: true,
  state: {
    token: process.env.VUE_APP_TOKEN,
    token_type: process.env.VUE_APP_TOKEN_TYPE,
    charts: []
  },
  getters: {
    kkbox_token(state) {
      return `${state.token_type} ${state.token}`
    },
    limit_charts(state) {
      let charts = []
      state.charts.map(function (chart, index) {
        if (index < 8) {
          charts.push(chart)
        }
      })
      return charts
    }
  },
  mutations: {
    get_token(state, { token, token_type }) {
      [state.token, state.token_type] = [token, token_type]
    },
    get_charts(state, charts) {
      state.charts = charts
    },
  },
  actions: {
    async GET_KKBOX_TOKEN({ commit, dispatch }, payload) {
      let OAuth = {
        'grant_type': 'client_credentials',
        'client_id': process.env.VUE_APP_CLIENT_ID,
        'client_secret': process.env.VUE_APP_CLIENT_SECRET
      }
      let config = {
        headers: {
          Access: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      await Axios.post(process.env.VUE_APP_KKBOX_OAUTH, qs.stringify(OAuth), config).then(res => {
        let token = res.data.access_token ? res.data.access_token : process.env.VUE_APP_TOKEN
        let token_type = res.data.token_type ? res.data.token_type : process.env.VUE_APP_TOKEN_TYPE
        commit('get_token', { token, token_type })
        dispatch('GET_CHART')
      }).catch(error => console.error(error))
    },
    GET_CHART({ commit, getters }, payload) {
      let config = {
        headers: {
          Authorization: `${getters.kkbox_token}`
        }
      }
      getCharts(config)
        .then(res => {
          if (res.data) {
            let charts = res.data.data ? res.data.data : []
            commit('get_charts', charts)
          } else {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, '取得資料錯誤')
          console.error(error)
        })
    }
  }
})
