<template src="./template.html"></template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import MusicChartList from '@/components/MusicCharts/MusicChartList/MusicChartList.vue';
import BannerCarousel from '@/components/Layout/Banner/BannerCarousel.vue';
import OffsetContent from '@/components/Layout/OffsetContent/OffsetContent.vue'
import { getShoppingListAll } from '@/api/api';
import { EventBus } from '@/eventBus/eventBus';
export default {
  name: 'home',
  components:{
    MusicChartList,
    Carousel, 
    Slide,
    BannerCarousel,
    OffsetContent
  },
  data () {
    return {
      products:[],
      randomNumber: null,
      songId:'-pZHATyRzoZVpNLHI0',
      isOpen:true
    }
  },
  computed: {
    images () {
      return this.products.map(product => product.imageUrl)
    },
    randomProduct () {
      return this.randomNumber !== null ?this.products[this.randomNumber]:{}
    },
    totalCharts () {       
      return this.$store.state.kkbox.charts
    },
  },
  methods: {
    addToCart (id, qty = 1) {
      this.$store.dispatch('cart/ADD_TO_CART', { id, qty })
    },
    getShoppingListAll () {
      getShoppingListAll().then(res => {
        if (res.data.success && res.data.products) {
          let categories = res.data.products.map(product => product.category)
          this.categories = new Set(categories)
          this.products = res.data.products ? res.data.products : []
          this.getRandomProduct()
        }
      }).catch(error => {
          EventBus.emitHandler(false, '取得資料錯誤');
        });
    },
    getRandomProduct () {
      let random = Math.floor(Math.random()*this.products.length)
      this.randomNumber = random
    },
    slideClick (index) {
      let { category,id } = this.products[index]
      this.$router.push({ name: 'shopping_product', params: { category: category , id: id } });
    },
  },
  created () {
    this.getShoppingListAll()
  }
}
</script>
<style lang="scss">
.VueCarousel-dot:focus {
  outline: 1px solid transparent !important;
}
</style>