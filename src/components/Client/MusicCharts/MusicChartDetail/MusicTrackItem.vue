<template>
  <div class="media border-bottom align-items-center py-3 position-relative">
    <div class="col-2 col-md-3 p-0 d-flex align-items-center mr-3 mr-md-1">
      <span class="h5 mb-2 font-weight-bold mr-4 font-weight-bold d-none d-md-flex w-25 justify-content-center">{{ index+1 }}.</span>
      <img
        class="img-fluid d-none d-md-block w-50"
        :src="track.album.images[0].url"
        :alt="track.name">
      <img
        class="d-block d-md-none pr-1"
        :src="track.album.images[0].url"
        :alt="track.name"
        style="width: 70px">
    </div>
    <div class="col-7 px-0">
      <div class="media-body">
        <div class="d-flex align-items-start">
          <div class="col-11 d-flex flex-column ml-md-3 ml-2">
            <span
              class="mb-1 mb-md-2 font-weight-bold"
              :class="{'h5':track.name.length<20}">{{ track.name }}</span>
            <p
              class="text-secondary mb-0"
              :class="{'h7':track.album.artist.name.length<20}">
              {{ track.album.artist.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="col-3 text-center position-absolute play-icon pr-0"
      @click="playSong(track.id)">
      <i
        class="material-icons material-icons-large"
        :class="{'text-success':songId===track.id}">play_circle_outline</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MusicTrackItem',
  props: {
    songId: {
      type: String,
      required: true
    },
    track: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    playSong (id) {
      this.$emit('playSong', id)
    }
  }
}
</script>

<style >
.play-icon{
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
