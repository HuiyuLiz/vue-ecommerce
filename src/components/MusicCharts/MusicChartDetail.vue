<template>
  <div class="container-fluid">
    <!-- Modal -->
    <div class="track-modal">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="track-modal">
            <iframe
              :src="`https://widget.kkbox.com/v1/?id=${track_id}&type=playlist&terr=TW&lang=TC&autoplay=false`"
              allow="false"
              width="100%"
              height="800px"
              frameborder="0"
              class="p-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="track-modal">
      <div class="col-12 p-0 col-md-8"></div>
    </div>-->
    <button class="btn btn-primary" @click="isOpen=!isOpen">顯示音樂</button>
    <div id="playlist" class="playlist">
      <iframe
        :src="`https://widget.kkbox.com/v1/?id=${songID}&type=song&terr=TW&lang=TC`"
        allow="autoplay"
        width="100%"
        height="98"
        frameborder="0"
        class="p-0"
        :class="{'isOpen':isOpen,'isClose':!isOpen}"
        v-if="songID"
        ref="iframe"
      ></iframe>
    </div>

    <div class="container pb-5">
      <div class="row mb-5">
        <div class="col-md-6">
          <div v-if="images" class="d-flex justify-content-center justify-content-md-start">
            <img :src="images[0].url" alt />
          </div>
        </div>
        <div class="col-md-6">
          <div v-if="title" class="display-4 mb-3">{{title}}</div>
          <button class="btn btn-primary btn-block" @click="trackTrail">全部試聽</button>
        </div>
      </div>
      <div class="row pt-3 border-top pt-3 pb-6">
        <div class="col-md-6">
          <TrackItem
            v-for="(track,index) in limit_tracks_first"
            :key="track.id"
            :track="track"
            :index="index"
            @playSong="playSong"
          ></TrackItem>
        </div>
        <div class="col-md-6">
          <TrackItem
            v-for="(track,index) in limit_tracks_second"
            :key="track.id"
            :track="track"
            :index="index+20"
            class="border-bottom-none"
            @playSong="playSong"
          ></TrackItem>
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
      title:'',
      images:'',
      songID:'',
      isOpen:false
    }
  },
  watch: {
  },
  computed: {

    track_id () {
      return this.$route.params.chart_id
    },
    kkbox_token () {
      return this.$store.getters.kkbox_token ? this.$store.getters.kkbox_token : null
    },
    limit_tracks () {
      let tracks = this.tracks.filter((track,index)=> index < 40)
      return tracks
    },
    limit_tracks_first () {
      return this.limit_tracks.filter((track,index)=> index < 20)
    },
    limit_tracks_second () {
      return this.limit_tracks.filter((track,index)=> index >19 && index < 40)
    }
  },
  methods: {
    trackTrail (){
     
    },
    checkOffset () {
      let playlist = document.querySelector('.playlist')
      let footer =document.querySelector('.footer')
      let footerOffsetTop = document.querySelector('.footer').offsetTop
      playlist.style.position = 'absolute';
      if(window.scrollY + window.innerHeight <= footerOffsetTop) {
        playlist.style.position = 'fixed'
      }
    },    
    getChartList () {
      this.$store.dispatch('loading/ASYNC_LOADING', true)
      let config = {
        withCredentials: false,
        headers:{
          Authorization: `${this.kkbox_token}`
        }
      }
      let chart_id = this.$route.params.chart_id
      getChartList(config, chart_id)
        .then(res => {
          this.$store.dispatch('loading/ASYNC_LOADING', false)
          if(res.data) {
            res.data.tracks ? this.tracks = res.data.tracks.data : this.tracks = []
            res.data.title ? this.title = res.data.title : this.title = ''
            res.data.images ? this.images = res.data.images : this.images = ''           
          } else {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
         
        })
        .catch(error => {
          EventBus.emitHandler(false, '取得資料錯誤')
        })
       

    },
    playSong (id) {
      let playlist = document.querySelector('.playlist')
      playlist.style.position = 'fixed';
      if(!this.isOpen) {
       setTimeout(() => {
         this.isOpen = !this.isOpen
       }, 1000);
      }      
      this.songID = id
      console.log(id)
    
    }
  },
  created () {
    this.getChartList()  
    window.addEventListener('scroll',this.checkOffset)
  },
  mounted() {
    
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
  .media:nth-child(20).border-bottom-none {
    border-bottom-color: transparent !important;
  }
}
</style>

