<template>
  <tr>
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
    <td class="align-middle text-right">
      <div class="mb-3 btn-delete" @click="deleteToCart(item.id)" style="cursor:pointer">
        <span class="material-icons btn-delete">clear</span>
      </div>
      <div class="d-flex flex-column">
        <span class="mb-3 text-secondary">{{item.final_total|currency}}</span>
        <del class="text-muted">{{item.product.origin_price|currency}}</del>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name:'CartListItem',
  props:{
    item:{
      type: Object,
      required:true,
    }
  },
  methods: {
    deleteToCart(id) {
      this.$emit("deleteToCart", id);
    }
  },

}
</script>

<style >
</style>