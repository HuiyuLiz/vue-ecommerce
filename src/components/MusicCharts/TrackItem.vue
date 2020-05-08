<template>
  <div class="media mb-3 border-bottom align-items-center pb-3">
    <div class="col-2 col-md-3 p-0 d-flex align-items-center mr-auto">
      <span class="h3 mb-2 font-weight-bold mr-4 title-font">{{index+1}}</span>
      <img
        class="img-fluid d-none d-md-block w-50"
        :src="track.album.images[0].url"
        :alt="track.name"
      />
      <img
        class="img-fluid d-block d-md-none"
        :src="track.album.images[0].url"
        :alt="track.name"
        style
      />
    </div>
    <div class="col-7">
      <div class="media-body">
        <div class="row align-items-start">
          <div class="col-12 d-flex flex-column ml-3">
            <span class="small text-secondary d-none d-md-flex">{{track.album.name}}</span>
            <span class="mb-2 font-weight-bold" :class="{'h5':track.name.length<20}">{{track.name}}</span>
            <p
              class="text-secondary mb-0"
              :class="{'h7':track.album.artist.name.length<20}"
            >{{track.album.artist.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2 text-center" @click="playSong(track.id)">
      <i class="material-icons material-icons-large text-dark">play_circle_outline</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrackItem',
  props:{
    track:{
      type:Object,
      required:true,
    },
    index:{
      type:Number,
      required:true
    }
  },
  methods: {
    playSong (id) {
      this.$emit('playSong',id)
    }
  },
}
</script>

<style>
</style>