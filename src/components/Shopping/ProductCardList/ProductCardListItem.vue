<template>
  <div class="card mb-5 rounded-0">
    <div class="card-img" @click.prevent="selectProduct(product.id,product.category)">
      <button
        href=" #"
        class="btn btn-outline-dark btn-block w-75 py-3"
        @click.prevent="selectProduct(product.id,product.category)"
      >查看更多</button>
      <img alt class="card-img-top rounded-0" :src="product.imageUrl" />
    </div>
    <div class="card-body px-0 pb-0">
      <h5
        class="card-title mb-0"
        @click.prevent="selectProduct(product.id,product.category)"
      >{{album}}</h5>
      <small class="text-secondary mb-5">{{singer}}</small>
      <div class="d-flex justify-content-between align-items-center pb-3">
        <div class="d-flex justify-content-start">
          <p class="card-text mb-0 mr-2 text-danger font-weight-bold">NT${{product.origin_price}}</p>
          <del class="card-text text-muted">NT${{product.price}}</del>
        </div>
        <slot name="openModal"></slot>
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