<template>
  <div>
    <BannerCarousel />
    <section class="container-fluid bg-light pb-md-5">
      <div class="container pt-3 pb-5">
        <h1
          v-scrollanimation
          class="mt-5 pb-4 font-weight-bold h3 text-dark text-left title-border-decoration title-border-dark">
          本月推薦
        </h1>
        <div />
        <OffsetContent
          :random-product="randomProduct"
          class="row align-items-start mt-5 pb-5" />
      </div>
    </section>
    <div class="container mt-5 pt-3 pb-5">
      <h1
        v-scrollanimation
        class="pb-4 font-weight-bold h3 text-dark text-left title-border-decoration title-border-dark">
        {{ totalCharts.length>0?"熱門排行榜":"Loading..." }}
      </h1>
      <MusicChartList v-scrollanimation />
    </div>
    <section class="mt-5 bg-dark">
      <div class="container text-center pb-3 pb-md-5 pt-4">
        <h1
          v-scrollanimation
          class="pb-4 my-5 font-weight-bold h3 text-white text-left title-border-decoration title-border-white">
          熱銷專輯
        </h1>
        <Carousel
          v-scrollanimation
          :speed="3000"
          :scroll-per-page="true"
          :per-page-custom="[[480, 3], [768, 5]]"
          :autoplay="true"
          :pagination-color="`#666`"
          :pagination-active-color="`white`">
          <slide
            v-for="(img, index) in images"
            :key="index"
            class="mx-3">
            <img
              :key="index"
              :src="img"
              style="width: 280px; max-width: 100%;"
              class="pointer"
              @dblclick="slideClick(index)">
          </slide>
        </Carousel>
        <div
          v-scrollanimation
          class="btn-max-width m-auto py-4">
          <router-link
            :to="{name:'shopping_List', params:{ category:'all' , page: 1 }}"
            class="mt-5 mb-5 btn btn-outline-light btn-block py-3 mt-0 font-weight-bold rounded-0">
            更多實體專輯
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import MusicChartList from '@/components/Client/MusicCharts/MusicChartList'
import BannerCarousel from '@/components/Client/Layout/Banner/BannerCarousel.vue'
import OffsetContent from '@/components/Client/Layout/OffsetContent/OffsetContent.vue'
import { getShoppingListAll } from '@/api/api'
import { EventBus } from '@/eventBus/eventBus'
export default {
  name: 'Home',
  components: {
    MusicChartList,
    Carousel,
    Slide,
    BannerCarousel,
    OffsetContent
  },
  data () {
    return {
      products: [],
      randomNumber: null,
      songId: '-pZHATyRzoZVpNLHI0',
      isOpen: true
    }
  },
  computed: {
    images () {
      return this.products.map(product => product.imageUrl)
    },
    randomProduct () {
      return this.randomNumber !== null ? this.products[this.randomNumber] : {}
    },
    totalCharts () {
      return this.$store.state.kkbox.charts
    }
  },
  created () {
    this.getShoppingListAll()
  },
  mounted() {
  },
  methods: {
    addToCart (id, qty = 1) {
      this.$store.dispatch('cart/ADD_TO_CART', { id, qty })
    },
    getShoppingListAll () {
      getShoppingListAll()
        .then(res => {
          if (res.data.success && res.data.products) {
            this.products = res.data.products
              ? res.data.products.filter(product => product.is_enabled)
              : []
            this.getRandomNumber()
          }
        })
        .catch(error => {
          if (error || error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    },
    getRandomNumber () {
      let random = Math.floor(Math.random() * this.products.length)
      this.randomNumber = random
    },
    slideClick (index) {
      let { category, id } = this.products[index]
      this.$router.push({
        name: 'shopping_product',
        params: { category: category, id: id }
      })
    }
  }
}
</script>
