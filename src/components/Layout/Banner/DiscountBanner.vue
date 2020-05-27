<template>
  <div class="background-cover h-75 w-100 mb-5 discount-banner">
    <div class="container">
      <div class="d-flex flex-column flex-md-row">
        <div class="col-md-6 d-flex align-items-center">
          <div class="d-flex align-items-center my-md-5 w-100">
            <div
              class="font-weight-bold mr-md-auto text-success py-5 title-font display-3"
            >New Opening</div>
            <div class="flex-grow-1 px-2 mb-3">
              <div class="line bg-success mt-2"></div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="pb-5 py-md-5 my-md-5 d-flex flex-column align-items-center">
            <div
              class="text-success font-weight-bold h5 d-flex flex-column flex-md-row align-items-center align-items-md-baseline justify-content-center"
            >
              <div class="mb-3 mb-md-0">
                購物輸入
                <span
                  class="border-2 border-success px-3 text-success title-font mr-md-4 h5 font-weight-bold py-1"
                >happy99</span>
              </div>
              <div>
                享
                <span class="display-3 font-weight-bold title-font">9</span> 折優惠
              </div>
            </div>
            <p class="font-weight-bold text-success h5 title-font">4/30 - 9/9</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiscountBanner'
}
</script>

<style>
</style>