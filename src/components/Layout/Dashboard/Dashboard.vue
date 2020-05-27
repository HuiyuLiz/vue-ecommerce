<template src="./template.html"></template>
<script>
import Pagination from '@/components/Pagination/Pagination';
import {getProductList,} from '@/api/api';
export default {
  name: 'Dashboard',
  components: {
    Pagination
  },
};
</script>
<style lang="scss" scope>
.nav-link.router-link-exact-active {
  font-weight: 700;
}
body {
  background-color: rgba(238, 238, 238, 0.3);
  font-family: 'PingFang TC', 'Microsoft JhengHei', Sans-Serif !important;
}
</style>