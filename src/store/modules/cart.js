import { getCartList, deleteFromCart, addToCart } from '@/api/api';
import { EventBus } from '@/eventBus/eventBus';
export default {
  namespaced: true,
  state: {
    carts: [],
    cart: [
      {
        final_total: '',
        total: ''
      }]
  },
  mutations: {
    get_cart: (state, { carts, final_total, total }) => {
      state.carts = carts
      state.cart.final_total = final_total
      state.cart.total = total
    },
  },
  actions: {
    async GET_CART_LIST({ commit }, payload) {
      commit('loading/loading_status', true, { root: true })
      await getCartList().then(res => {
        try {
          if (res.data.success) {
            let carts = res.data.data ? res.data.data.carts : []
            let final_total = res.data.data ? res.data.data.final_total : ''
            let total = res.data.data ? res.data.data.total : ''
            commit('get_cart', { carts, final_total, total })
            commit('loading/loading_status', false, { root: true })
          } else {
            EventBus.emitHandler(false, '取得列表失敗');
            commit('loading/loading_status', false, { root: true })
          }
        } catch (error) {
          EventBus.emitHandler(false, '取得資料失敗');
          commit('loading/loading_status', false, { root: true })
        }
      });

    },
    DELETE_FROM_CART: ({ commit, dispatch }, id) => {
      commit('loading/loading_status', true, { root: true })
      deleteFromCart(id).then(res => {
        if (res.data.success) {
          dispatch('GET_CART_LIST');
          commit('loading/loading_status', false, { root: true })
          EventBus.emitHandler(true, res.data.message);
        } else {
          EventBus.emitHandler(false, res.data.message);
        }
      });
    },
    ADD_TO_CART: ({ commit, dispatch }, { id, qty = 1 }) => {
      commit('loading/loading_status', true, { root: true })
      let cart = {
        product_id: id,
        qty
      };

      addToCart({ data: cart }).then(res => {
        if (res.data.success) {
          commit('loading/loading_status', false, { root: true })
          dispatch('GET_CART_LIST');
        } else {
          EventBus.emitHandler(false, res.data.message);
        }
      }).catch(() => {
        EventBus.emitHandler(false, '取得資料錯誤');
      });
    }
  }
}