<template>
  <div
    id="app"
    :class="{'bg-dark min-height':$route.path==='/login'}">
    <Loading
      :active.sync="isLoading"
      loader="bars"
      background-color="rgba(255,255,255, 0.9)"
      color="#52e3c7" />
    <AppHeader
      v-if="isShow" />
    <AlertEventBus />
    <router-view />
    <AppFooter v-if="isShow" />
  </div>
</template>

<script>

import AppHeader from '@/components/Client/Layout/Header/Header'
import AppFooter from '@/components/Client/Layout/Footer/Footer'
import AlertEventBus from '@/components/EventBus/AlertEventBus'
import { mapState } from 'vuex'
export default {
  components: {
    AlertEventBus,
    AppHeader,
    AppFooter
  },
  data () {
    return {
      isShow: true
    }
  },
  computed: {
    ...mapState('loading', ['isLoading'])
  },
  watch: {
    $route: {
      immediate: true,
      handler (newVal, oldVal) {
        let regex = new RegExp('admin', 'gi')
        let value = newVal.path
        let result = value.match(regex)
        if (result !== null) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/all';
</style>
