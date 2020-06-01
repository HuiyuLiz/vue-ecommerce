<template>
  <div>
    <div
      class="col-md-8 background-cover d-none d-md-flex flex-md-column justify-content-center align-items-left overflow-hidden"
    >
      <img
        alt
        class="rounded-0 img-half"
        :src="randomProduct.imageUrl"
        v-scrollanimation
        data-delay="1s"
      />
      <div
        class="d-flex align-items-center mb-5 w-50 px-0 pt-3"
        v-if="randomProduct.title"
        v-scrollanimation
      >
        <small class="font-weight-bold text-dark">{{randomProduct.title.trim().split('/')[1]}}</small>
        <div class="flex-grow-1 px-2">
          <div class="line bg-dark"></div>
        </div>
        <small class="font-weight-bold text-dark">{{randomProduct.title.trim().split('/')[0]}}</small>
      </div>
    </div>
    <div class="col-md-4">
      <div class>
        <div class="d-flex align-items-center mb-3 my-md-5" v-scrollanimation data-delay="1s">
          <div class="flex-grow-1 px-2 d-none d-md-block">
            <div class="line bg-dark mt-2"></div>
          </div>
          <div class="display-3 font-weight-bold">{{randomProduct.category}}.</div>
        </div>
        <div class="p-md-5 offset-left grid-background" v-scrollanimation data-delay="1s">
          <img
            class="img-fluid d-flex d-md-none"
            :src="randomProduct.imageUrl"
            alt
            v-scrollanimation
          />
          <ul class="z-index-3 pl-0 mb-4 mt-4">
            <li
              class="text-dark d-flex align-items-center mb-2 h2 font-weight-bold"
              v-if="randomProduct.title"
              v-scrollanimation
            >{{randomProduct.title.trim().split('/')[1]}}</li>
            <li
              class="text-dark d-flex align-items-center mb-1 h5"
              v-if="randomProduct.title"
              v-scrollanimation
            >{{randomProduct.title.trim().split('/')[0]}}</li>
          </ul>
          <p v-if="randomProduct.content" v-scrollanimation>{{ellipsisContent}}</p>

          <div class="row mt-5" v-scrollanimation data-delay="1s">
            <div class="col-md-6 m-auto">
              <div class="d-flex mb-4" v-if="randomProduct.category">
                <router-link
                  class="btn btn-dark btn-block py-3 mt-0 d-flex rounded-0 align-items-center justify-content-center"
                  :to="{ name: 'shopping_product', params: { category: randomProduct.category , id: randomProduct.id } }"
                >查看更多</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'OffsetContent',
  props:{
    randomProduct:{
      type:Object,
      required:true,
      validator:function(obj) {
        let validProperty = Object.keys(obj).filter(property=>!obj.hasOwnProperty(property))
        return validProperty.length===0
      }
    }
  },
  computed: {
    RandomContent () {
      return this.randomProduct !== []?this.randomProduct.content:''
    },
    ellipsisContent () {
      let len = 120
      let str = this.RandomContent
      let subStr =str.length > len ? str.substring(0 , len) + '......' : str
      return this.RandomContent !== '' ? subStr : ''   
    }
  }
}
</script>

<style>
</style>