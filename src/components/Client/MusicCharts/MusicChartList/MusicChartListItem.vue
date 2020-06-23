<template>
  <div class="col-6 col-md-4 col-lg-3 mb-5">
    <div
      class="d-flex justify-content-center align-items-center mb-4 overlay border"
      @click="goTochart(chart.title,chart.id)">
      <img
        :src="chart.images[2].url"
        :alt="chart.title"
        class="img-fluid">
      <div class="mask d-flex justify-content-center align-items-center bg-dark-50">
        <div class="border-rounded d-flex justify-content-center align-items-center">
          <i class="material-icons material-icons-outlined">play_arrow</i>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column text-center">
      <a
        class="mb-1 font-weight-bold h5"
        style="cursor:pointer"
        @click="goTochart(chart.title,chart.id)">{{ chart.title }}</a>
      <small class="small text-secondary">{{ formatTime }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicChartListItem',
  props: {
    chart: {
      type: Object,
      required: true
    }
  },
  computed: {
    formatTime () {
      return this.chart.updated_at.replace('T', ' ').split('+')[0]
    }
  },
  methods: {
    goTochart (title, id) {
      this.$emit('goTochart', { title, id })
    }
  }
}
</script>
