export default {
  namespaced: true,
  state: {
    isLoading: false
  },
  mutations: {
    loading_status: (state, payload) => {
      state.isLoading = payload
    }
  }
  // actions: {
  //   ASYNC_LOADING: ({ commit }, payload) => {
  //     commit('loading_status', payload)
  //   }
  // }
}