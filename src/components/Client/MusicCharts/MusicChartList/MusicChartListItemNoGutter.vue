<template>
  <div class="col-6 col-md-3 px-0">
    <div
      class="d-flex justify-content-center align-items-center overlay border "
      @click="goTochart(chart.title,chart.id)">
      <img
        :src="chart.images[1].url"
        :alt="chart.title"
        class="img-fluid">
      <div class="mask bg-dark-50">
        <CustomButton
          class="mx-4"
          custom-class="btn-outline-light"
          :text="chart.title"
          @click="goTochart(chart.title,chart.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/UIComponents/Button/CustomButton'
export default {
  name: 'MusicChartListItemNoGutter',
  components: {
    CustomButton
  },
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
