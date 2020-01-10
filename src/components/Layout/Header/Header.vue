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
      // this.isLoading = true;
      // getCartList().then(res => {
      //   if (res.data.success) {
      //     this.carts = res.data.data.carts;
      //     [this.cart.final_total, this.cart.total] = [
      //       res.data.data.final_total,
      //       res.data.data.total
      //     ];
      //     this.isLoading = false;
      //   } else {
      //     EventBus.emitHandler(false, '取得訂單失敗');
      //   }
      // });
    },
    deleteFromCart(id) {
      this.$store.dispatch('cart/DELETE_FROM_CART', id);
      // this.isLoading = true;
      // deleteFromCart(id).then(res => {
      //   if (res.data.success) {
      //     this.getCartList();
      //     // this.isLoading = false;
      //     EventBus.emitHandler(true, res.data.message);
      //   } else {
      //     EventBus.emitHandler(false, res.data.message);
      //   }
      // });
    }
  },
  created() {
    this.getCartList();
    // this.$store.dispatch('GET_CART_LIST');
  },
};
</script>
