<template src='./template.html'></template>
<script>
import Footer from '@/components/Layout/Footer/Footer';

export default {
  name: 'Header',
  components: {
    Footer
  },
  data () {
    return {
      isToggle: false,
      scrollPosition: null
    };
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
      return this.currentRouter !== 'home' || this.scrollPosition > 30
    }
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
  },
  created () {
    this.getCartList();
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  }
};
</script>
