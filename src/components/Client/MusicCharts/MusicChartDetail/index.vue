<template>
  <div class="container-fluid pt-3 pt-md-5 mt-3 pb-5 background-cover min-height">
    <HistoryBackButton :last-path="{name:'MusicCharts'}" />
    <div
      v-if="images"
      class="blur-background d-none d-md-block">
      <img
        alt
        class="rounded-0 img-object-fit position-absolute"
        :src="images[1].url">
    </div>
    <!-- MusicModal -->
    <div
      v-if="trackId!==null"
      id="MusicModal"
      class="modal slide-fade p-0 align-items-center justify-content-center"
      tabindex="-1"
      role="dialog"
      aria-labelledby="MusicModalTitle"
      aria-hidden="true"
      data-backdrop="static">
      <div
        class="modal-dialog modal-dialog-center m-0 d-flex justify-content-center align-items-center w-100 m-md-auto align-middle"
        role="document">
        <div
          class="modal-content">
          <button
            type="button"
            class="close position-absolute align-self-end pt-2 pr-3">
            <span
              aria-hidden="true"
              class="display-4"
              @click="closeTrack">&times;</span>
          </button>
          <PlayListIframe :track-id="trackId" />
        </div>
      </div>
    </div>

    <!-- Playlist -->
    <div
      id="playlist"
      class="playlist">
      <SongIframe
        v-if="songId!==''"
        :song-id="songId"
        :is-open="isOpen" />
    </div>

    <div
      v-if="tracks.length>0"
      class="container pb-5">
      <div class="row mb-5 mt-md-5 pt-md-3">
        <div
          class="col-md-12 mr-auto background-cover d-none d-md-flex flex-md-column justify-content-center align-items-left overflow-hidden" />
        <div
          v-scrollanimation
          class="col-md-8 m-auto">
          <div class>
            <div class="d-none d-md-flex align-items-center">
              <div class="flex-grow-1 pr-2 d-none d-md-block">
                <div class="line bg-light mb-2 opacity-75" />
              </div>
              <div class="h5 text-light font-weight-bold opacity-75">
                Hot Topic
              </div>
            </div>
            <div class="p-md-5 bg-white">
              <router-link
                :to="{name:'MusicCharts'}"
                class="text-success font-weight-bold d-flex d-md-none">
                音樂情報
              </router-link>
              <div
                v-if="title"
                class="h2 mb-3 d-flex d-md-none mt-2 font-weight-bold">
                {{ title }}
              </div>
              <div class="d-flex d-md-none mb-3">
                <img
                  class="img-fluid d-flex d-md-none"
                  :src="images[1].url"
                  alt>
              </div>

              <ul class="z-index-3 pl-0 mb-4 mt-4">
                <router-link
                  :to="{name:'MusicCharts'}"
                  class="text-success font-weight-bold d-none d-md-flex">
                  音樂情報
                </router-link>
                <li
                  v-if="title"
                  class="text-dark align-items-center mb-2 h2 font-weight-bold mt-2 d-none d-md-flex">
                  {{ title }}
                </li>
              </ul>
              <p>排行榜計算說明：人氣排行榜計算方式：依照全體會員每日透過撥放軟體（含Web Player）播放歌曲的有效點播次數分類排序，當日顯示資料為前一日的統計結果。 有效點播次數：每位會員聽歌時，一首歌須聽完全曲，才計算為一次。</p>

              <div class="row mt-5">
                <div class="btn-max-width  m-auto ">
                  <div class="d-flex mb-4">
                    <CustomButton
                      class
                      custom-class="btn-dark"
                      text="全部試聽"
                      @click.native="openTrack" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row align-items-center mb-3">
        <div class="col-md-6 text-center d-none d-md-flex">
          <h5 class="font-weight-bold h5">
            排名
          </h5>
        </div>
        <div class="col-md-6 text-center d-block d-md-none mb-3">
          <h3 class="font-weight-bold h3">
            排名
          </h3>
        </div>
        <div class="col-md-4 ml-auto">
          <div class="d-flex justify-content-center justify-content-md-end align-items-center">
            <div
              class="align-center"
              @click="getPrevTrack">
              <i class="material-icons material-icons-middle text-secondary">keyboard_arrow_left</i>
            </div>
            <p class="text-secondary h6 text-center mx-3 w-50">
              第 {{ limit_array }} 名
            </p>
            <div
              class="align-center"
              @click="getNextTrack">
              <i class="material-icons material-icons-middle text-secondary">keyboard_arrow_right</i>
            </div>
          </div>
        </div>
      </div>

      <div
        class="row border-top pb-3 pb-md-5 min-height d-flex justify-content-center"
        :class="{'slide-fade-enter':isChange,'slide-fade-enter-active':!isChange}">
        <div class="col-md-6 pr-md-5 justify-content-between">
          <MusicTrackItem
            v-for="(track,index) in limit_tracks_first"
            :key="track.id"
            :track="track"
            :index="index+paging.offset"
            :song-id="songId"
            @playSong="playSong" />
        </div>
        <div class="col-md-6 pl-md-5  justify-content-between">
          <MusicTrackItem
            v-for="(track,index) in limit_tracks_second"
            :key="track.id"
            :track="track"
            :index="index+paging.offset+limit_tracks_first.length"
            class="border-bottom-none"
            :song-id="songId"
            @playSong="playSong" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/eventBus/eventBus'
import { getChartList } from '@/api/kkbox'
import MusicTrackItem from './MusicTrackItem'
import $ from 'jquery'
import PlayListIframe from '@/components/Client/Iframes/PlayListIframe'
import SongIframe from '@/components/Client/Iframes/SongIframe'
import CustomButton from '@/components/UIComponents/Button/CustomButton'
import HistoryBackButton from '@/components/UIComponents/Button/HistoryBackButton'
export default {
  name: 'MusicChartDetail',
  components: {
    MusicTrackItem,
    SongIframe,
    PlayListIframe,
    CustomButton,
    HistoryBackButton
  },
  data () {
    return {
      tracks: [],
      images: '',
      songId: '',
      isOpen: false,
      trackId: null,
      autoplay: false,
      isChange: false,
      total: 0,
      paging: { },
      breakPoint: 768,
      clientWidth: null,
      clientHeight: null
    }
  },
  computed: {
    limit_tracks_first () {
      return this.tracks.filter((track, index) => index < this.tracks.length / 2)
    },
    limit_tracks_second () {
      return this.tracks.filter((track, index) => index >= this.tracks.length / 2 && index <= this.tracks.length)
    },
    kkbox_token () {
      return this.$store.getters['kkbox/kkbox_token']
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
  created () {
    let iframe = document.querySelector('#iframeID')
    if (iframe) {
      this.resizeIframeHeight()
      window.addEventListener('resize', this.resizeIframeHeight)
    }
    window.addEventListener('scroll', this.checkOffset)
    this.getToken()
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getClientWidth)
      this.getClientWidth()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeIframeHeight)
    window.removeEventListener('scroll', this.checkOffset)
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
    openTrack () {
      if (this.isOpen) {
        setTimeout(() => {
          this.isOpen = !this.isOpen
          this.songId = ''
        }, 1000)
      }
      setTimeout(() => {
        this.trackId = this.chart_id
      }, 1500)
      setTimeout(() => {
        this.resizeIframeHeight()
        $('#MusicModal').modal('show')
      }, 2000)
    },
    closeTrack (e) {
      $('#MusicModal').modal('hide')
      this.trackId = null
    },
    resizeIframeHeight () {
      let iframe = document.querySelector('#iframeID')
      iframe ? iframe.height = this.clientHeight + 'px' : iframe.height = null
    },
    checkOffset () {
      let playlist = document.querySelector('.playlist')
      let footer = document.querySelector('.footer')
      let footerOffsetTop = footer.offsetTop
      playlist ? playlist.style.position = 'absolute' : playlist.style.position = null
      if (window.scrollY + window.innerHeight <= footerOffsetTop) {
        playlist.style.position = 'fixed'
      }
    },
    async getToken () {
      await this.$store.dispatch('kkbox/GET_KKBOX_TOKEN')
      await this.getChartList()
    },
    getPagingApi (paging) {
      let config = {
        headers: {
          Authorization: `${this.kkbox_token}`
        }
      }
      if (paging === null) return false
      this.isChange = true
      this.$http.get(paging, config)
        .then(res => {
          this.$store.commit('loading/loading_status', false)
          if (res.data.data) {
            res.data.data ? this.tracks = res.data.data : this.tracks = []
            res.data.pagin !== null ? this.paging = res.data.paging : this.paging = null
            this.isChange = false
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
    getChartList () {
      this.$store.commit('loading/loading_status', true)
      let config = {
        headers: {
          Authorization: `${this.kkbox_token}`
        }
      }
      getChartList(config, this.chart_id)
        .then(res => {
          this.$store.commit('loading/loading_status', false)
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
          if (error || error instanceof ReferenceError) {
            EventBus.emitHandler(false, '取得資料錯誤')
          }
        })
    },
    getPrevTrack (paging) {
      this.getPagingApi(this.paging.previous)
    },
    getNextTrack () {
      this.getPagingApi(this.paging.next)
    },
    playSong (id) {
      this.songId = id
      let playlist = document.querySelector('.playlist')
      playlist.style.position = 'fixed'
      this.checkOffset()
      if (!this.isOpen) {
        setTimeout(() => {
          this.isOpen = !this.isOpen
        }, 1000)
      }
    }
  }
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
</style>
