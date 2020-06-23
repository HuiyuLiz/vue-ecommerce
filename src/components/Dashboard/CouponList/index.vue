<template>
  <div
    role="main"
    class="col-md-9 ml-sm-auto col-lg-10 px-4">
    <div
      class="btn btn-primary mt-5 mb-3 float-right font-weight-bold d-flex align-item-center"
      @click="openModal(true)">
      新增優惠券
      <i class="material-icons ml-2">add</i>
    </div>
    <div class="table-responsive mt-5">
      <table class="table table-hover table-striped table-bordered table-sm mb-4 text-center">
        <thead>
          <tr>
            <th
              class="py-3"
              style="width:18%">
              ID
            </th>
            <th class="py-3">
              標題
            </th>
            <th
              class="py-3"
              style="width:10%">
              折扣
            </th>
            <th
              class="py-3"
              style="width:20%">
              使用期限
            </th>
            <th class="py-3">
              是否啟用
            </th>

            <th
              class="py-3"
              style="width:8%">
              編輯
            </th>
            <th
              class="py-3"
              style="width:8%">
              刪除
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in coupons"
            :key="item.id">
            <td class="align-middle">
              <small>{{ item.id }}</small>
            </td>
            <td class="align-middle">
              {{ item.title }}
            </td>
            <td class="align-middle">
              {{ item.percent }}
            </td>
            <td class="align-middle">
              {{ item.due_date|dateFormat }}
            </td>
            <td class="align-middle">
              {{ item.is_enabled===1?"啟用":"未啟用" }}
            </td>

            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm mr-2"
                @click="openModal(false,item)">
                編輯
              </button>
            </td>
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-danger btn-sm"
                @click="openDelModal(item)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      :pagination="pagination"
      @getPage="getCouponList" />
    <!-- Modal -->
    <div
      id="couponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="couponModal"
      aria-hidden="true"
      data-backdrop="static">
      <div
        class="modal-dialog modal-lg"
        role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-secondary text-white">
            <h5
              id="couponModal"
              class="modal-title">
              <span>新增產品</span>
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
                <div class="form-group">
                  <label for="title">優惠券標題</label>
                  <input
                    id="title"
                    v-model="tempCoupon.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">折扣百分比</label>
                    <select
                      id=""
                      v-model="tempCoupon.percent"
                      name=""
                      class="form-control">
                      <option
                        v-for="num in 100"
                        :key="num"
                        :value="num">
                        {{ num }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="date">日期</label>
                    <date-picker
                      v-model="date"
                      name="date"
                      :config="options" />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-12">
                    <label for="code">優惠券代碼</label>
                    <input
                      id="code"
                      v-model="tempCoupon.code"
                      type="text"
                      class="form-control"
                      placeholder="請輸入原價">
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempCoupon.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                      :true-value="1"
                      :false-value="0">
                    <label
                      class="form-check-label"
                      for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
              @click="closeModal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="createCoupon">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除商品Modal -->
    <div
      id="delCouponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div
        class="modal-dialog"
        role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title">
              <span>刪除優惠券</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
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
              class="btn btn-danger"
              @click="deleteCoupon(tempCoupon.id)">
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createCoupon,
  getCouponList,
  editCoupon,
  deleteCoupon
} from '@/api/api'
import $ from 'jquery'
import Pagination from '@/components/UIComponents/Pagination/Pagination'
import { EventBus } from '@/eventBus/eventBus'
import moment from 'moment'

$.extend(true, $.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    today: 'fas fa-calendar-check',
    clear: 'far fa-trash-alt',
    close: 'far fa-times-circle'
  }
})

export default {
  name: 'CouponList',
  components: {
    Pagination
  },
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isNew: false,
      page: 1,
      date: null,
      options: {
        format: 'YYYY-MM-DD HH:mm',
        useCurrent: false,
        showClear: true,
        showClose: true
      }
    }
  },
  created () {
    this.getCouponList()
  },
  methods: {
    openModal (isNew, item) {
      $('#couponModal').modal('show')
      if (isNew) {
        this.tempCoupon = {}
        this.isNew = true
        this.date = null
      } else {
        this.tempCoupon = Object.assign({}, item)
        this.isNew = false
        this.date = moment.unix(this.tempCoupon.due_date).format('YYYY-MM-DDTHH:mm').replace('T', ' ')
      }
    },
    closeModal () {
      $('#couponModal').modal('hide')
      this.date = null
    },
    openDelModal (item) {
      this.tempCoupon = item
      $('#delCouponModal').modal('show')
    },
    dataResponse (success) {
      if (success) {
        this.getCouponList()
        $('#couponModal').modal('hide')
      } else {
        EventBus.emitHandler(false, '新增優惠券失敗')
      }
    },
    checkDueDate () {
      let now = Math.floor((new Date().getTime()) / 1000)
      this.tempCoupon.due_date > now ? this.tempCoupon.is_enabled = 1 : this.tempCoupon.is_enabled = 0
    },
    createCoupon () {
      this.tempCoupon.due_date = Math.floor(new Date(this.date).getTime()) / 1000
      this.checkDueDate()
      if (this.isNew) {
        createCoupon({ data: this.tempCoupon })
          .then(res => {
            this.dataResponse(res.data.success)
            EventBus.emitHandler(true, res.data.message)
          })
          .catch(error => {
            if (error || error instanceof ReferenceError) {
              EventBus.emitHandler(false, '取得資料錯誤')
            }
          })
      } else {
        editCoupon({ data: this.tempCoupon }, this.tempCoupon.id)
          .then(res => {
            this.dataResponse(res.data.success)
            EventBus.emitHandler(true, res.data.message)
          })
          .catch(error => {
            if (error || error instanceof ReferenceError) {
              EventBus.emitHandler(false, '取得資料錯誤')
            }
          })
      }
    },
    getCouponList (page = 1) {
      this.$store.commit('loading/loading_status', true)
      getCouponList(page)
        .then(res => {
          if (res.data.success) {
            this.coupons = res.data.coupons
            this.pagination = res.data.pagination
            this.$route.params.page = page
            this.$router.push({ name: 'couponList', params: { page: page } })
            this.$store.commit('loading/loading_status', false)
            this.checkDueDate()
          } else {
            EventBus.emitHandler(false, '取得優惠券失敗')
          }
        })
        .catch(error => {
          if (error || error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    },
    deleteCoupon (id) {
      deleteCoupon(id)
        .then(res => {
          if (res.data.success) {
            this.tempCoupon = {}
            this.getCouponList()
            $('#delCouponModal').modal('hide')
            EventBus.emitHandler(true, res.data.message)
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
