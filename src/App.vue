<template>
  <div id="app">
    <Loading
      :active.sync="isLoading"
      loader="bars"
      background-color="rgba(0,0,0, 0.9)"
      color="#52e3c7"
    ></Loading>
    <router-view name="Header" />
    <AlertEventBus></AlertEventBus>
    <router-view />
    <router-view name="Footer" />
  </div>
</template>

<script>
import AlertEventBus from '@/components/AlertEventBus/AlertEventBus';
import { mapState } from 'vuex';
export default {
  components: {
    AlertEventBus
  },
  computed: {
    ...mapState('loading', ['isLoading'])
  },
  methods: {
    async getToken () {
      await this.$store.dispatch('GET_KKBOX_TOKEN')
    },
  },
  created () {
    this.getToken()
  }
};
</script>

<style lang="scss">
@import 'assets/scss/all';
</style>

