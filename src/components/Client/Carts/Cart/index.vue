<template src="./template.html" />
<script>
import {
  useCoupon,
  submitOrder
} from '@/api/api'
import { EventBus } from '@/eventBus/eventBus'
import DiscountBanner from '@/components/Client/Layout/Banner/DiscountBanner'
import postal from '@/assets/postal'
import CartList from '../CartList/index'
import CartValidate from '../CartValidate'
import CartProgress from '../CartProgress'

export default {
  name: 'CartComponent',
  components: {
    CartList,
    CartValidate,
    CartProgress,
    DiscountBanner
  },
  data () {
    return {
      isUse: true,
      message: '',
      isOpen: false,
      coupon: '',
      userForm: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isValid: false,
      index: {
        country: null,
        area: null
      },
      postal,
      step: 0
    }
  },
  computed: {
    countryIndex: {
      get () {
        return this.index.country
      },
      set (val) {
        this.index.country = val
        this.index.area = null
        this.userForm.user.address = ''
      }
    },
    areaIndex: {
      get () {
        return this.index.area
      },
      set (val) {
        this.index.area = val
      }
    },
    currentCountry () {
      return this.index.country !== null
        ? this.postal[this.index.country]
        : null
    },
    areas () {
      return this.currentCountry !== null ? this.currentCountry.children : []
    },
    currentArea () {
      return this.index.area !== null ? this.areas[this.index.area].name : null
    },
    currentCode () {
      return this.index.area !== null ? this.areas[this.index.area].code : null
    },
    zone () {
      return (
        this.currentCode + ' ' + this.currentCountry.name + this.currentArea
      )
    },
    carts () {
      return this.$store.state.cart ? this.$store.state.cart.carts : null
    },
    cart () {
      return this.$store.state.cart ? this.$store.state.cart.cart : null
    },
    finalTotal () {
      return this.cart ? this.$store.state.cart.cart.finalTotal : ''
    },
    total () {
      return this.cart ? this.$store.state.cart.cart.total : ''
    }
  },
  created () {
    this.getCartList()
  },
  methods: {
    getCartList () {
      this.$store.dispatch('cart/GET_CART_LIST')
    },
    deleteFromCart (id) {
      this.$store.dispatch('cart/DELETE_FROM_CART', id)
    },
    useCoupon () {
      this.$store.commit('loading/loading_status', true)
      let code = {
        code: this.coupon
      }
      useCoupon({ data: code })
        .then(res => {
          if (res.data.success) {
            this.getCartList()
            this.$store.commit('loading/loading_status', false)
            this.isUse = true
            this.message = res.data.message ? res.data.message : ''
          } else {
            this.isUse = false
            this.$store.commit('loading/loading_status', false)
            this.message = res.data.message ? res.data.message : ''
          }
        })
        .catch(error => {
          if (error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    },
    async checkValid () {
      const isValid = await this.$refs.form.validate()
      this.isValid = isValid
    },
    async submitOrder () {
      await this.checkValid()
      if (this.isValid) {
        this.userForm.user.address = this.zone + this.userForm.user.address
        await submitOrder({ data: this.userForm })
          .then(res => {
            if (res.data.success) {
              this.$router.push({
                name: 'checkout',
                params: { orderId: res.data.orderId }
              })
              this.$store.commit('loading/loading_status', false)
              EventBus.emitHandler(true, res.data.message)
            } else {
              EventBus.emitHandler(false, res.data.message)
            }
          })
          .catch(error => {
            if (error instanceof ReferenceError) {
              EventBus.emitHandler(false, '取得資料錯誤')
            }
          })
      } else {
        this.isValid = false
      }
    },
    selectZone () {
      this.$refs.zone.filter((item, index) => {
        if (!item.selected) return false
        this.zone = item.value
      })
    }
  }
}
</script>
<style lang='scss' scpoped>
.card-body {
  margin-top: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.card-header {
  cursor: pointer;
}
</style>
