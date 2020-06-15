<template src="./template.vue" />
<script>
import { getOrderList, checkoutOrder } from '@/api/api'
import { EventBus } from '@/eventBus/eventBus'
import CartProgress from '../CartProgress'
import CheckListItem from './CheckListItem'
import CustomButton from '@/components/UIComponents/Button/CustomButton'
export default {
  neme: 'checkout',
  components: {
    CartProgress,
    CheckListItem,
    CustomButton
  },
  data () {
    return {
      order: {},
      user: {},
      orderId: '',
      step: 2,
      isOpen: true
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrderList()
  },
  methods: {
    scrollToTop () {
      let el = this.$refs.isCheck
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          })
        }, 2500)
      }
    },
    getOrderList () {
      this.$store.commit('loading/loading_status', true)
      getOrderList(this.orderId).then(res => {
        if (res.data.success) {
          this.order = res.data ? res.data.order : null
          this.user = res.data.order ? res.data.order.user : null
          this.$store.commit('loading/loading_status', false)
          if (this.order.is_paid) {
            this.scrollToTop()
          }
        } else {
          EventBus.emitHandler(false, '取得訂單失敗')
        }
      })
    },
    checkoutOrder () {
      this.$store.commit('loading/loading_status', true)
      checkoutOrder(this.order.id)
        .then(res => {
          if (res.data.success) {
            this.$store.commit('loading/loading_status', false)
            this.getOrderList()
            EventBus.emitHandler(true, res.data.message)
          } else {
            EventBus.emitHandler(false, '取得訂單失敗')
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
