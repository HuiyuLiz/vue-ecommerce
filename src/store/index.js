import Vue from 'vue'
import Vuex from 'vuex'

import loading from './modules/loading'

import { getCartList, deleteFromCart, addToCart } from "@/api/api";
import { EventBus } from "@/eventBus/eventBus";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carts: [],
    cart: [
      {
        final_total: "",
        total: ""
      }
    ],
  },
  mutations: {
    get_cart: (state, { carts, final_total, total }) => {
      state.carts = carts
      state.cart.final_total = final_total
      state.cart.total = total
      // console.log({ carts, final_total, total })
    },
  },
  actions: {
    async GET_CART_LIST({ commit }, payload) {
      this.state.loading.isLoading = true;
      await getCartList().then(res => {
        try {
          if (res.data.success) {
            let carts = res.data.data ? res.data.data.carts : []
            let final_total = res.data.data ? res.data.data.final_total : ''
            let total = res.data.data ? res.data.data.total : ''
            commit('get_cart', { carts, final_total, total })
            this.state.loading.isLoading = false;
          } else {
            EventBus.emitHandler(false, "取得列表失敗");
            this.state.loading.isLoading = false;
          }
        } catch (error) {
          EventBus.emitHandler(false, "取得資料失敗");
          this.state.loading.isLoading = false;
        }
      });

    },
    DELETE_FROM_CART: ({ commit, dispatch }, id) => {
      // this.state.loading.isLoading = true;
      deleteFromCart(id).then(res => {
        if (res.data.success) {
          dispatch('GET_CART_LIST');
          // this.state.loading.isLoading = false;
          EventBus.emitHandler(true, res.data.message);
        } else {
          EventBus.emitHandler(false, res.data.message);
        }
      });
    },
    ADD_TO_CART: ({ commit, dispatch }, { id, qty = 1 }) => {
      // this.state.loading.isLoading = true;
      let cart = {
        product_id: id,
        qty
      };

      addToCart({ data: cart }).then(res => {
        if (res.data.success) {
          // this.state.loading.isLoading = false;
          dispatch('GET_CART_LIST');
        } else {
          EventBus.emitHandler(false, res.data.message);
        }
      }).catch(error => {
        EventBus.emitHandler(false, "取得資料錯誤");
      });
    }
  },
  modules: {
    loading: loading
  }
})
