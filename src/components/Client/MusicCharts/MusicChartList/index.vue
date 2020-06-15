<template>
  <div class="container mt-5 pb-5">
    <h1
      v-if="$route.name !== 'Home'"
      v-scrollanimation
      class="pb-4 mb-5 font-weight-bold h3 text-dark text-left title-border-decoration title-border-dark"
    >
      {{ totalCharts.length>0 ? "熱門排行榜" : "Loading..." }}
    </h1>
    <transition-group
      v-scrollanimation
      name="fade"
      mode="in-out"
      class="row"
      data-delay="1.5s"
    >
      <component
        :is="currntComponent"
        v-for="(chart,index) in totalCharts"
        :key="chart.id"
        :chart="chart"
        :format-time="chart.updated_at"
        :style="`transition-delay: ${index*0.2}s`"
        @goTochart="goTochart"
      />
    </transition-group>
  </div>
</template>

<script>
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
      charts: []
    }
  },
  computed: {
    kkbox_token () {
      return this.$store.getters['kkbox/kkbox_token']
    },
    limit_charts () {
      return this.$store.getters['kkbox/limit_charts']
    },
    totalCharts () {
      if (this.$route.name === 'Home') {
        return this.limit_charts
      } else {
        return this.$store.state.kkbox.charts
      }
    },
    currntComponent () {
      if (this.$route.name === 'Home') {
        return MusicChartListItemNoGutter
      } else {
        return MusicChartListItem
      }
    }
  },
  created () {
    let modal = document.querySelector('.modal-backdrop')
    let modalOpen = document.querySelector('.modal-open')
    if (modal) {
      modal.remove()
      modalOpen.classList.remove('modal-open')
    }
    this.getToken()
  },
  methods: {
    async getToken () {
      await this.$store.dispatch('kkbox/GET_KKBOX_TOKEN')
    },
    goTochart ({ title, id }) {
      this.$router.push({ name: 'MusicChartDetail', params: { chart_title: title }, query: { chart_id: id } }).catch((error) => {
        if (error || error instanceof ReferenceError) {
          EventBus.emitHandler(false, '取得資料錯誤')
        }
      })
    }
  }
}
</script>

<style>
</style>
