<template>
  <div id="app" class="layout">
    <Loading :active.sync="isLoading"></Loading>
    <router-view name="Header" />
    <AlertEventBus></AlertEventBus>
    <router-view />
    <router-view name="Footer" />
  </div>
</template>

<script>
import AlertEventBus from "@/components/AlertEventBus/AlertEventBus";
import { mapState } from "vuex";
export default {
  components: {
    AlertEventBus
  },
  computed: {
    ...mapState("loading", ["isLoading"])
  },
  mounted() {}
};
</script>
<style lang="scss">
@import "assets/scss/all";
.layout {
  display: flex;
  flex-direction: column;
}
.footer {
  justify-self: flex-end;
}
</style>

