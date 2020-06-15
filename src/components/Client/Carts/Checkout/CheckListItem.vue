<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th
            scope="col "
            class="text-secondary text-left pl-md-4"
            colspan="3"
          >
            產品
          </th>
          <th
            scope="col"
            class="text-secondary"
          >
            數量
          </th>
          <th
            scope="col"
            class="text-secondary text-right"
          >
            價格
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item,index) in carts"
          :key="index"
        >
          <td
            colspan="3"
            class="align-middle"
          >
            <div class="d-flex text-left align-items-center">
              <div class="col-4 col-md-3 px-0 px-md-3">
                <img
                  :src="item.product.imageUrl"
                  alt
                  class="img-fluid"
                >
              </div>
              <div class="col-8 col-md-8 d-flex flex-column pr-0">
                <small
                  class="mb-1 mb-md-3 text-secondary"
                >{{ item.product.title.trim().split('/')[0] }}</small>
                <span class="h6 mb-0 text-secondary">{{ item.product.title.trim().split('/')[1] }}</span>
                <div
                  v-if="item.coupon"
                  class="small mt-3 text-success"
                >
                  已符合折扣活動
                </div>
              </div>
            </div>
          </td>
          <td
            class="align-middle text-secondary"
            style="width:20%"
          >
            {{ item.qty }}{{ item.product.unit }}
          </td>
          <td class="align-middle text-secondary text-right">
            <div class="d-flex flex-column">
              <span>{{ item.final_total|currency }}</span>
              <del class="text-muted">{{ item.product.origin_price * item.qty|currency }}</del>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot class>
        <tr>
          <td
            colspan="4"
            class="text-right border-0 text-secondary"
          >
            運費小計
          </td>
          <td class="text-right border-0 text-secondary">
            $0
          </td>
        </tr>
        <tr v-if="cart.final_total!==cart.total">
          <td
            colspan="4"
            class="text-right text-danger font-weight-bold"
          >
            總計
          </td>
          <td class="text-right text-danger font-weight-bold">
            {{ cart.total |currency }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CheckListItem',
  props: {
    carts: {
      type: Object,
      required: true
    },
    cart: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
