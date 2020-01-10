<template>
  <div id="app">
    <!-- <iframe
      :src="`https://widget.kkbox.com/v1/?id=${track_id}&type=playlist&terr=TW&lang=TC&autoplay=false`"
      allow="autoplay"
      class="container-fluid"
      width="100%"
      height="600px"
      frameborder="0"
    ></iframe>-->
    <Loading
      :active.sync="isLoading"
      loader="bars"
      background-color="rgba(255, 255, 255, 0.75)"
      color="#52e3c7"
    ></Loading>
    <router-view name="Header" />
    <AlertEventBus></AlertEventBus>
    <router-view />
    <router-view name="Footer" />
  </div>
</template>

<script>
import AlertEventBus from "@/components/AlertEventBus/AlertEventBus";
import { mapState } from "vuex";
export default {
  components: {
    AlertEventBus,
  },
  computed: {
    ...mapState("loading", ["isLoading"])
  },
  methods: {
    getToken () {
      this.$store.dispatch('GET_KKBOX_TOKEN')
      // console.log( this.$store)
          
      // let OAuth  = {
      //   'grant_type': 'client_credentials',
      //   'client_id': process.env.VUE_APP_CLIENT_ID,
      //   'client_secret': process.env.VUE_APP_CLIENT_SECRET
      // }
      // this.$http.post('/token', qs.stringify(OAuth), {
      //   headers: {
      //     Access: 'application/x-www-form-urlencoded',
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // }).then(res => {
      //   res.data.access_token ? this.token = res.data.access_token : this.token = null
      //   res.data.token_type ? this.token_type = res.data.token_type : this.token_type = null
      //   console.log(OAuth)
        // let config = {
        //   withCredentials: false,
        //   headers:{
        //     Authorization: `${this.token_type} ${this.token}`
        //   }
        // }
        // this.$http.get('https://api.kkbox.com/v1.1/charts?territory=TW',config)
        //   .then(res=>console.log(res))
      // })
    },
  },
  created () {
    this.getToken()
  }
};
</script>

<style lang="scss">
@import 'assets/scss/all';
</style>

