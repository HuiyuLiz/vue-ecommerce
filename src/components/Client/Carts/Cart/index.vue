<template>
  <div>
    <div
      class="container-fluid px-0 ">
      <DiscountBanner
        v-if="step===0" />
    </div>
    <div
      class="container pt-3 pt-md-5 mt-5 pb-5">
      <CartProgress
        class=""
        :step="step" />
      <div
        v-if="carts.length===0"
        class="row justify-content-center">
        <div
          class="h3 text-secondary my-5 py-5">
          尚未選購專輯喔!
        </div>
      </div>
      <div
        v-else
        class="row">
        <!-- 確認商品 -->
        <div
          v-if="step===0"
          class="col-md-9 m-auto "
          style="min-height: 200px;">
          <div
            class="card text-center mb-4  border-0">
            <div
              id="heading"
              class="card-header bg-muted"
              @click="isOpen=!isOpen">
              <div
                class="mb-0 collapsed"
                data-toggle="collapse"
                data-target="#collapse"
                aria-expanded="false"
                aria-controls="collapse">
                <div
                  class="d-flex align-items-center text-secondary">
                  購物車明細<i
                    v-if="isOpen"
                    class="material-icons">
                    arrow_drop_up
                  </i>
                  <i
                    v-else
                    class="material-icons">
                    arrow_drop_down
                  </i>
                </div>
              </div>
            </div>
            <div
              id="collapse"
              class="collapse show ">
              <div
                class="card-body px-0">
                <CartList
                  :carts="carts"
                  :cart="cart"
                  @deleteToCart="deleteFromCart" />
                <div
                  class="mb-2 text-left small"
                  :class="{'text-success':isUse,'text-danger':!isUse}">
                  {{ message }}
                </div>
                <div
                  class="input-group mb-3 input-group-sm">
                  <input
                    v-model.trim="coupon"
                    type="text"
                    class="form-control form-control-lg rounded-0"
                    placeholder="請輸入優惠碼">
                  <div
                    class="input-group-append">
                    <button
                      class="btn btn-outline-secondary rounded-0"
                      type="button"
                      @click="useCoupon">
                      套用優惠碼
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="d-flex justify-content-between  mb-5">
            <router-link
              class="btn btn-secondary w-25 w-sm-40 py-3 rounded-0"
              :to="{name:'shopping_List', params:{ category:'all' , page: 1 }}">
              繼續購物
            </router-link>
            <button
              class=" btn btn-dark w-25 w-sm-40 py-3 rounded-0"
              @click="step++">
              下一步
            </button>
          </div>
        </div>
        <!-- 資料表單驗證 -->
        <ValidationObserver
          v-if="step===1"
          ref="form"
          v-slot="{ invalid }"
          class="col-md-9 m-auto">
          <form
            @submit.prevent="submitOrder">
            <CartValidate
              :postal="postal"
              :index="index"
              :user-form="userForm"
              :country-index="countryIndex"
              :area-index="areaIndex"
              :areas="areas" />
            <div
              class="d-flex justify-content-between mb-5">
              <button
                class="btn btn-outline-dark w-25 w-sm-40 py-3  rounded-0"
                @click.prevent="step--">
                上一步
              </button>
              <button
                class="btn btn-dark w-25 w-sm-40 py-3 rounded-0">
                送出訂單
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
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
