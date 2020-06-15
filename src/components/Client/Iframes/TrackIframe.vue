<template>
  <div>
    <iframe
      id="iframeID"
      ref="iframe"
      :src="`https://widget.kkbox.com/v1/?id=${trackId}&type=album&terr=TW&lang=TC&autoplay=false`"
      frameborder="0"
      allow="autoplay"
      width="100%"
      class="d-block"
    />
  </div>
</template>
<script>
export default {
  name: 'TrackIframe',
  props: {
    trackId: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  }
}
</script>
