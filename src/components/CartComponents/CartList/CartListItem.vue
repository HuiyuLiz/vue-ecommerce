<template>
  <tr>
    <td class="align-middle">
      <button type="button" class="btn btn-outline-secondary btn-sm" @click="deleteToCart(item.id)">
        <i class="far fa-trash-alt"></i>
      </button>
    </td>
    <td>
      <div
        class="img-thumb background-cover"
        :style="{backgroundImage:`url(${item.product.imageUrl})`}"
      ></div>
    </td>
    <td class="align-middle text-secondary text-left">
      {{ item.product.title }}
      <div class="text-success small" v-if="item.coupon">套用折扣</div>
    </td>
    <td class="align-middle text-secondary">{{ item.qty }}{{ item.product.unit }}</td>
    <td class="align-middle text-secondary text-right">
      <div class="d-flex flex-column">
        <span>{{item.final_total|currency}}</span>
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

<style>
</style>