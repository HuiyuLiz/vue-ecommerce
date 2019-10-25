<template src="./template.html"></template>
<script>
import Pagination from "@/components/Pagination/Pagination";
export default {
  name: "Dashboard",
  components: {
    Pagination
  }
};
</script>
<style lang="scss">
.nav-link.router-link-exact-active {
  font-weight: 700;
}
</style>