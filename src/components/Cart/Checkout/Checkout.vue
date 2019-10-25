<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="container my-5">
      <div class="row">
        <form class="col-md-8 m-auto" @submit.prevent="checkoutOrder">
          <table class="table">
            <thead>
              <th>購買品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="(item,index) in order.products" :key="index">
                <td class="align-middle">
                  <div class>{{item.product.title}}</div>
                </td>
                <td class="align-middle">{{item.qty}}/{{item.product.unit}}</td>
                <td class="align-middle text-right">{{item.final_total}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{order.total}}</td>
              </tr>
            </tfoot>
          </table>
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">Email</th>
                <td colspan="3">{{user.email}}</td>
              </tr>
              <tr>
                <th scope="row">姓名</th>
                <td colspan="3">{{user.name}}</td>
              </tr>
              <tr>
                <th scope="row">收件人電話</th>
                <td colspan="3">{{user.tel}}</td>
              </tr>
              <tr>
                <th scope="row">收件人地址</th>
                <td colspan="3">{{user.address}}</td>
              </tr>
              <tr>
                <th scope="row">付款狀態</th>
                <td
                  colspan="3"
                  :class="{'text-danger':!order.is_paid,'text-success':order.is_paid}"
                >{{order.is_paid?"付款完成":"尚未付款"}}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-right">
            <button class="btn btn-danger" v-if="!order.is_paid">確認付款</button>
            <button class="btn btn-success" v-else="order.is_paid" :disabled="order.is_paid">訂單完成</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderList, checkoutOrder } from "@/api/api";
import { EventBus } from "@/eventBus/eventBus";
export default {
  neme: "checkout",
  components: {},
  data() {
    return {
      isLoading: false,
      order: {},
      user: {},
      orderId: ""
    };
  },
  methods: {
    getOrderList() {
      this.isLoading = true;
      getOrderList(this.orderId).then(res => {
        if (res.data.success) {
          this.order = res.data.order;
          this.user = res.data.order.user;
          this.isLoading = false;
        } else {
          EventBus.emitHandler(false, "取得訂單失敗");
        }
      });
    },
    checkoutOrder() {
      this.isLoading = true;
      checkoutOrder(this.order.id).then(res => {
        if (res.data.success) {
          this.isLoading = false;
          this.getOrderList();
          EventBus.emitHandler(true, res.data.message);
        } else {
          EventBus.emitHandler(false, "取得訂單失敗");
        }
      });
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrderList();
  }
};
</script>