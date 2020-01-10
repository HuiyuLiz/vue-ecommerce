<template>
  <div>
    <div class="container">
      <h3 class="h3 text-secondary font-weight-bold mb-5 pb- border-bottom">熱門排行榜</h3>
      <transition-group name="fade" mode="in-out" class="row">
        <MusicChartItem
          v-for="(chart,index) in charts"
          :key="chart.id"
          :chart="chart"
          :formatTime="chart.updated_at"
          @goTochart="goTochart"
          :style="`transition-delay: ${index*0.2}s`"
        ></MusicChartItem>
      </transition-group>
    </div>
  </div>
</template>

<script>
import MusicChartItem from './MusicChartItem'
import { EventBus } from '@/eventBus/eventBus'
import { getCharts } from '@/api/kkbox';
export default {
  name: 'MusicChartList',
  components: {
    MusicChartItem
  },
  data () {
    return {
      charts:[]
    }
  },
  computed: {
    kkbox_token () {
      return this.$store.getters.kkbox_token ? this.$store.getters.kkbox_token : null
    },
  },
  methods: {
    getCharts () {
      this.$store.dispatch('loading/ASYNC_LOADING', true)
      let config = {
        withCredentials: false,
        headers:{
          Authorization: `${this.kkbox_token}`
        }
      }
      getCharts(config)
        .then(res => {
          this.$store.dispatch('loading/ASYNC_LOADING', false)
          if(res.data) {
            res.data ? this.charts = res.data.data : this.charts = []
          } else {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, '取得資料錯誤')
        })
    },
    goTochart (id) {
      this.$router.push({ name: 'MusicChartDetail', params: { chart_id: id } }).catch((error)=>{
        console.error(error)
      });
    }
  },
  created () {
    this.getCharts()
  }
}
</script>

<style>
</style>