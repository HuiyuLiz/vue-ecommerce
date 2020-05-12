<template>
  <div class="card mb-5 rounded-0">
    <div class="card-img" @click.prevent="selectProduct(product.id,product.category)">
      <img alt class="img-object-fit rounded-0" :src="product.imageUrl" />
      <slot name="openModal"></slot>
    </div>
    <div class="card-body px-0 pb-0">
      <div
        class="d-flex flex-column align-items-center"
        @click.prevent="selectProduct(product.id,product.category)"
        style="cursor:pointer"
      >
        <div class="mb-1">{{singer}}</div>
        <h6 class="card-title mb-0 font-weight-bold">{{album}}</h6>
      </div>
      <div class="d-flex text-center pb-3 mt-3">
        <div class="d-flex justify-content-center text-center w-100">
          <div class="card-text text-muted mr-3">NT${{product.price}}</div>
          <div class="card-text mb-0 text-success font-weight-bold">NT${{product.origin_price}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'ProductCardListItem',
  props : {
    product : {
      type : Object,
      required : true
    }
  },
  computed: {
    singer () {
      return this.product.title ? this.product.title.trim().split('/')[0]:''
    },
    album () {
      return this.product.title ? this.product.title.trim().split('/')[1]:''
    }
  },
  methods: {
    selectProduct ({id,category}) {
      this.$emit('selectProduct',this.product)
    }
  },
}
</script>

<style>
</style>