<template>
  <footer class="footer d-flex align-items-center">
    <div class="container text-left">
      <div class="row">
        <div class="col-md-4">
          <div class="h6 text-light mb-4 d-flex d-md-none font-weight-bold">
            <a
              class="h6 text-light font-weight-bold"
              target="_blank"
              href="https://github.com/HuiyuLiz/vue-ecommerce"
            >About</a> &nbsp; |&nbsp;
            <a
              class="h6 text-light font-weight-bold"
              target="_blank"
              href="https://github.com/HuiyuLiz"
            >GitHub</a>
          </div>
          <div class="h6 text-light font-weight-bold">Zhongping Rd., Xinzhuang Dist.,</div>
          <div class="h6 text-light mb-4 font-weight-bold">New Taipei City 242</div>
          <small class="text-light">© {{year}} Geyao Sandwich | All rights reserved.</small>
        </div>
        <div class="col-md-4 d-none d-md-flex justify-content-center">
          <a
            class="h6 text-light font-weight-bold"
            target="_blank"
            href="https://github.com/HuiyuLiz/vue-ecommerce"
          >About</a>
        </div>
        <div class="col-md-4 d-none d-md-flex justify-content-center">
          <a
            class="h6 text-light font-weight-bold"
            target="_blank"
            href="https://github.com/HuiyuLiz"
          >GitHub</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    year () {
      let d = new Date()
      return d.getFullYear()
    }
  },
};
</script>

<style scoped>
</style>