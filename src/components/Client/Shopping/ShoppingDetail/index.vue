<template src="./template.html" />
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
