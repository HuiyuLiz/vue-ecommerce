<template src='./template.html'></template>
<script>
import { EventBus } from '@/eventBus/eventBus';
import Footer from '@/components/Layout/Footer/Footer';

export default {
  name: 'Header',
  components: {
    Footer
  },
  data () {
    return {
    };
  },
  computed: {
    carts () {
      return this.$store.state.cart.carts;
    },
    cart () {
      return this.$store.state.cart.cart;
    },
    final_total () {
      return this.cart ? this.$store.state.cart.final_total : '';
    },
    total () {
      return this.cart ? this.$store.state.cart.total : '';
    }
  },
  methods: {
    getCartList () {
      this.$store.dispatch('cart/GET_CART_LIST');
    },
    deleteFromCart(id) {
      this.$store.dispatch('cart/DELETE_FROM_CART', id);
    }
  },
  created() {
    this.getCartList();
  },
};
</script>
