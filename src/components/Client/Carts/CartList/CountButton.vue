<template>
  <div
    class="btn-group mt-3 text-center mb-3 mb-md-0 "
    role="group"
    aria-label="Basic example"
  >
    <button
      type="button"
      class="btn btn-outline-secondary py-2 px-2 rounded-0"
      style="width:40px"
      :class="{'disabled button-secondary':item.qty<=1}"
      :disabled="item.qty<=1"
      @click="numberHandler(item,-1)"
    >
      -
    </button>
    <button
      type="button"
      class="btn btn-outline-secondary py-2 text-center"
      style="width:45%"
    >
      <span class="text-center">{{ item.qty }}</span>
    </button>
    <button
      type="button"
      class="btn btn-outline-secondary py-2 px-2 rounded-0"
      style="width:40px"
      :class="{'disabled button-secondary':item.qty>=20}"
      :disabled="item.qty>=20"
      @click="numberHandler(item,1)"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  name: 'CountButton',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      num: null,
      total: 10,
      product_id: ''
    }
  },
  methods: {
    numberHandler (item, click) {
      this.num = this.num + click + this.total % this.total
      this.product_id = item.product_id
      this.addToCart(item.product_id, this.num)
    },
    addToCart (id, qty = 1) {
      this.$store.dispatch('cart/ADD_TO_CART', { id, qty })
      this.num = null
    }
  }

}
</script>

<style>

</style>
