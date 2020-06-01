<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col " class="text-secondary text-left pl-md-4" colspan="3">產品</th>
          <th scope="col" class="text-secondary">數量</th>
          <th scope="col" class="text-secondary text-right">價格</th>
        </tr>
      </thead>
      <tbody>
        <tr
          is="CartListItem"
          v-for="(item,index) in carts"
          :key="index"
          :item="item"
          @deleteToCart="deleteToCart"
        ></tr>
      </tbody>
      <tfoot class>
        <tr>
          <td colspan="4" class="text-right text-secondary">商品金額</td>
          <td class="text-right text-secondary">{{ cart.total |currency}}</td>
        </tr>
        <tr>
          <td colspan="4" class="text-right border-0 text-secondary">運費小計</td>
          <td class="text-right border-0 text-secondary">$0</td>
        </tr>
        <tr v-if="cart.final_total!==cart.total">
          <td colspan="4" class="text-right text-danger font-weight-bold">總計</td>
          <td class="text-right text-danger font-weight-bold">{{ cart.final_total |currency }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
export default {
  name: "CartList",
  props: {
    carts: {
      type: Array,
      required: true
    },
    cart: {
      type: Array,
      required: true
    }
  },
  components:{
    CartListItem
  },
  methods: {
    deleteToCart(id) {
      this.$emit("deleteToCart", id);
    }
  }
};
</script>

<style>
</style>