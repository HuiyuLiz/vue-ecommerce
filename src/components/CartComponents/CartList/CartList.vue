<template>
  <div>
    <table class="table">
      <!-- <thead>
        <th></th>
        <th>品名</th>
        <th>數量</th>
        <th>單價</th>
      </thead>-->
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
          <td colspan="4" class="text-right text-danger">總計</td>
          <td class="text-right text-danger">{{ cart.final_total |currency }}</td>
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