<template>
  <tr>
    <td
      :colspan="colspan"
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
          <small class="mb-1 mb-md-3 text-secondary">{{ item.product.title.trim().split('/')[0] }}</small>
          <span class="h6 mb-0 text-secondary">{{ item.product.title.trim().split('/')[1] }}</span>
          <div
            v-if="item.coupon"
            class="small mt-3 text-success"
          >
            已符合折扣活動
          </div>
          <CountButton
            :item="item"
            class="d-flex d-md-none"
          />
          <div
            v-if="item.qty>=20"
            class="small my-2 mt-md-3 text-danger d-flex d-md-none"
          >
            抱歉，已達目前限購數量
          </div>
        </div>
      </div>
    </td>
    <td
      class="align-middle text-secondary d-none d-md-table-cell"
      style="width:20%"
    >
      <CountButton
        :item="item"
        class="d-none d-md-flex"
      />
      <div
        v-if="item.qty>=20"
        class="small mt-3 text-danger"
      >
        抱歉，已達目前限購數量
      </div>
    </td>
    <td class="align-middle text-right">
      <div
        class="mb-3 btn-delete"
        style="cursor:pointer"
        @click="deleteToCart(item.id)"
      >
        <span class="material-icons btn-delete">clear</span>
      </div>
      <div class="d-flex flex-column">
        <span class="mb-3 text-secondary">{{ item.final_total|currency }}</span>
        <del class="text-muted">{{ item.product.origin_price*item.qty|currency }}</del>
      </div>
    </td>
  </tr>
</template>

<script>
import CountButton from './CountButton'
export default {
  name: 'CartListItem',
  components: {
    CountButton
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    colspan: {
      type: Number,
      required: true
    }
  },

  methods: {
    deleteToCart (id) {
      this.$emit('deleteToCart', id)
    }

  }

}
</script>

<style >
</style>
