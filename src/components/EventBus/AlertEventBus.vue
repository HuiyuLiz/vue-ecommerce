<template>
  <div />
</template>

<script>
import { EventBus } from '@/eventBus/eventBus'
export default {
  name: 'AlertEventBus',
  data () {
    return {}
  },
  created () {
    EventBus.onHandler()
  },
  beforeDestroy () {
    EventBus.offHandler()
  }
}
</script>
