<template>
  <div class="col-6 col-md-4 col-lg-3 mb-3">
    <div
      class="d-flex justify-content-center align-items-center mb-3 overlay"
      @click="goTochart(chart.id)"
    >
      <img :src="chart.images[2].url" :alt="chart.title" class="img-fluid rounded" />
      <div class="mask d-flex justify-content-center align-items-center bg-dark-50">
        <div class="border-rounded d-flex justify-content-center align-items-center">
          <i class="material-icons">play_arrow</i>
        </div>
      </div>
    </div>
    <h3 class="h6 text-secondary mb-2">{{chart.title}}</h3>
    <p class="small text-muted">{{formatTime}}</p>
  </div>
</template>

<script>
export default {
  name:'MusicChartItem',
  props:{
    chart:{
      type:Object,
      required:true
    },
  },
  computed: {
    formatTime () {
      return this.chart.updated_at.replace('T',' ').split('+')[0]
    }
  },
  methods: {
    goTochart(id){
     this.$emit('goTochart',id)
    }
  },
}
</script>

