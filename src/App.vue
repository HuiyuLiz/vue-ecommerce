<template>
  <div id="app">
    <AlertEventBus></AlertEventBus>
    <router-view name="Header" />
    <router-view />
  </div>
</template>

<script>
import AlertEventBus from "@/components/EventBus/AlertEventBus";
export default {
  components: {
    AlertEventBus
  }
};
</script>
<style lang="scss">
@import "assets/scss/all";

body {
  font-family: "Open Sans", sans-serif, "微軟正黑體";
}
</style>

