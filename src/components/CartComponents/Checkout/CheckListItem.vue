<template>
  <div>
    <table class="table">
      <tbody>
        <tr v-for="(item,index) in carts" :key="index">
          <td colspan="2">
            <div class="d-flex text-left align-items-center">
              <div
                class="img-thumb background-cover mr-3"
                :style="{backgroundImage:`url(${item.product.imageUrl})`}"
              ></div>
              <div class="d-flex flex-column text-left">
                <span>{{ item.product.title }}</span>
                <span class="small text-success" v-if="item.coupon">{{item.coupon.title}}</span>
              </div>
            </div>
          </td>
          <td class="align-middle text-secondary">{{ item.qty }}{{ item.product.unit }}</td>
          <td class="align-middle text-secondary text-right">
            <div class="d-flex flex-column">
              <span>{{item.final_total|currency}}</span>
              <del class="text-muted">{{item.product.origin_price|currency}}</del>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot class>
        <tr>
          <td colspan="3" class="text-right border-0 text-secondary">運費小計</td>
          <td class="text-right border-0 text-secondary">$0</td>
        </tr>
        <tr v-if="cart.final_total!==cart.total">
          <td colspan="3" class="text-right text-danger">總計</td>
          <td class="text-right text-danger">{{ cart.total |currency }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: "CheckListItem",
  props: {
    carts: {
      type: Object
    },
    cart: {
      type: Object,
      required: true
    }
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