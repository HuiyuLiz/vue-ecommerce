import { getCartList, deleteFromCart, addToCart } from '@/api/api'
import { EventBus } from '@/eventBus/eventBus'
export default {
  namespaced: true,
  state: {
    carts: [],
    cart: [
      {
        finalTotal: '',
        total: ''
      }
    ]
  },
  mutations: {
    get_cart: (state, { carts, finalTotal, total }) => {
      state.carts = carts
      state.cart.finalTotal = finalTotal
      state.cart.total = total
    }
  },
  actions: {
    async GET_CART_LIST ({ commit }, payload) {
      commit('loading/loading_status', true, { root: true })
      await getCartList().then(res => {
        try {
          if (res.data.success) {
            let carts = res.data.data ? res.data.data.carts : []
            let finalTotal = res.data.data ? res.data.data.final_total : ''
            let total = res.data.data ? res.data.data.total : ''
            commit('get_cart', { carts, finalTotal, total })
            commit('loading/loading_status', false, { root: true })
          } else {
            EventBus.emitHandler(false, '取得列表失敗')
            commit('loading/loading_status', false, { root: true })
          }
        } catch (error) {
          EventBus.emitHandler(false, '取得資料失敗')
          commit('loading/loading_status', false, { root: true })
        }
      })
    },
    DELETE_FROM_CART: ({ commit, dispatch }, id) => {
      commit('loading/loading_status', true, { root: true })
      deleteFromCart(id).then(res => {
        if (res.data.success) {
          dispatch('GET_CART_LIST')
          commit('loading/loading_status', false, { root: true })
          // EventBus.emitHandler(true, res.data.message)
        } else {
          EventBus.emitHandler(false, res.data.message)
        }
      })
    },
    ADD_TO_CART_API: ({ commit, dispatch }, cart) => {
      addToCart({ data: cart })
        .then(res => {
          if (res.data.success) {
            commit('loading/loading_status', false, { root: true })
            dispatch('GET_CART_LIST')
          } else {
            EventBus.emitHandler(false, res.data.message)
          }
        })
        .catch(() => {
          EventBus.emitHandler(false, '取得資料錯誤')
        })
    },
    ADD_TO_CART: ({ commit, dispatch, state }, { id, qty }) => {
      commit('loading/loading_status', true, { root: true })
      // 在購物車中如果有重複的產品就合併產品數量，重新 post 並刪除原來那筆舊產品
      let filtered = state.carts.filter(cart => cart.product_id === id)
      if (filtered.length > 0) {
        filtered.forEach(element => {
          dispatch('DELETE_FROM_CART', element.id)
          let totalQty = element.qty + qty >= 20 ? 20 : element.qty += qty
          let cart = {
            product_id: id,
            qty: totalQty
          }
          dispatch('ADD_TO_CART_API', cart)
        })
      } else {
        let cart = {
          product_id: id,
          qty: qty
        }
        dispatch('ADD_TO_CART_API', cart)
      }
    }
  }
}
