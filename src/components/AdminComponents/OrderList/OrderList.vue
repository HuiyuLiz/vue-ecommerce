<template src="./template.html"></template>

<script>
import { getOrders, editOrder } from "@/api/api";
import Pagination from "@/components/Pagination/Pagination";
import $ from "jquery";
import { EventBus } from "@/eventBus/eventBus";
export default {
  name: "OrderList",
  components: {
    Pagination
  },
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      isNew: false,
      page: 1,
      isLoading: false
    };
  },
  computed: {},
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      getOrders(page).then(res => {
        if (res.data.success) {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.$route.params.page = page;
          this.$router.push({ name: "orderList", params: { page: page } });
          this.isLoading = false;
        } else {
          EventBus.emitHandler(false, "取得訂單失敗");
        }
      });
    },

    openModal(order) {
      $("#ordermodal").modal("show");
      this.tempOrder = Object.assign({}, order);
      this.tempOrder.create_at = Math.floor(Date.now() / 1000);
    },
    editOrder() {
      editOrder({ data: this.tempOrder }, this.tempOrder.id).then(res => {
        if (res.data.success) {
          this.getOrders();
          $("#ordermodal").modal("hide");
          EventBus.emitHandler(true, res.data.message);
        } else {
          EventBus.emitHandler(false, res.data.message);
        }
      });
    }
  },
  created() {
    this.getOrders();
  }
};
</script>
<style lang="scss">
li {
  list-style: none;
}
</style>