<template src="./template.html"></template>
<script>
import { getProduct } from '@/api/api';
import { searchAlbum ,searchTracks } from '@/api/kkbox';
import { EventBus } from '@/eventBus/eventBus';
import  AddToCartButton from '@/components/Button/AddToCartButton';
import  CustomButton from '@/components/Button/CustomButton';
import  HistoryBackButton from '@/components/Button/HistoryBackButton';
import TrackIframe from '@/components/Iframes/TrackIframe';
import $ from 'jquery'
export default {
  name:'ProductDetail',
  data () {
    return {
      product: {},
      singer:'',
      album:'',
      tracks:[],
      album_id:'',
      track_id:'OscmvhAIqcVQYb6WN9',
      isOpen:false,
      path:''
    };
  },
  components: {
    TrackIframe,
    AddToCartButton,
    CustomButton,
    HistoryBackButton
  },
  computed: {
    kkbox_token () {
      return this.$store.getters.kkbox_token
    },
    config () {
      let config = {
        withCredentials: false,
        headers:{
          Authorization: `${this.kkbox_token}`
        }
      }
      return config   
    },
    content () {
      let text = this.product.content
      return text.replace(/\r?\n/g, '<br/>')
    }
  },
  methods: {
    async getToken () {
      await this.$store.dispatch('GET_KKBOX_TOKEN')
      await this.searchAlbum()
     
    },
    getProduct () {
      let id = this.$route.params.id;
      this.$store.commit('loading/loading_status', true);
      getProduct(id)
        .then(res => {
          if (res.data.success) {
            this.product = res.data.product ? res.data.product : {};
            this.product.num=1
            this.singer = this.product.title ? this.product.title.trim().split('/')[0]:''
            this.album = this.product.title ? this.product.title.trim().split('/')[1]:''
            this.$store.commit('loading/loading_status', false);
            this.getToken()
          } else {
            EventBus.emitHandler(false, res.data.message);
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, '取得資料錯誤');
          console.error(error)
        });
    },
    addToCart (id, qty = 1) {
      this.$store.dispatch('cart/ADD_TO_CART', { id, qty });
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
          EventBus.emitHandler(false, '取得資料錯誤')
          console.error(error)
        })
    },
    searchTracks () {
      if(this.album_id !=='') {
        searchTracks(this.config, this.album_id)
          .then( res => {
            if (res.data) {
              this.tracks = res.data.data ? res.data.data :[]
            }
          })
          .catch(error => {
            EventBus.emitHandler(false, '取得資料錯誤')
            console.error(error)
          })
      }
    },
    openTrack () {
      if (this.isOpen) {
        setTimeout(() => {
          this.isOpen = !this.isOpen
        }, 1000);
      }
      setTimeout(() => {
        this.track_id = this.album_id
      }, 1500);      
      setTimeout(() => {
        this.resizeIframeHeight()

        $('#MusicModal').modal('show')  
      },2000);     
    },
    closeTrack (e) {
      $('#MusicModal').modal('hide')
      this.track_id = '5_8O4H1Dg7hHJZ5NQy'  
    },
    resizeIframeHeight () {            
      let D = document
      let iframe = document.querySelector('#iframeID')
      iframe ? iframe.height = D.documentElement.clientHeight + 'px':iframe.height = null
    }
  },
  beforeRouteEnter (to, from, next) {
   next(vm => {
     vm.path=from.path
  })
  },
  created () {
    this.getProduct()
  }
};
</script>