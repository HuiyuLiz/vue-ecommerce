<template>
  <div>
    <iframe
      id="iframeID"
      ref="iframe"
      :src="`https://widget.kkbox.com/v1/?id=${trackId}&type=playlist&terr=TW&lang=TC&autoplay=false`"
      frameborder="0"
      allow="autoplay"
      width="100%"
    />
  </div>
</template>
<script>
export default {
  name: 'PlayListIframe',
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
