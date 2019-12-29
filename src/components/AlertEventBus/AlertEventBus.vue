<template>
  <div></div>
</template>

<script>
import { EventBus } from "@/eventBus/eventBus";
export default {
  name: "AlertEventBus",
  data() {
    return {};
  },
  methods: {},
  created() {
    EventBus.onHandler();
  },
  beforeDestroy() {
    EventBus.offHandler();
  }
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
.notices {
  padding: 2.5rem 1.5rem;
}
</style>