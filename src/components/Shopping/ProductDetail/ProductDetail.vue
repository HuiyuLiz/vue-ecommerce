<template>
  <div class="container pt-3 pt-md-5 mt-3 pb-5">
    <!-- MusicModal -->
    <div
      class="modal slide-fade p-0"
      id="MusicModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="MusicModalTitle"
      aria-hidden="true"
      data-backdrop="static"
    >
      <div class="modal-dialog m-0 m-auto" role="document">
        <div class="modal-content">
          <button type="button" class="close position-absolute align-self-end pt-2 pr-3">
            <span aria-hidden="true" class="display-4" @click="closeTrack">&times;</span>
          </button>
          <iframe
            :src="`https://widget.kkbox.com/v1/?id=${track_id}&type=album&terr=TW&lang=TC&autoplay=false`"
            frameborder="0"
            allow="autoplay"
            id="iframeID"
            width="100%"
            ref="iframe"
          ></iframe>
        </div>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-md-6 mr-auto">
        <!-- <div class="background-cover" :style="{backgroundImage:`url(${product.imageUrl})`}"></div> -->
        <div class="d-none d-md-flex">
          <img class="img-fluid" :src="product.imageUrl" :alt="product.title" />
        </div>
      </div>
      <div class="col-md-6">
        <ul class="pl-0 mb-4">
          <li class="text-secondary d-flex align-items-center">
            <p class="mb-0">{{product.category}}</p>
          </li>
          <li class="text-dark mb-3">
            <h1 class="h2">{{album}}</h1>
          </li>
          <div class="h-100 w-100 d-flex d-md-none">
            <img class="img-fluid" :src="product.imageUrl" :alt="product.title" />
          </div>
          <li class="text-secondary border-bottom mt-3 small pb-2 d-flex align-items-center">
            建議售價
            <span class="text-white font-weight-bold badge badge-dark p-1 ml-1">全館 88 折</span>
          </li>
          <li class="my-3 border-bottom pb-3" v-if="product.price">
            <span class="text-danger h3 font-weight-bold">${{product.price}}&emsp;&emsp;</span>
            <del class="text-muted h3 font-weight-light">${{product.origin_price}}</del>
          </li>
          <li class="text-muted mt-3 small">藝人</li>
          <li class="text-secondary">{{singer}}</li>
          <li class="text-muted mt-3 small">發行月份</li>
          <li class="text-secondary">{{product.description}}</li>
        </ul>
        <select name id v-model="product.num" class="form-control">
          <option :value="num" v-for="num in 10" :key="num">{{num}}{{product.unit}}</option>
        </select>
        <div class="d-flex mt-4">
          <button class="btn btn-outline-dark btn-block py-3 w-50 mt-0 mr-3" @click="openTrack">專輯試聽</button>
          <button
            class="btn btn-dark btn-block py-3 w-50 ml-3 mt-0 d-flex align-items-center justify-content-center"
            @click.prevent="addToCart(product.id,product.num)"
          >
            <span>加入購物車</span>
            <i class="material-icons material-icons-middle ml-2">shopping_cart</i>
          </button>
        </div>
      </div>
    </div>
    <div class="row" style="min-height:450px;padding-bottom:140px">
      <div class="col-md-12 mt-3 mb-5">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active text-secondary"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >專輯介紹</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-secondary"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >專輯曲目</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-secondary"
              id="contact-tab"
              data-toggle="tab"
              href="#contact"
              role="tab"
              aria-controls="contact"
              aria-selected="false"
            >購物說明</a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div class="my-3 p-3">
              <p
                class="card-text text-dark text-justify h7"
                v-if="product.content"
                v-html="content"
              ></p>
            </div>
          </div>
          <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <table class="table mt-3">
              <thead>
                <tr class="text-secondary">
                  <th scope="col" class="border-top-0">#</th>
                  <th scope="col" class="border-top-0">標題</th>
                  <th scope="col" class="border-top-0 text-center">
                    <div class="d-none d-md-flex text-center">藝人</div>
                  </th>
                  <th scope="col" class="border-top-0 text-center">
                    <i class="material-icons align-middle">access_time</i>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-secondary" v-for="(track,index) in tracks" :key="track.name">
                  <th scope="row" class="align-middle text-dark">
                    <p class="mb-0">{{index+1}}</p>
                  </th>
                  <td class="align-middle text-dark">
                    <p class="mb-0 font-weight-bold">{{track.name}}</p>
                  </td>
                  <td class="text-dark text-center">
                    <div class="d-none d-md-flex text-center text-secondary">
                      <p class="mb-0">{{singer}}</p>
                    </div>
                  </td>
                  <td class="align-middle text-center text-dark">
                    <p class="mb-0">{{track.duration |trackDuration}}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
            <div class="my-3 p-3">
              <p
                class="card-text text-dark h7"
              >使用電腦播放程式請留意：CD曲目的編排是否正確，將視您所使用之播放程式其串連的媒體資料庫所提供的資訊而定。若播放程式所顯示的專輯資訊內容與實際商品有出入，此非商品本身問題，請您可手動更新程式或向程式管理人員反應。</p>
              <p class="card-text text-dark h7">限量商品購買提醒：因數量有限，若庫存不足時，將無法提供換貨，敬請包涵見諒。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProduct } from '@/api/api';
import { searchAlbum ,searchTracks } from '@/api/kkbox';
import { EventBus } from '@/eventBus/eventBus';
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
    };
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
  created () {
    this.getProduct()
  }
};
</script>