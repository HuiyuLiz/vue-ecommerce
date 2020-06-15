<template>
  <div>
    <iframe
      id="playSong"
      ref="playSong"
      :src="`https://widget.kkbox.com/v1/?id=${songId}&type=song&terr=TW&lang=TC&autoplay=true`"
      allow="autoplay"
      autoplay="true"
      width="100%"
      frameborder="0"
      class="p-0"
      :class="{'isOpen':isOpen,'isClose':!isOpen}"
    />
  </div>
</template>
<script>
export default {
  name: 'SongIframe',
  props: {
    songId: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {

    }
  }
}
</script>
