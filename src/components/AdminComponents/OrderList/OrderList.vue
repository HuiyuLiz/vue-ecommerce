<template src='./template.html'></template>

<script>
import { getOrders, editOrder } from '@/api/api';
import Pagination from '@/components/Pagination/Pagination';
import $ from 'jquery';
import { EventBus } from '@/eventBus/eventBus';
export default {
  name: 'OrderList',
  components: {
    Pagination
  },
  data () {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      isNew: false,
      page:0
    };
  },
  watch: {
    $route (to, from) {
      this.page = parseInt(to.params.page);
      if(this.page>this.pagination.total_pages||this.page<=0){
         this.page =1;
      }
      this.getOrders(this.page);
    }
  },
  methods: {
    getOrderList (page = 1) {
      this.$store.commit('loading/loading_status', true);
      getOrders(page)
        .then(res => {
          if (res.data.success) {
            res.data.orders ? this.orders = res.data.orders : this.orders = [];
            res.data.pagination ? this.pagination = res.data.pagination:this.pagination = [];
            this.$store.commit('loading/loading_status', false);
          } else {
            EventBus.emitHandler(false, '取得訂單失敗');
          }
        })
        .catch (error => {
          EventBus.emitHandler(false, '取得資料錯誤');
        });
    },
    getOrders (page = 1) {
      this.getOrderList(page);
      this.$router.push({ name: 'orderList', params: { page: page } });
    },
    openModal (order) {
      $('#ordermodal').modal('show');
      this.tempOrder = Object.assign({}, order);
      this.tempOrder.create_at = Math.floor(Date.now() / 1000);
    },
    editOrder () {
      editOrder({ data: this.tempOrder }, this.tempOrder.id)
        .then(res => {
          if (res.data.success) {
            this.getOrderList();
            $('#ordermodal').modal('hide');
            EventBus.emitHandler(true, res.data.message);
          } else {
            EventBus.emitHandler(false, res.data.message);
          }
        })
        .catch (error => {
          EventBus.emitHandler(false, '取得資料錯誤');
        });
    }
  },
  mounted () {
    this.page = parseInt(this.$route.params.page);
    this.getOrderList();
  }
};
</script>
<style lang='scss'>
li {
  list-style: none;
}
</style>