<template>
  <div class="container mt-5">
    <h3
      class="h3 text-dark font-weight-bold mb-5 pb-3 border-bottom"
      v-if="$route.name==='MusicChartList'&& charts.length > 0"
    >熱門排行榜</h3>
    <transition-group name="fade" mode="in-out" class="row">
      <component
        :is="currntComponent"
        v-for="(chart,index) in charts"
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
import MusicChartGrid from './MusicChartGrid'
import MusicChartItem from './MusicChartItem'
import { EventBus } from '@/eventBus/eventBus'
import { getCharts } from '@/api/kkbox';
import qs from 'querystring'
export default {
  name: 'MusicChartList',
  components: {
    MusicChartItem,
    MusicChartGrid
  },
  data () {
    return {
      charts:[],
    }
  },
  computed: {
    kkbox_token () {
      return this.$store.getters.kkbox_token
    },
    limit_charts () {
      let charts=[]
      this.charts.map(function(chart,index) {
        if(index < 6) {
          charts.push(chart)
        }
      })
      return charts
    },
    currntComponent () {
      if (this.$route.name === 'home') {
        this.charts = this.limit_charts
        return MusicChartGrid
      } else {
        return MusicChartItem
      }
    }
  },
  methods: {
    async getToken () {
      await this.$store.dispatch('GET_KKBOX_TOKEN')
      await this.getCharts()
    },
    getCharts () {
      this.$store.commit('loading/loading_status', true);
      let config = {
        withCredentials: false,
        headers:{
          Authorization: `${this.kkbox_token}`
        }
      }
      getCharts(config)
        .then(res => {
          this.$store.commit('loading/loading_status', false);
          if(res.data) {
            res.data ? this.charts = res.data.data : this.charts = []
          } else {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, '取得資料錯誤')
          console.error(error)
        })
    },
    goTochart ({title,id}) {
      this.$router.push({ name: 'MusicChartDetail', params: { chart_title: title },query:{chart_id: id } }).catch((error)=>{
        console.error(error)
      });
    }
  },
  created () {
    this.getToken()         
  },
}
</script>

<style>
</style>