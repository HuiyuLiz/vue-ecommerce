<template>
  <div
    id="carouselControls"
    class="carousel slide banner"
    data-ride="carousel">
    <ol class="carousel-indicators">
      <li
        data-target="#carouselControls"
        data-slide-to="0"
        class="active" />
      <li
        data-target="#carouselControls"
        data-slide-to="1" />
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item carousel-item-min-height active">
        <div class="carousel-caption">
          <h1 class="display-2 text-white font-weight-bold text-left">
            華語流行榜
          </h1>
          <h5 class="text-white mt-2 text-left h5 mb-3">
            本周最新華語單曲，嚴選百首最新熱門單曲免費聽。
          </h5>
          <div class="row px-md-4">
            <div class="btn-max-width ">
              <router-link
                :to="{name:'MusicChartDetail', params:{ chart_title: '華語單曲日榜' },query:{chart_id: 'HYbr2eYrXtNOaWIKmZ' }}"
                class="my-4 btn btn-outline-light btn-block py-3 mt-0 font-weight-bold rounded-0 d-flex align-items-center justify-content-center">
                <span class="ml-3">立即前往</span>
                <span class="material-icons ml-3">navigate_next</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-item carousel-item-min-height">
        <div class="carousel-caption">
          <h1 class="display-2 text-white text-left font-weight-bold">
            電子單曲週榜
          </h1>
          <h5 class="text-white mt-2 text-left h5 mb-3">
            百大 DJ 最新單曲，豐富電子音樂打造你的音樂世界。
          </h5>
          <div class="row px-md-4">
            <div class="btn-max-width ">
              <router-link
                :to="{name:'MusicChartDetail', params:{ chart_title: '電子單曲週榜' },query:{chart_id: 'PZmd10J-MWFJpBUcMk' }}"
                class="my-4 btn btn-outline-light btn-block py-3 mt-0 font-weight-bold rounded-0 d-flex align-items-center justify-content-center">
                <span class="ml-3">立即前往</span>
                <span class="material-icons ml-3">navigate_next</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselControls"
      role="button"
      data-slide="prev">
      <span
        class="carousel-control-icon"
        aria-hidden="true" />
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselControls"
      role="button"
      data-slide="next">
      <span
        class="carousel-control-icon rotate"
        aria-hidden="true" />
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'BannerCarousel',
  data () {
    return {

    }
  }

}
</script>

<style>
</style>
