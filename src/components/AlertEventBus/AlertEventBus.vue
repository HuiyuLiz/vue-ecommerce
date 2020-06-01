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
