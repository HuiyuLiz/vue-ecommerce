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
}
