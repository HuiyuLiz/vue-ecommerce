<template src="./template.html" />
<script>
export default {
  name: 'AppHeader',
  components: {

  },
  data () {
    return {
      isToggle: false,
      scrollPosition: null
    }
  },
  computed: {
    carts () {
      return this.$store.state.cart.carts
    },
    cart () {
      return this.$store.state.cart.cart
    },
    final_total () {
      return this.cart ? this.$store.state.cart.final_total : ''
    },
    total () {
      return this.cart ? this.$store.state.cart.total : ''
    },
    currentRouter () {
      return this.$route.name
    },
    scrollRouterCheck () {
      return this.currentRouter !== 'Home' || this.scrollPosition > 30
    },
    categories () {
      return this.$store.getters.categories
    }
  },
  created () {
    this.getCartList()
    this.$store.dispatch('GET_CATEGORIES')
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  methods: {
    getCartList () {
      this.$store.dispatch('cart/GET_CART_LIST')
    },
    deleteFromCart (id) {
      this.$store.dispatch('cart/DELETE_FROM_CART', id)
    },
    updateScroll () {
      this.scrollPosition = window.scrollY
    }
  }
}
</script>
