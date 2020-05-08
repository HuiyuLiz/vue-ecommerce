<template>
  <div>
    <table class="table">
      <tbody>
        <tr v-for="(item,index) in carts" :key="index">
          <td colspan="3" class="align-middle">
            <div class="d-flex text-left align-items-center">
              <div
                class="img-thumb background-cover mr-3 mr-md-5"
                :style="{backgroundImage:`url(${item.product.imageUrl})`}"
              ></div>
              <div class="d-flex flex-column">
                <span class="h6 mb-3 text-secondary">{{ item.product.title.trim().split('/')[0] }}</span>
                <span class="h6 mb-0 text-secondary">{{ item.product.title.trim().split('/')[1] }}</span>
                <div class="text-muted small mt-3" v-if="item.coupon">已符合折扣活動</div>
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
          <td colspan="4" class="text-right border-0 text-secondary">運費小計</td>
          <td class="text-right border-0 text-secondary">$0</td>
        </tr>
        <tr v-if="cart.final_total!==cart.total">
          <td colspan="4" class="text-right text-danger font-weight-bold">總計</td>
          <td class="text-right text-danger font-weight-bold">{{ cart.total |currency }}</td>
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