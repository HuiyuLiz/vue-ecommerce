<template>
  <div>
    <section class="bg-fluid px-0 background-cover sticky-top">
      <div class="container d-flex align-items-end align-items-md-center pb-3 pb-md-0 h-100">
        <div class="col-12 col-md-3 z-index-3 px-0 mb-4">
          <!-- <div class="decoration mb-5 w-50"></div> -->
          <h1 class="display-3 d-flex">
            New
            <span class="text-stroke">Album</span>
          </h1>
          <h2 class="display-3 mb-3">Release</h2>
          <router-link
            :to="{ name: 'MusicChartDetail', params: { chart_title: '華語新歌日榜' },query:{chart_id: '-o4J9PKk_HY1NVyScM'}} "
            class="btn btn-outline-light font-weight-bold btn-block py-3 mt-3"
          >華語新歌日榜</router-link>
        </div>
      </div>
    </section>
    <div class="container pb-5">
      <h1
        class="pt-5 pb-4 font-weight-bold h3 text-dark text-left title-border-decoration title-border-dark"
      >熱門排行榜</h1>
      <MusicChartList></MusicChartList>
    </div>
    <section class="bg-dark mt-5">
      <div class="container text-center pb-3 pb-md-5">
        <h1
          class="pt-5 pb-4 my-5 font-weight-bold h3 text-white text-left title-border-decoration title-border-white"
        >熱銷專輯</h1>
        <carousel
          class="mb-3"
          v-if="images.length>0"
          :autoplay="true"
          :nav="false"
          :responsive="{0:{items:3,nav:false,dots:false},600:{items:5,nav:false,dots:true}}"
        >
          <img v-for="(img, index) in images" :src="img" :key="index" />
        </carousel>
        <div class="col-12 col-md-3 m-auto px-0">
          <router-link
            :to="{name:'shopping_List', params:{ category:'all' , page: 1 }}"
            class="btn btn-outline-light font-weight-bold btn-block my-5 py-3"
          >更多實體專輯</router-link>
        </div>
      </div>
    </section>
    <section class="mb-5 pb-5">
      <div class="container pb-3 pb-md-5">
        <h1
          class="pb-4 my-5 font-weight-bold h3 text-dark text-left title-border-decoration title-border-dark"
        >本月推薦</h1>
        <div class="row pb-3 pb-md-5">
          <div class="col-md-6 mb-3">
            <div>
              <img
                src="https://storage.googleapis.com/vue-course-api.appspot.com/ecommerce%2F1577638913608.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=MvcVd9AXD17kmSTOM4IvnArv8aTGTiev0Med%2Bcg0CPRNdTbHSxNA7tNGFg9Cd4E092vF5IUjfg%2FraX0mecuCGvkEmEz11wcjyjMQhglO0%2BRrTvORL8jSXztKyEF0p%2BtDP0NTS1Tsocd%2BvOULFHZk5hPyemIMi506RlyFsfXn2nCeY%2FPMACpf6GXcUfuFPxhuvnvxdAHFDjjb1vn1%2FU1EBlHg%2B3%2BljDS9CyVwgJAhaZRVx4b%2F6fGz5HLDTEhCaBbZEMEQiDvEbaZVHfbyrLqQzqtuchnfbj3VHMmhancboOeey5IxpDuYv0%2BV8pR4ncugTRdwQAlKTCREZmGNmD4KkQ%3D%3D"
                alt
                class="img-fluid"
              />
            </div>
          </div>
          <div class="col-md-6">
            <ul class="pl-0 mb-4">
              <li class="text-secondary d-flex align-items-center">
                <p class="mb-0">西洋流行</p>
              </li>
              <li class="text-dark mb-3">
                <h1 class="h2">Everyday Life</h1>
              </li>
            </ul>
            <h2 class="h3 mb-3">7座葛萊美獎喝采，立足全球破億銷售天團發行睽違4年新作品！</h2>
            <p>英倫搖滾天團「酷玩樂團Coldplay」繼2015年發行專輯《A Head Full of Dreams》後，便投入「A Head Full Of Dreams World Tour」巡迴演出，整整近4年沒再發表專輯。其實他們在巡演過程同時也在創作新的音樂，就在日前神神秘秘地發出特別邀請函，告知全世界的歌迷「即將發行新專輯《Everyday Life》」，令人振奮！</p>
            <ul class="pl-0 mb-4">
              <li class="text-muted mt-3 small">藝人</li>
              <li class="text-secondary">Coldplay (酷玩樂團)</li>
              <li class="text-secondary border-bottom mt-3 small pb-2 d-flex align-items-center">
                建議售價
                <span class="text-white font-weight-bold badge badge-dark p-1 ml-1">全館 88 折</span>
              </li>
              <li class="my-3 border-bottom pb-3">
                <span class="text-danger h3 font-weight-bold">$428&emsp;&emsp;</span>
                <del class="text-muted h3 font-weight-light">$449</del>
              </li>
            </ul>
            <div class="row">
              <div class="col-md-6">
                <div class="d-flex mb-4">
                  <button
                    class="btn btn-dark btn-block py-3 mt-0 d-flex align-items-center justify-content-center"
                    @click="addToCart ( '-LxHazcH-LDD0_n9BefO', qty = 1 )"
                  >
                    <span>加入購物車</span>
                    <i class="material-icons material-icons-middle ml-2">shopping_cart</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import MusicChartList from '@/components/MusicCharts/MusicChartList.vue';
import { getShoppingListAll } from '@/api/api';
export default {
  name: "home",
  components:{
    MusicChartList,
    carousel
  },
  data() {
    return {
      products:[]
    }
  },
  computed: {
    images(){
      return this.products.map(product=>product.imageUrl)
    }
  },
  methods: {
    addToCart ( id, qty = 1 ) {
      this.$store.dispatch('cart/ADD_TO_CART', { id, qty });

    },
   getShoppingListAll () {
      getShoppingListAll().then(res => {
        if (res.data.success && res.data.products) {
          let categories = res.data.products.map(product => product.category)
          this.categories = new Set(categories)
          this.products = res.data.products ? res.data.products : []
        }
      })
    },
  },
  created () {
    this.getShoppingListAll()
  }
};
</script>
<style lang="scss">
.bg-fluid {
  background-image: url('https://images.unsplash.com/photo-1581974897505-c6e18d5c139a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
  width: 100%;
  height: 70vh;
  position: relative;
  background-attachment: fixed;
  z-index: 1;
  background-position: 60% 25%;
  -webkit-filter: contrast(1.25);
  @media screen and (max-width: 600px) {
    height: 50vh;
  }
  &::after {
    content: '';
    width: 100%;
    height: 70vh;
    background-image: linear-gradient(120deg, #000aff1c 0%, #360243 100%);
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    @media screen and (max-width: 600px) {
      height: 50vh;
    }
  }
}
.decoration {
  height: 1px;
  background: rgba(255, 255, 255, 0.95);
}
.display-3 {
  font-family: 'Montserrat';
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
  @media screen and (max-width: 600px) {
    font-size: 3rem;
  }
}
.z-index-3 {
  z-index: 3;
}
.text-stroke {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.95);
  color: transparent;
}
a:hover {
  color: white;
  text-decoration: none;
}
</style>