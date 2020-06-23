<template>
  <div
    role="main"
    class="col-md-9 ml-sm-auto col-lg-10 px-4">
    <tr class="table-responsive mt-5">
      <table class="table table-hover table-striped table-bordered table-sm mb-4 text-center">
        <thead>
          <tr>
            <th class="py-3">
              訂單 | 日期
            </th>
            <th class="py-3">
              用戶資料
            </th>
            <th class="py-3">
              訂購資訊
            </th>
            <th class="py-3">
              應繳金額總計
            </th>
            <th class="py-3">
              付款方式
            </th>
            <th class="py-3">
              是否付款
            </th>
            <th class="py-3">
              備註說明
            </th>
            <th class="py-3">
              編輯訂單
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id">
            <td class="align-middle">
              <div>{{ order.id }} </div>
              <div class="mt-1 small">
                {{ order.create_at | dateFormat }}
              </div>
            </td>
            <td
              class="text-left"
              rowspan="1">
              <ul class="px-2">
                <li>地址 : {{ order.user.address }}</li>
                <li>信箱 : {{ order.user.email }}</li>
                <li>姓名 : {{ order.user.name }}</li>
                <li>電話 : {{ order.user.tel }}</li>
              </ul>
            </td>
            <td class="text-left align-middle">
              <ul class="pl-2">
                <li
                  v-for="(product) in order['products']"
                  :key="product.id"
                  class="">
                  <small v-if="product.qty>0">{{ product.product.title }} - 數量 : {{ product.qty }}{{ product.unit }}</small>
                </li>
              </ul>
            </td>
            <td class="text-right pr-3 align-middle">
              {{ order.total | currency }}
            </td>
            <td class="text-center align-middle">
              {{ order.payment_method==="credit_card"?"信用卡":"到店付款" }}
            </td>
            <td
              class="align-middle font-weight-bold"
              :class="{'text-success':order.is_paid}">
              {{ order.is_paid?"已付款":"尚未付款" }}
            </td><td class="text-center align-middle">
              <small>{{ order.message }}</small>
            </td>
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="openModal(order)">
                編輯
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </tr>
    <Pagination
      :pagination="pagination"
      @getPage="getOrders" />
    <!-- Modal -->
    <div
      id="ordermodal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="ordermodal"
      aria-hidden="true"
      data-backdrop="static">
      <div
        class="modal-dialog modal-lg"
        role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-secondary text-white">
            <h5
              id="ordermodal"
              class="modal-title">
              <span>修改訂單</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span
                aria-hidden="true"
                class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="h4 font-weight-bold">
                    用戶資料
                  </div>
                  <small class="">{{ tempOrder.create_at| dateFormat }}</small>
                </div>
                <div class="form-row">
                  <div class=" form-group col-md-12">
                    <label for="title">名稱</label>
                    <input
                      v-if="tempOrder.user"
                      id="title"
                      v-model="tempOrder.user.name"
                      type="text"
                      class="form-control"
                      placeholder="請用戶名稱">
                  </div>
                </div>
                <div class="form-row">
                  <div class=" form-group col-md-6">
                    <label for="price">E-mail</label>
                    <input
                      v-if="tempOrder.user"
                      id="unit"
                      v-model="tempOrder.user.email"
                      type="unit"
                      class="form-control"
                      placeholder="請輸入 E-mail">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="origin_price">連絡電話</label>
                    <input
                      v-if="tempOrder.user"
                      id="origin_price"
                      v-model="tempOrder.user.tel"
                      type="text"
                      class="form-control"
                      placeholder="請輸入電話">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="category">地址</label>
                    <input
                      v-if="tempOrder.user"
                      id="category"
                      v-model="tempOrder.user.address"
                      type="text"
                      class="form-control"
                      placeholder="請輸入地址">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <div class="h4 font-weight-bold">
                    訂購商品
                  </div>

                  <div
                    v-for="(item,i) in tempOrder.products"
                    :key="item.product_id"
                    class="form-row">
                    <div class="form-group col-md-8">
                      <label
                        v-if="i===0"
                        for="id">產品ID:</label>
                      <input
                        id="id"
                        v-model="item.product_id"
                        type="text"
                        class=" form-control mb-3"
                        placeholder="數量"
                        min="0"
                        max="10">
                    </div>
                    <div class="form-group col-md-2">
                      <label
                        v-if="i===0"
                        for="unit">數量</label>
                      <input
                        id="unit"
                        v-model="item.qty"
                        type="number"
                        class=" form-control mb-3"
                        placeholder="數量"
                        min="0"
                        max="10">
                    </div>
                    <div class="form-group col-md-2">
                      <label
                        v-if="i===0"
                        for="">刪除</label>
                      <button
                        type="button"
                        class="form-control btn btn-danger"
                        @click="item.qty=0">
                        刪除
                      </button>
                    </div>
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <div class="d-flex align-items-center">
                    <div class="h3 font-weight-bold">
                      付款狀態
                    </div>
                    <div class="form-check mb-1 ml-2">
                      <input
                        id="is_enabled"
                        v-model="tempOrder.is_paid"
                        class="form-check-input"
                        type="checkbox">
                      <label
                        class="form-check-label"
                        for="is_enabled">是否付款</label>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="payment">付款方式</label>
                      <select
                        id="payment"
                        v-model="tempOrder.payment_method"
                        name="payment"
                        class="custom-select mr-sm-2 custom-select mr-sm-2 form-control">
                        <option value="credit_card">
                          信用卡
                        </option>
                        <option value="cod">
                          貨到付款
                        </option>
                      </select>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="total">總計</label>
                      <input
                        id="total"
                        v-model=" tempOrder.total"
                        type=" unit"
                        class="form-control mb-3">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="description">備註說明</label>
                  <textarea
                    id="description"
                    v-model="tempOrder.message"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="editOrder">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrders, editOrder } from '@/api/api'
import Pagination from '@/components/UIComponents/Pagination/Pagination'
import $ from 'jquery'
import { EventBus } from '@/eventBus/eventBus'
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
      page: 0
    }
  },
  watch: {
    $route (to, from) {
      this.page = parseInt(to.params.page)
      if (this.page > this.pagination.total_pages || this.page <= 0) {
        this.page = 1
      }
      this.getOrders(this.page)
    }
  },
  mounted () {
    this.page = parseInt(this.$route.params.page)
    this.getOrderList()
  },
  methods: {
    getOrderList (page = 1) {
      this.$store.commit('loading/loading_status', true)
      getOrders(page)
        .then(res => {
          if (res.data.success) {
            res.data.orders ? this.orders = res.data.orders : this.orders = []
            res.data.pagination ? this.pagination = res.data.pagination : this.pagination = []
            this.$store.commit('loading/loading_status', false)
          } else {
            EventBus.emitHandler(false, '取得訂單失敗')
          }
        })
        .catch(error => {
          if (error || error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    },
    getOrders (page = 1) {
      this.getOrderList(page)
      this.$router.push({ name: 'orderList', params: { page: page } })
    },
    openModal (order) {
      $('#ordermodal').modal('show')
      this.tempOrder = Object.assign({}, order)
      this.tempOrder.create_at = Math.floor(Date.now() / 1000)
    },
    editOrder () {
      editOrder({ data: this.tempOrder }, this.tempOrder.id)
        .then(res => {
          if (res.data.success) {
            this.getOrderList()
            $('#ordermodal').modal('hide')
            EventBus.emitHandler(true, res.data.message)
          } else {
            EventBus.emitHandler(false, res.data.message)
          }
        })
        .catch(error => {
          if (error || error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    }
  }
}
</script>
<style lang='scss'>
li {
  list-style: none;
}
</style>
