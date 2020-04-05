<template>
  <div class="row justify-content-center mb-3">
    <div class="col-md-3">
      <div
        class="alert border text-secondary d-none d-md-flex justify-content-center"
        role="alert"
        :class="{'d-flex alert-secondary':step===0 }"
      >1. 確認商品</div>
    </div>
    <div class="col-md-3">
      <div
        class="alert border text-secondary d-none d-md-flex justify-content-center"
        role="alert"
        :class="{'d-flex alert-secondary':step===1 }"
      >2. 填寫資料</div>
    </div>
    <div class="col-md-3">
      <div
        class="alert border text-secondary d-none d-md-flex justify-content-center"
        role="alert"
        :class="{'d-flex alert-secondary':step===2 }"
      >3. 完成訂購</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartProgress",
  props: {
    step: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
</style>