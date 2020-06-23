<template>
  <div class="container-fluid px-0">
    <!-- discount banner -->
    <DiscountBanner v-if="currentCategory==='all'" />
    <div
      class="container pb-5"
      :class="{'mt-5':currentCategory!=='all'}">
      <!-- modal -->
      <div
        id="addCartModal"
        class="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addCartModalTitle"
        aria-hidden="true">
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document">
          <div class="modal-content rounded-0 modal-bg-blur">
            <div class="modal-body my-0 my-lg-3">
              <div class="d-flex flex-column flex-lg-row rounded-0 align-items-between">
                <div class="col-lg-6">
                  <button
                    type="button"
                    class="close align-self-end d-flex d-lg-none"
                    data-dismiss="modal"
                    aria-label="Close">
                    <span
                      aria-hidden="true"
                      class="display-4">&times;</span>
                  </button>
                  <div class="card-img my-3 my-lg-0">
                    <div class="d-flex">
                      <div class="col-6 col-md-12 pl-0 pl-md-3">
                        <img
                          alt
                          class="card-img-top rounded-0 img-fluid"
                          :src="currentProduct.imageUrl">
                      </div>
                      <div class="d-flex flex-column d-md-none">
                        <div>
                          <h4
                            v-if="currentProduct.title"
                            class="h6">
                            {{ currentProduct.title.trim().split('/')[0] }}
                          </h4>
                          <h4
                            v-if="currentProduct.title"
                            class="card-title mb-0 font-weight-bold h5 mb-3">
                            {{ currentProduct.title.trim().split('/')[1] }}
                          </h4>
                        </div>
                        <del class="small mb-1 card-text mb-0 mr-2 font-weight-bold text-secondary mr-4">
                          NT${{ currentProduct.origin_price }}
                        </del>
                        <p class="card-text text-success mb-0 h5 font-weight-bold">
                          NT${{ currentProduct.price }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6  pb-5 pb-lg-0">
                  <div class="card-body px-0 py-0 d-flex flex-column align-items-start justify-content-start h-100">
                    <div class="d-none d-md-flex justify-content-between w-100 align-items-start">
                      <div>
                        <h4
                          v-if="currentProduct.title"
                          class="h6">
                          {{ currentProduct.title.trim().split('/')[0] }}
                        </h4>
                        <h4
                          v-if="currentProduct.title"
                          class="card-title mb-0 font-weight-bold h4">
                          {{ currentProduct.title.trim().split('/')[1] }}
                        </h4>
                      </div>
                      <button
                        type="button"
                        class="close align-self-end d-none d-lg-block"
                        data-dismiss="modal"
                        aria-label="Close"
                        style="transform: translateY(-25px);">
                        <span
                          aria-hidden="true"
                          class="display-4">&times;</span>
                      </button>
                    </div>
                    <div class="d-none d-md-flex justify-content-between align-items-center mt-3">
                      <del class="card-text mb-0 mr-2 font-weight-bold text-secondary mr-4">
                        NT${{ currentProduct.origin_price }}
                      </del>
                      <p class="card-text text-success mb-0 ">
                        NT${{ currentProduct.price }}
                      </p>
                    </div>
                    <div class="d-flex flex-column flex-md-row  justify-content-between align-items-end w-100 mt-auto">
                      <div
                        class="btn-group mr-md-3 mt-3 text-center mb-3 mb-md-0 w-100"
                        role="group"
                        aria-label="Basic example">
                        <button
                          type="button"
                          class="btn btn-outline-dark py-3 px-2 rounded-0"
                          :class="{'disabled button-secondary':num===1}"
                          :disabled="num===1"
                          style="width:25%"
                          @click="numberHandler(-1)">
                          -
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-dark py-3 text-center"
                          style="width:50%">
                          <span class="text-center">{{ num }}</span>
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-dark py-3 px-2 rounded-0"
                          :class="{'disabled button-secondary':num===total}"
                          :disabled="num===total"
                          style="width:25%"
                          @click="numberHandler(1)">
                          +
                        </button>
                      </div>
                      <AddToCartButton
                        class=""
                        @click.native="addToCart(currentProduct.id,num)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="font-weight-bold font-weight-bold h6 d-flex">
        <span>專輯分類</span>
        <span
          v-if="currentCategory!=='all'"
          class="d-flex d-md-none mr-3">&nbsp;&nbsp;/&nbsp;{{ currentCategory }}</span>
      </div>
      <hr>
      <!-- 專輯分類 categories -->
      <div class="row mt-2 mt-md-5">
        <div class="col-md-2 overflow-x py-1">
          <div
            id="v-pills-tab"
            class="nav d-flex flex-nowrap flex-md-column nav-pills "
            role="tablist"
            aria-orientation="vertical">
            <div class="col-md-12 pl-0">
              <router-link
                class="nav-link  text-left mb-md-3 d-flex justify-content-center justify-content-md-start"
                :to="{name:'shopping_List', params:{ category:'all' , page: 1 }}"
                :class="{'active':currentCategory==='all'}"
                aria-selected="true"
                href="#">
                All
              </router-link>
            </div>
            <div
              v-for="category in categories"
              :key="category"
              class="col-md-12 pl-0">
              <router-link
                class=" nav-link  text-left mb-md-3 d-flex justify-content-center justify-content-md-start"
                :to="{name:'shopping_List', params:{ category:category , page: 1 }}"
                :class="{'active':currentCategory===category}"
                aria-selected="true"
                href="#">
                {{ category }}
              </router-link>
            </div>
          </div>
        </div>
        <!-- 產品 filterProducts -->
        <div class="col-md-10 mb-5 pb-5 min-height ">
          <hr class="d-block d-md-none">
          <div
            class="row mt-5 mt-md-0"
            :class="{'slide-fade-enter':isChange,'slide-fade-enter-active':!isChange}">
            <h3
              v-if="filterProducts.length===0"
              class="text-secondary display-5 px-3">
              即將公開，敬請期待！<br><span class="h5">Coming soon,stay tuned! d(`･∀･)b</span>
            </h3>
            <template v-else>
              <div
                v-for="product in filterProducts"
                :key="product.title"
                class="col-6 col-md-4 col-md-4">
                <ShoppingCardListItem
                  :product="product"
                  @selectProduct="selectProduct">
                  <template slot="openModal">
                    <AddToCartButton
                      class="d-none d-md-flex"
                      @click.native.stop="openModal(product)" />
                  </template>
                  <template slot="openModalIcon">
                    <span
                      class="material-icons material-icons-outlined material-icons-middle ml-2 pb-1 d-flex d-md-none"
                      @click="openModal(product)">shopping_cart</span>
                  </template>
                </ShoppingCardListItem>
              </div>
            </template>
          </div>
        </div>
      </div>
      <Pagination
        v-if="currentCategory==='all'"
        :pagination="pagination"
        @getPage="getProducts" />
    </div>
  </div>
</template>
<script>
import { getShoppingList, getShoppingListAll } from '@/api/api'
import { EventBus } from '@/eventBus/eventBus'
import AddToCartButton from '@/components/UIComponents/Button/AddToCartButton'
import Pagination from '@/components/UIComponents/Pagination/Pagination'
import ShoppingCardListItem from './ShoppingCardListItem'
import DiscountBanner from '@/components/Client/Layout/Banner/DiscountBanner'
import $ from 'jquery'
export default {
  name: 'ShoppingCardList',
  components: {
    Pagination,
    ShoppingCardListItem,
    AddToCartButton,
    DiscountBanner
  },
  data () {
    return {
      products: [],
      pagination: {},
      isChange: false,
      allProducts: [],
      currentProduct: {},
      num: 1,
      total: 10
    }
  },
  computed: {
    currentCategory () {
      return this.$route.params.category
    },
    filterProducts () {
      if (this.currentCategory === 'all') {
        return this.products.filter((product) => product.is_enabled)
      } else {
        let array = this.allProducts.filter(product => {
          return product.category === this.currentCategory
        })
        return array.filter((product) => product.is_enabled)
      }
    },
    isLoading () {
      return this.$store.state.loading.isLoading
    },
    categories () {
      return this.$store.getters.categories
    }
  },
  watch: {
    currentCategory (newVal, oldVal) {
      if (newVal) {
        this.isChange = true
        setTimeout(() => {
          this.isChange = false
        }, 500)
      }
    }
  },
  created () {
    $('.modal-backdrop').remove()
    $(document.body).removeClass('modal-open')
    this.getProducts()
    this.getShoppingListAll()
  },
  methods: {
    numberHandler (click) {
      this.num = this.num + click + this.total % this.total
    },
    openModal (product) {
      $('#addCartModal').modal('show')
      this.currentProduct = product
      this.num = 1
    },
    getShoppingListAll () {
      getShoppingListAll().then(res => {
        if (res.data.success && res.data.products) {
          this.allProducts = res.data.products ? res.data.products : []
        }
      })
    },
    getProducts (page = 1) {
      this.$store.commit('loading/loading_status', true)
      getShoppingList(page)
        .then(res => {
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
            this.$router.push({
              name: 'shopping_List',
              params: { category: this.$route.params.category, page: page }
            })
            this.$store.commit('loading/loading_status', false)
          } else {
            EventBus.emitHandler(false, '取得商品失敗')
          }
        })
        .catch(error => {
          if (error || error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    },
    selectProduct ({ id, category }) {
      this.$router.push({ name: 'shopping_product', params: { category: category, id: id } })
    },
    addToCart (id, qty = 1) {
      this.$store.dispatch('cart/ADD_TO_CART', { id, qty })
      $('#addCartModal').modal('hide')
    }
  }
}
</script>
