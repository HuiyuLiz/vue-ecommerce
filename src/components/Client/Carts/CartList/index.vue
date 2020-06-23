<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th
            scope="col "
            class="text-secondary text-left pl-md-4"
            :colspan="colspan">
            產品
          </th>
          <th
            scope="col"
            class="text-secondary d-none d-md-table-cell">
            數量
          </th>
          <th
            scope="col"
            class="text-secondary text-right">
            價格
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          is="CartListItem"
          v-for="(item,index) in carts"
          :key="index"
          :item="item"
          :colspan="colspan"
          @deleteToCart="deleteToCart" />
      </tbody>
      <tfoot class>
        <tr>
          <td
            colspan="4"
            class="text-right text-secondary">
            商品金額
          </td>
          <td class="text-right text-secondary">
            {{ cart.total |currency }}
          </td>
        </tr>
        <tr>
          <td
            colspan="4"
            class="text-right border-0 text-secondary">
            運費小計
          </td>
          <td class="text-right border-0 text-secondary">
            $0
          </td>
        </tr>
        <tr v-if="cart.finalTotal!==cart.total">
          <td
            colspan="4"
            class="text-right text-danger font-weight-bold">
            總計
          </td>
          <td class="text-right text-danger font-weight-bold">
            {{ cart.finalTotal |currency }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
export default {
  name: 'CartList',
  components: {
    CartListItem
  },
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
  data () {
    return {
      clientWidth: null,
      colspan: 3,
      breakPoint: 768
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getClientWidth)
      this.getClientWidth()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getClientWidth)
  },
  methods: {
    deleteToCart (id) {
      this.$emit('deleteToCart', id)
    },
    getClientWidth () {
      this.clientWidth = document.body.clientWidth
      if (this.clientWidth >= this.breakPoint) {
        this.colspan = 3
      } else {
        this.colspan = 4
      }
    }
  }
}
</script>

<style>
</style>
