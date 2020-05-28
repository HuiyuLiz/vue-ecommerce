<template >
  <div class="container mt-5 pb-5">
    <h1
      class="pb-4 mb-5 font-weight-bold h3 text-dark text-left title-border-decoration title-border-dark"
      v-if="$route.name !== 'home'"
      v-scrollanimation
    >{{totalCharts.length>0?"熱門排行榜":"Loading..."}}</h1>
    <transition-group name="fade" mode="in-out" class="row" v-scrollanimation data-delay="1.5s">
      <component
        :is="currntComponent"
        v-for="(chart,index) in totalCharts"
        :key="chart.id"
        :chart="chart"
        :formatTime="chart.updated_at"
        @goTochart="goTochart"
        :style="`transition-delay: ${index*0.2}s`"
      ></component>
    </transition-group>
  </div>
</template>

<script>
import $ from 'jquery'
import MusicChartListItemNoGutter from './MusicChartListItemNoGutter'
import MusicChartListItem from './MusicChartListItem'
import { EventBus } from '@/eventBus/eventBus'
export default {
  name: 'MusicChartList',
  components: {
    MusicChartListItem,
    MusicChartListItemNoGutter
  },
  data () {
    return {
      charts:[]
    }
  },
  computed: {
    kkbox_token () {
      return this.$store.getters['kkbox/kkbox_token']
    },
    limit_charts () {
      return this.$store.getters['kkbox/limit_charts']
    },
    totalCharts() {       
       if (this.$route.name === 'home') {
        return this.limit_charts
      } else {
        return this.$store.state.kkbox.charts
      }   
    },
    currntComponent () {
      if (this.$route.name === 'home') {
        return MusicChartListItemNoGutter
      } else {
        return MusicChartListItem
      }
    }
  },
  methods: {
    async getToken () {
      await this.$store.dispatch('kkbox/GET_KKBOX_TOKEN')
    },
    goTochart ({title,id}) {
      this.$router.push({ name: 'MusicChartDetail', params: { chart_title: title },query:{chart_id: id } }).catch((error)=>{
        console.error(error)
      });
    }
  },
  created () {
    let modal=document.querySelector('.modal-backdrop')
    let modalOpen=document.querySelector('.modal-open')
    if(modal){
      modal.remove()
      modalOpen.classList.remove('modal-open')
    }
    this.getToken()      
  },
}
</script>

<style>
</style>