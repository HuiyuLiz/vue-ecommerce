<template>
  <div class="row justify-content-center mb-3">
    <div class="col-md-3" v-for="(p,index) in progress" :key="index">
      <div
        class="alert border text-secondary d-none d-md-flex justify-content-center"
        role="alert"
        :class="{'d-flex alert-secondary':step===index }"
      >{{p}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartProgress',
  props: {
    step: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      progress: ['1. 確認商品', '2. 填寫資料', '3. 完成訂購']
    }
  },
  computed: {
    
  },
  watch: {
    step (newVal, oldVal) {
     if(newVal !== oldVal) {
       this.scrollToTop()
     }
    }
  },
  methods: {
    scrollToTop () {
      window.scrollTo(0,0)
    }
  },
};
</script>

<style>
</style>