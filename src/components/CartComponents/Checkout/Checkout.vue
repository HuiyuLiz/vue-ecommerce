<template src="./template.vue"></template>
<script>
import { getOrderList, checkoutOrder } from "@/api/api";
import { EventBus } from "@/eventBus/eventBus";
import CartProgress from "../CartProgress/CartProgress";
import CheckListItem from "./CheckListItem";
export default {
  neme: "checkout",
  components: {
    CartProgress,
    CheckListItem
  },
  data() {
    return {
      order: {},
      user: {},
      orderId: "",
      step: 2,
      isOpen: true
    };
  },
  methods: {
    getOrderList() {
      this.$store.commit('loading/loading_status', true);
      getOrderList(this.orderId).then(res => {
        if (res.data.success) {
          this.order = res.data ? res.data.order : null;
          this.user = res.data.order ? res.data.order.user : null;
          this.$store.commit('loading/loading_status', false);
        } else {
          EventBus.emitHandler(false, "取得訂單失敗");
        }
      });
    },
    checkoutOrder() {
      this.$store.commit('loading/loading_status', true);
      checkoutOrder(this.order.id)
        .then(res => {
          if (res.data.success) {
            this.$store.commit('loading/loading_status', false);
            this.getOrderList();
            EventBus.emitHandler(true, res.data.message);
          } else {
            EventBus.emitHandler(false, "取得訂單失敗");
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, "取得資料錯誤");
        });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrderList();
  }
};
</script>
<style lang="scss" scoped>
a {
  cursor: pointer;
}
</style>