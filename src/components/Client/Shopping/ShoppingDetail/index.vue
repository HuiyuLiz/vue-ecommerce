<template>
  <div class="container-fluid pt-3 pt-md-5 mt-3 pb-5">
    <HistoryBackButton :last-path="{path:path}" />
    <!-- MusicModal -->
    <div
      v-if="track_id!==null"
      id="MusicModal"
      class="modal slide-fade p-0 align-items-center justify-content-center"
      tabindex="-1"
      role="dialog"
      aria-labelledby="MusicModalTitle"
      aria-hidden="true"
      data-backdrop="static">
      <div
        class="modal-dialog modal-dialog-center m-0 w-100 m-md-auto "
        role="document">
        <div class="modal-content">
          <button
            type="button"
            class="close position-absolute align-self-end pt-2 pr-3">
            <span
              aria-hidden="true"
              class="display-4"
              @click="closeTrack">&times;</span>
          </button>
          <TrackIframe :track-id="track_id" />
        </div>
      </div>
    </div>
    <!-- Shopping Detail -->
    <div class="container">
      <div class="row mb-5 justify-content-center">
        <div class="col-md-5 mr-5">
          <div class="d-none d-md-flex">
            <img
              class="img-fluid"
              :src="product.imageUrl"
              :alt="product.title">
          </div>
        </div>
        <div class="col-md-5">
          <template v-if="product.category">
            <div>
              <ul class="pl-0 mb-4">
                <li class="text-secondary d-flex align-items-center mb-1">
                  <router-link
                    :to="{name:'shopping_List',params: { category:'all' ,page: 1 }}"
                    class="text-secondary">
                    All
                  </router-link>&ensp;
                  /
                  &ensp;
                  <router-link
                    :to="{name:'shopping_List',params: { category:product.category ,page: 1 }}"
                    class="text-secondary">
                    {{ product.category }}
                  </router-link>
                </li>
                <li>
                  <div class="h-100 w-100 d-flex d-md-none my-3">
                    <img
                      class="img-fluid"
                      :src="product.imageUrl"
                      :alt="product.title">
                  </div>
                </li>
                <li class="text-dark mb-3">
                  <h1 class="h2 font-weight-bold text-secondary">
                    {{ album }}
                  </h1>
                  <small
                    class="text-success pb-1 d-flex justify-content-center align-items-center border border-success p-1"
                    style="width: 80px;">
                    <span class="font-weight-bold">全館免運</span>
                  </small>
                </li>
                <li class="text-secondary border-bottom mt-4 mt-md-5 h6 pb-2 d-flex align-items-start">
                  <span class="font-weight-bold">建議售價</span>
                </li>
                <li
                  v-if="product.price"
                  class="my-3 border-bottom pb-3">
                  <del class="text-secondary h4 font-weight-light mr-4">NT${{ product.origin_price }}</del>
                  <span class="text-success h4">NT${{ product.price }}</span>
                </li>
                <li class="text-muted mt-3 small">
                  藝人
                </li>
                <li class="text-secondary">
                  {{ singer }}
                </li>
                <li class="text-muted mt-3 small">
                  發行月份
                </li>
                <li class="text-secondary">
                  {{ product.description }}
                </li>
              </ul>
            </div>
          </template>
          <select
            id
            v-model="product.num"
            name
            class="form-control form-control-lg rounded-0">
            <option
              value="null"
              selected
              disabled>
              請選擇數量
            </option>
            <option
              v-for="num in 10"
              :key="num"
              :value="num">
              {{ num }}{{ product.unit }}
            </option>
          </select>
          <i class="material-icons material-icons-middle">keyboard_arrow_down</i>
          <div class="d-flex mt-4 mb-2">
            <CustomButton
              class="mr-3 w-50"
              custom-class="btn-outline-dark"
              text="專輯試聽"
              @click.native="openTrack" />
            <AddToCartButton
              class="w-50"
              @click.native="addToCart(product.id,product.num)" />
          </div>
          <small class="text-secondary">※本產品適用折價券</small>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 mt-3 mb-5">
          <TabList
            :product="product"
            :tracks="tracks"
            :singer="singer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProduct } from '@/api/api'
import { searchAlbum, searchTracks } from '@/api/kkbox'
import { EventBus } from '@/eventBus/eventBus'
import AddToCartButton from '@/components/UIComponents/Button/AddToCartButton'
import CustomButton from '@/components/UIComponents/Button/CustomButton'
import HistoryBackButton from '@/components/UIComponents/Button/HistoryBackButton'
import TrackIframe from '@/components/Client/Iframes/TrackIframe'
import TabList from './TabList'
import $ from 'jquery'
export default {
  name: 'ShoppingDetail',
  components: {
    TrackIframe,
    AddToCartButton,
    CustomButton,
    HistoryBackButton,
    TabList
  },
  data () {
    return {
      product: {},
      singer: '',
      album: '',
      tracks: [],
      album_id: '',
      track_id: null,
      isOpen: false,
      path: '',
      breakPoint: 768,
      clientWidth: null,
      clientHeight: null
    }
  },
  computed: {
    kkbox_token () {
      return this.$store.getters['kkbox/kkbox_token']
    },
    config () {
      let config = {
        headers: {
          Authorization: `${this.kkbox_token}`
        }
      }
      return config
    }
  },
  created () {
    this.getProduct()
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getClientWidth)
      this.getClientWidth()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeIframeHeight)
    window.removeEventListener('resize', this.getClientWidth)
  },
  methods: {
    getClientWidth () {
      let D = document
      this.clientWidth = document.body.clientWidth
      if (this.clientWidth >= this.breakPoint) {
        this.clientHeight = D.documentElement.clientHeight - 200
      } else {
        this.clientHeight = D.documentElement.clientHeight
      }
    },
    async getToken () {
      await this.$store.dispatch('kkbox/GET_KKBOX_TOKEN')
      await this.searchAlbum()
    },
    getProduct () {
      let id = this.$route.params.id
      this.$store.commit('loading/loading_status', true)
      getProduct(id)
        .then(res => {
          if (res.data.success) {
            this.product = res.data.product ? res.data.product : {}
            this.product.num = 1
            this.singer = this.product.title ? this.product.title.trim().split('/')[0] : ''
            this.album = this.product.title ? this.product.title.trim().split('/')[1] : ''
            this.$store.commit('loading/loading_status', false)
            this.getToken()
          } else {
            EventBus.emitHandler(false, res.data.message)
          }
        })
        .catch(error => {
          if (error || error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    },
    addToCart (id, qty = 1) {
      this.$store.dispatch('cart/ADD_TO_CART', { id, qty })
    },
    searchAlbum () {
      searchAlbum(this.config, this.album)
        .then(res => {
          if (res.data) {
            this.album_id = res.data.albums.data[0].id
            this.searchTracks()
          } else {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
        .catch(error => {
          if (error || error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    },
    searchTracks () {
      if (this.album_id !== '') {
        searchTracks(this.config, this.album_id)
          .then(res => {
            if (res.data) {
              this.tracks = res.data.data ? res.data.data : []
            }
          })
          .catch(error => {
            if (error || error instanceof ReferenceError) {
              EventBus.emitHandler(false, '取得資料錯誤')
            }
          })
      }
    },
    openTrack () {
      if (this.isOpen) {
        setTimeout(() => {
          this.isOpen = !this.isOpen
        }, 1000)
      }
      setTimeout(() => {
        this.track_id = this.album_id
      }, 1500)
      setTimeout(() => {
        this.resizeIframeHeight()
        $('#MusicModal').modal('show')
      }, 2000)
    },
    closeTrack (e) {
      $('#MusicModal').modal('hide')
      this.track_id = null
    },
    resizeIframeHeight () {
      let iframe = document.querySelector('#iframeID')
      iframe ? iframe.height = this.clientHeight + 'px' : iframe.height = null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.path = from.path
    })
  }
}
</script>
