<template>
  <div>
    <iframe
      :src="`https://widget.kkbox.com/v1/?id=${trackId}&type=album&terr=TW&lang=TC&autoplay=false`"
      frameborder="0"
      allow="autoplay"
      id="iframeID"
      width="100%"
      ref="iframe"
    ></iframe>
  </div>
</template>
<script>
export default {
  name:'TrackIframe',
  props:{
    trackId:{
      type: String,
      required: true
    }
  }
}
</script>