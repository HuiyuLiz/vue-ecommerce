<template>
  <div>
    <router-link
      :to="lastPath"
      class="btn btn-dark history-back-btn px-3 rounded-0 d-flex d-md-none"
    />
  </div>
</template>

<script>
export default {
  name: 'HistoryBackButton',
  props: {
    lastPath: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>
