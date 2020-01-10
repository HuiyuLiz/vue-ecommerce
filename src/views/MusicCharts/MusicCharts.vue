<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'MusicCharts',
  components: {},
  methods: {
    getToken () {
      this.$store.dispatch('GET_KKBOX_TOKEN')
    }
  },
  created () {
    this.getToken()
  },
};
</script>
