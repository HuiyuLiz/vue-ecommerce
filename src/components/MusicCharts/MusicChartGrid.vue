<template>
  <div class="col-6 col-md-4 px-0">
    <div
      class="d-flex justify-content-center align-items-center overlay"
      @click="goTochart(chart.title,chart.id)"
    >
      <img :src="chart.images[1].url" :alt="chart.title" class="img-fluid" />
      <div class="mask d-flex justify-content-center align-items-center bg-dark-50">
        <!-- <div class="border-rounded d-flex justify-content-center align-items-center">
          <i class="material-icons">play_arrow</i>
        </div>-->
        <button class="btn btn-outline-light font-weight-bold btn-block w-75 py-3">{{chart.title}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'MusicChartGrid',
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
    goTochart (title,id) {
      this.$emit('goTochart',{title,id})
    }
  },
}
</script>

