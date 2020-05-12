<template src='./template.html'></template>
<script>
import { getShoppingList,getShoppingListAll } from '@/api/api';
import { EventBus } from '@/eventBus/eventBus';
import  AddToCartButton from '@/components/Button/AddToCartButton';
import Pagination from '@/components/Pagination/Pagination';
import ShoppingCardListItem from './ShoppingCardListItem';
import DiscountBanner from '@/components/Layout/Banner/DiscountBanner';
import $ from 'jquery';

export default {
  name: 'ProductCardList',
  components:{
    Pagination,
    ShoppingCardListItem,
    AddToCartButton,
    DiscountBanner
  },
  data () {
    return {
      products: [],
      pagination: {},
      categories: [],
      isChange: false,
      allProducts:[],
      currentProduct:{},
      num:1,
      total:10
    }; 
  },
  watch: {
    currentCategory (newVal,oldVal) {
      if (newVal) {
        this.isChange = true
        setTimeout(() => {
          this.isChange = false
        }, 500);
      }
    }
  },
  computed: {
    currentCategory () {
      return this.$route.params.category
    },
    filterProducts () {
      if (this.currentCategory === 'all') {
        return this.products
      } else {      
        let array = this.allProducts.filter(product =>{
          return product.category === this.currentCategory
        })
        return array
      }
    }
  },
  methods: {
    numberHandler (click) {
      this.num = this.num + click + this.total % this.total
    },
    openModal (product) {
      $('#addCartModal').modal('show')
      this.currentProduct = product
      this.num = 1
    },
    getShoppingListAll () {
      getShoppingListAll().then(res => {
        if (res.data.success && res.data.products) {
          let categories = res.data.products.map(product => product.category)
          this.categories = res.data.products ? new Set(categories) : []
          this.allProducts = res.data.products ? res.data.products : []
        }
      })
    },
    getProducts (page = 1) {
      this.$store.commit('loading/loading_status', true);
      getShoppingList(page)
        .then(res => {
          if (res.data.success) {
            this.products = res.data.products ;
            this.pagination = res.data.pagination ;
            this.$router.push({
              name: 'shopping_List',
              params:{ category: this.$route.params.category , page: page }
            });
            this.$store.commit('loading/loading_status', false);
          } else {
            EventBus.emitHandler(false, '取得商品失敗');
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, '取得資料錯誤');
        });
    },
    selectProduct ({id,category}) {
      this.$router.push({ name: 'shopping_product', params: { category: category , id: id } });
    },
    addToCart ( id, qty = 1 ) {
      this.$store.dispatch('cart/ADD_TO_CART', { id, qty });
      $('#addCartModal').modal('hide')
    }
  },
  created () {
    this.getProducts();
    this.getShoppingListAll()
  }
};
</script>