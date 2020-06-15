<template>
  <div class="card mb-5 rounded-0">
    <div
      class="card-img"
      @click.prevent="selectProduct(product.id,product.category)"
    >
      <img
        alt
        class="img-object-fit rounded-0"
        :src="product.imageUrl"
      >
      <slot name="openModal" />
    </div>
    <div class="card-body px-0 pb-0">
      <div
        class="d-flex flex-column align-items-center"
        style="cursor:pointer"
        @click.prevent="selectProduct(product.id,product.category)"
      >
        <p class="mb-0">
          {{ singer }}
        </p>
        <div class="card-title mb-0 font-weight-bold h5">
          {{ album }}
        </div>
      </div>
      <div class="d-flex text-center pb-3 mt-3 align-items-end">
        <div
          class="d-flex flex-column align-items-start align-items-md-center flex-md-row justify-content-center w-100"
        >
          <del
            class="card-text mb-0 text-muted font-weight-bold mr-3 d-none d-md-flex"
          >NT${{ product.origin_price }}</del>
          <del
            class="card-text mb-0 text-muted font-weight-bold mr-3 small d-flex d-md-none"
          >NT${{ product.origin_price }}</del>
          <div class="card-text text-success">
            NT${{ product.price }}
          </div>
        </div>
        <slot name="openModalIcon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShoppingCardListItem',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    singer () {
      return this.product.title ? this.product.title.trim().split('/')[0] : ''
    },
    album () {
      return this.product.title ? this.product.title.trim().split('/')[1] : ''
    }
  },
  methods: {
    selectProduct ({ id, category }) {
      this.$emit('selectProduct', this.product)
    }
  }
}
</script>

<style>
</style>
