<template>
  <div class="container-fluid pt-3 pt-md-5 mt-3 pb-5">
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
            :src="`https://widget.kkbox.com/v1/?id=${track_id}&type=playlist&terr=TW&lang=TC&autoplay=false`"
            frameborder="0"
            allow="autoplay"
            id="iframeID"
            width="100%"
            ref="iframe"
          ></iframe>
        </div>
      </div>
    </div>

    <div id="playlist" class="playlist">
      <iframe
        :src="`https://widget.kkbox.com/v1/?id=${songID}&type=song&terr=TW&lang=TC&autoplay=true`"
        allow="autoplay"
        autoplay="true"
        width="100%"
        frameborder="0"
        class="p-0"
        :class="{'isOpen':isOpen,'isClose':!isOpen}"
        ref="playSong"
        id="playSong"
        v-if="songID!==null"
      ></iframe>
    </div>
    <div class="row">
      <div class="container pb-5" v-if="tracks.length>0">
        <div class="row mb-5">
          <div class="col-md-4 mr-auto">
            <div class="d-none d-md-flex">
              <img :src="images[1].url" alt class="img-fluid" />
            </div>
          </div>
          <div class="col-md-8">
            <div>
              <div v-if="title" class="display-4 mb-5 d-none d-md-flex">{{title}}</div>
              <div v-if="title" class="h2 mb-3 d-flex d-md-none">{{title}}</div>
              <div class="d-flex d-md-none mb-3">
                <img :src="images[1].url" alt class="img-fluid" />
              </div>
              <div class="border py-3 px-3">
                <h5 class="mb-2 h5 text-secondary">排行榜計算說明：</h5>
                <p class="mb-0">依據會員在特定期間完整聆聽歌曲的有效點播總次數排序而成，並由系統自動定期更新。</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-5">
                <button
                  class="btn btn-dark btn-block py-3 d-flex align-items-center justify-content-center mt-5"
                  @click="openTrack"
                >全部試聽</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row align-items-center mb-3">
          <div class="col-md-6 text-center d-none d-md-flex">
            <h5 class="font-weight-bold h5">排名</h5>
          </div>
          <div class="col-md-6 text-center d-block d-md-none mb-3">
            <h3 class="font-weight-bold h3">排名</h3>
          </div>
          <div class="col-md-4 ml-auto">
            <div class="d-flex justify-content-center align-items-center">
              <div class="align-center" @click="getPrevTrack">
                <i class="material-icons material-icons-middle text-secondary">fast_rewind</i>
              </div>
              <p class="text-secondary h6 text-center mx-3 w-50">顯示 {{limit_array}} 筆資料</p>
              <div class="align-center" @click="getNextTrack">
                <i class="material-icons material-icons-middle text-secondary">fast_forward</i>
              </div>
            </div>
          </div>
        </div>

        <div
          class="row pt-3 border-top pb-3 pb-md-5"
          style="min-height:500px"
          :class="{'slide-fade-enter':isChange,'slide-fade-enter-active':!isChange}"
        >
          <div class="col-md-6 justify-content-between">
            <TrackItem
              v-for="(track,index) in limit_tracks_first"
              :key="track.id"
              :track="track"
              :index="index+paging.offset"
              @playSong="playSong"
            ></TrackItem>
          </div>
          <div class="col-md-6 justify-content-between">
            <TrackItem
              v-for="(track,index) in limit_tracks_second"
              :key="track.id"
              :track="track"
              :index="index+paging.offset+limit_tracks_first.length"
              class="border-bottom-none"
              @playSong="playSong"
            ></TrackItem>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { EventBus } from '@/eventBus/eventBus'
import { getChartList } from '@/api/kkbox';
import TrackItem from './TrackItem'
import $ from 'jquery'
export default {
  name:'MusicChartDetail',
  components:{
    TrackItem
  },
  data () {
    return {
      tracks:[],
      images:'',
      songID:null,
      isOpen:false,
      track_id:'5_8O4H1Dg7hHJZ5NQy',
      autoplay:false,
      isChange:false,
      total:0,
      paging:{

      },
      currentLength:history.length,
    }
  },
  computed: {
    limit_tracks_first () {
      return this.tracks.filter((track,index)=> index < this.tracks.length / 2)
    },
    limit_tracks_second () {
      return this.tracks.filter((track,index)=> index >=this.tracks.length / 2 && index <= this.tracks.length)
    },
    kkbox_token () {
      return this.$store.getters.kkbox_token
    },
    chart_id () { 
      return this.$route.query.chart_id
    },
    title () {
      return this.$route.params.chart_title
    },
    limit_array () {
      let nextNum
      this.paging.next !== null ? nextNum = parseInt(this.paging.limit + this.paging.offset) : nextNum = this.total
      return parseInt(this.paging.offset + 1) + ' - ' + nextNum
    }
  },
  methods: {
    openTrack () {
      if (this.isOpen) {
        setTimeout(() => {
          this.isOpen = !this.isOpen
          this.songID = null
        }, 1000);
      }
      setTimeout(() => {
        this.track_id = this.chart_id
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
    },
    checkOffset () {
      let playlist = document.querySelector('.playlist')
      let footer = document.querySelector('.footer')
      let footerOffsetTop =footer.offsetTop
      playlist ? playlist.style.position = 'absolute' : playlist.style.position = null;
      if (window.scrollY + window.innerHeight <= footerOffsetTop) {
        playlist.style.position = 'fixed'
      }
    },
    async getToken () {
      await this.$store.dispatch('GET_KKBOX_TOKEN')
      await this.getChartList()
    },
    getPagingApi (paging) {
      let config = {
        withCredentials: false,
        headers:{
          Authorization: `${this.kkbox_token}`
        }
      }         
      if(paging === null)return false
      this.isChange = true  
      this.$http.get(paging,config)
        .then(res => {
          this.$store.commit('loading/loading_status', false);
          if (res.data.data) {
            res.data.data ? this.tracks = res.data.data : this.tracks = []
            res.data.pagin !== null ? this.paging = res.data.paging : this.paging = null
            this.isChange = false
          } else {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, '取得資料錯誤')
          console.error(error)
        })
    },  
    getChartList () {
      this.$store.commit('loading/loading_status', true);
      let config = {
        withCredentials: false,
        headers:{
          Authorization: `${this.kkbox_token}`
        }
      }      
      getChartList(config, this.chart_id)
        .then(res => {
          this.$store.commit('loading/loading_status', false);
          if (res.data.data) {
            res.data.data ? this.tracks = res.data.data : this.tracks = []
            this.tracks[0].album.images ? this.images = this.tracks[0].album.images : this.images = ''
            res.data.pagin !== null ? this.paging = res.data.paging : this.paging = null   
            this.total = res.data.summary.total
          } else {
            EventBus.emitHandler(false, '取得資料錯誤')
          }         
        })
        .catch(error => {
          EventBus.emitHandler(false, '取得資料錯誤')
          console.error(error)
        })
    },    
    getPrevTrack (paging) {
      this.getPagingApi(this.paging.previous)
    },
    getNextTrack () {
      this.getPagingApi(this.paging.next)            
    },
    playSong (id) {
      this.songID =id
      let playlist = document.querySelector('.playlist')
      playlist.style.position = 'fixed';
      this.checkOffset()
      if(!this.isOpen) {
        setTimeout(() => {
          this.isOpen = !this.isOpen
        }, 1000);
      }    
    }
  },
  created () {
    let iframe = document.querySelector('#iframeID')
    if(iframe) {
      this.resizeIframeHeight()
      window.addEventListener('resize',this.resizeIframeHeight)      
    }
    window.addEventListener('scroll',this.checkOffset)
    this.getToken()
  },

  destroyed () {
    window.removeEventListener('resize', this.resizeIframeHeight);
    window.removeEventListener('scroll',this.checkOffset)
  },
}
</script>
<style lang="scss" scoped>
.isOpen {
  transition: all 0.5s ease-in;
  transform: translateY(0px);
}
.isClose {
  transition: all 0.5s ease-in;
  transform: translateY(120px);
}
.media:last-child.border-bottom {
  border-bottom-color: transparent !important;
}
@media (max-width: 768px) {
  .media:last-child.border-bottom {
    border-bottom-color: #dee2e6 !important;
  }
  .media:nth-child(12).border-bottom-none {
    border-bottom-color: transparent !important;
  }
}
.smallPlay {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
}
.model-bg {
  background-color: #00251a;
  color: #69f0ae;
}
.iframe {
  width: 100%;
  height: 500px;
}
.modal-body {
  padding: 0px;
}
.iframe-hideborder {
  margin: -6px;
}
</style>

