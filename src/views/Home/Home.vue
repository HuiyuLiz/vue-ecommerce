<template>
  <div>
    <BannerCarousel></BannerCarousel>
    <section class="container-fluid bg-light pb-md-5">
      <div class="container pt-3 pb-5">
        <h1
          class="mt-5 pb-4 font-weight-bold h3 text-dark text-left title-border-decoration title-border-dark"
          v-scrollanimation
        >本月推薦</h1>
        <div class="row align-items-start mt-5 pb-5">
          <div
            class="col-md-8 background-cover d-none d-md-flex flex-md-column justify-content-center align-items-left overflow-hidden"
          >
            <img
              alt
              class="rounded-0 img-half"
              :src="randomProduct.imageUrl"
              v-scrollanimation
              data-delay="1s"
            />
            <div
              class="d-flex align-items-center mb-5 w-50 px-0 pt-3"
              v-if="randomProduct.title"
              v-scrollanimation
            >
              <small class="font-weight-bold text-dark">{{randomProduct.title.trim().split('/')[1]}}</small>
              <div class="flex-grow-1 px-2">
                <div class="line bg-dark"></div>
              </div>
              <small class="font-weight-bold text-dark">{{randomProduct.title.trim().split('/')[0]}}</small>
            </div>
          </div>
          <div class="col-md-4">
            <div class>
              <div class="d-flex align-items-center mb-3 my-md-5" v-scrollanimation data-delay="1s">
                <div class="flex-grow-1 px-2 d-none d-md-block">
                  <div class="line bg-dark mt-2"></div>
                </div>
                <div class="display-3 font-weight-bold">{{randomProduct.category}}.</div>
              </div>
              <div
                class="p-md-5 offset-left border grid-background"
                v-scrollanimation
                data-delay="1s"
              >
                <img
                  class="img-fluid d-flex d-md-none"
                  :src="randomProduct.imageUrl"
                  alt
                  v-scrollanimation
                />
                <ul class="z-index-3 pl-0 mb-4 mt-4">
                  <li
                    class="text-dark d-flex align-items-center mb-2 h2 font-weight-bold"
                    v-if="randomProduct.title"
                    v-scrollanimation
                  >{{randomProduct.title.trim().split('/')[1]}}</li>
                  <li
                    class="text-dark d-flex align-items-center mb-1 h5"
                    v-if="randomProduct.title"
                    v-scrollanimation
                  >{{randomProduct.title.trim().split('/')[0]}}</li>
                </ul>
                <p v-if="randomProduct.content" v-scrollanimation>{{ellipsisContent}}</p>

                <div class="row mt-5" v-scrollanimation data-delay="1s">
                  <div class="col-md-6 m-auto">
                    <div class="d-flex mb-4" v-if="randomProduct.category">
                      <router-link
                        class="btn btn-dark btn-block py-3 mt-0 d-flex rounded-0 align-items-center justify-content-center"
                        :to="{ name: 'shopping_product', params: { category: randomProduct.category , id: randomProduct.id } }"
                      >查看更多</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container mt-5 pt-3 pb-5">
      <h1
        class="pb-4 font-weight-bold h3 text-dark text-left title-border-decoration title-border-dark"
        v-scrollanimation
      >熱門排行榜</h1>
      <MusicChartList v-scrollanimation></MusicChartList>
    </div>
    <section class="mt-5 bg-dark">
      <div class="container text-center pb-3 pb-md-5 pt-4">
        <h1
          class="pb-4 my-5 font-weight-bold h3 text-white text-left title-border-decoration title-border-white"
          v-scrollanimation
        >熱銷專輯</h1>
        <Carousel
          :speed="3000"
          :scrollPerPage="true"
          :perPageCustom="[[480, 2], [768, 4]]"
          :autoplay="true"
          v-scrollanimation
        >
          <slide v-for="(img, index) in images" :key="img" class="mx-3">
            <img
              :src="img"
              :key="index"
              style="width: 300px; max-width: 100%;"
              class="pointer"
              @dblclick="slideClick(index)"
            />
          </slide>
        </Carousel>
        <div class="col-12 col-md-3 m-auto px-0" v-scrollanimation data-delay="0.5s">
          <router-link
            :to="{name:'shopping_List', params:{ category:'all' , page: 1 }}"
            class="mt-5 mb-5 btn btn-outline-light btn-block py-3 mt-0 font-weight-bold rounded-0"
          >更多實體專輯</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import MusicChartList from '@/components/MusicCharts/MusicChartList/MusicChartList.vue';
import BannerCarousel from '@/components/Layout/Banner/BannerCarousel.vue';
import { getShoppingListAll } from '@/api/api';
import { EventBus } from '@/eventBus/eventBus';
export default {
  name: 'home',
  components:{
    MusicChartList,
    Carousel, 
    Slide,
    BannerCarousel
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
      return this.randomNumber !== null ?this.products[this.randomNumber]:[]
    },
    RandomContent () {
      return this.randomProduct !== []?this.randomProduct.content:''
    },
    ellipsisContent () {
      let len = 120
      let str = this.RandomContent
      let subStr =str.length > len ? str.substring(0 , len) + '......' : str
      return this.RandomContent !== '' ? subStr : ''   
    }
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