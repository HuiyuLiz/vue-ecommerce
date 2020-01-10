<template>
  <div class="media mb-3 border-bottom align-items-center pb-3">
    <div class="col-3 p-0">
      <img
        class="img-fluid rounded d-none d-md-block"
        :src="track.album.images[0].url"
        :alt="track.name"
        style="width:80%"
      />
      <img
        class="img-fluid rounded d-block d-md-none"
        :src="track.album.images[0].url"
        :alt="track.name"
        style
      />
    </div>
    <div class="col-7">
      <div class="media-body">
        <div class="row align-items-start">
          <div class="col-md-1 mr-2">
            <span class="h5 mb-2 font-weight-bold">{{index+1}}</span>
          </div>
          <div class="col-md-10 d-flex flex-column">
            <span class="mb-2 font-weight-bold" :class="{'h5':track.name.length<25}">{{track.name}}</span>
            <span class="text-secondary">{{track.album.artist.name}}</span>
            <span class="small text-secondary">{{track.album.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2 text-center" @click="playSong(track.id)">
      <i class="material-icons material-icons-large">play_circle_outline</i>
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