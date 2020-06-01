<template>
  <tr>
    <td colspan="3" class="align-middle">
      <div class="d-flex text-left align-items-center">
        <div class="col-4 col-md-3 px-0 px-md-3">
          <img :src="item.product.imageUrl" alt class="img-fluid" />
        </div>
        <div class="col-8 col-md-8 d-flex flex-column pr-0">
          <small class="mb-1 mb-md-3 text-secondary">{{ item.product.title.trim().split('/')[0] }}</small>
          <span class="h6 mb-0 text-secondary">{{ item.product.title.trim().split('/')[1] }}</span>
          <div class="text-muted small mt-3 text-secondary" v-if="item.coupon">已符合折扣活動</div>
        </div>
      </div>
    </td>
    <td class="align-middle text-secondary" style="width:20%">{{ item.qty }}</td>
    <td class="align-middle text-right">
      <div class="mb-3 btn-delete" @click="deleteToCart(item.id)" style="cursor:pointer">
        <span class="material-icons btn-delete">clear</span>
      </div>
      <div class="d-flex flex-column">
        <span class="mb-3 text-secondary">{{item.final_total|currency}}</span>
        <del class="text-muted">{{item.product.origin_price*item.qty|currency}}</del>
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