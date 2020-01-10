<template src='./template.html'></template>
<script>
import vuex from "vuex";
import { getShoppingList,getShoppingListAll, addToCart } from '@/api/api';
import { EventBus } from '@/eventBus/eventBus';
import Pagination from '@/components/Pagination/Pagination';
export default {
  name: 'ProductCardList',
  components:{
    Pagination
  },
  data() {
    return {
      products: [],
      pagination: {},
      categories:''
    };
  },
  methods: {
    getShoppingListAll () {
      getShoppingListAll().then(res => {
        if (res.data.success && res.data.products) {
          let categories = res.data.products.map(product => product.category)
          this.categories = new Set(categories)    
        }
      })
    },
    getProducts (page = 1) {
      this.$store.dispatch('loading/ASYNC_LOADING', true);
      getShoppingList(page)
        .then(res => {
          if (res.data.success) {
            this.products = res.data.products ;
            this.pagination = res.data.pagination ;
            this.$router.push({
              name: 'shopping_List',
              params: { page: page }
            });
            this.$store.dispatch('loading/ASYNC_LOADING', false);
          } else {
            EventBus.emitHandler(false, '取得商品失敗');
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, '取得資料錯誤');
        });
    },
    selectProduct(id) {
      this.$router.push({ name: 'shopping_product', params: { id: id } });
    },
    addToCart( id, qty=1 ) {
      // this.$store.dispatch('loading/ASYNC_LOADING', true);
        this.$store.dispatch('cart/ADD_TO_CART', { id, qty });
      // let cart = {
      //   product_id: id,
      //   qty
      // };
      // addToCart({ data: cart }).then(res => {
      //   if (res.data.success) {
      //     this.$store.dispatch('loading/ASYNC_LOADING', false);
      //   } else {
      //     EventBus.emitHandler(false, res.data.message);
      //   }
      // });
    }
  },
  created () {
    this.getProducts();
    this.getShoppingListAll()
  }
};
</script>