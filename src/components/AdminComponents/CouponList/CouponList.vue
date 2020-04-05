<template src='./template.html'></template>

<script>
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

import {
  createCoupon,
  getCouponList,
  editCoupon,
  deleteCoupon
} from '@/api/api'
import $ from 'jquery'
import Pagination from '@/components/Pagination/Pagination'
import { EventBus } from '@/eventBus/eventBus'
import moment from 'moment'

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
        showClose: true,
      }
    }
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
    closeModal() {
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
      this.tempCoupon.due_date > now ? this.tempCoupon.is_enabled = 1:this.tempCoupon.is_enabled = 0     
    },
    createCoupon () {
      this.tempCoupon.due_date = Math.floor(new Date(this.date).getTime())/ 1000       
      this.checkDueDate()
      if (this.isNew) { 
        createCoupon({ data: this.tempCoupon })
          .then(res => {
            this.dataResponse(res.data.success)
            EventBus.emitHandler(true, res.data.message)
          })
          .catch(error => {
            EventBus.emitHandler(false, '取得資料錯誤')
          })
      } else {         
        editCoupon({ data: this.tempCoupon }, this.tempCoupon.id)
          .then(res => {
            this.dataResponse(res.data.success)
            EventBus.emitHandler(true, res.data.message)
          })
          .catch(error => {
            EventBus.emitHandler(false, '取得資料錯誤')
          })
      }
    },
    getCouponList (page = 1) {
      this.$store.commit('loading/loading_status', true);
      getCouponList(page)
        .then(res => {
          if (res.data.success) {
            this.coupons = res.data.coupons
            this.pagination = res.data.pagination
            this.$route.params.page = page
            this.$router.push({ name: 'couponList', params: { page: page } })
            this.$store.commit('loading/loading_status', false);
            this.checkDueDate()          
          } else {
            EventBus.emitHandler(false, '取得優惠券失敗')
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, '取得資料錯誤')
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
          EventBus.emitHandler(false, '取得資料錯誤')
        })
    }
  },
  created () {
    this.getCouponList()
  },

}
</script>
