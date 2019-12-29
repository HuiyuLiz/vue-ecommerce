<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <!-- <div class="background-cover" :style="{backgroundImage:`url(${product.imageUrl})`}"></div> -->
          <div class="h-75 w-75 bg-danger">
            <img class="img-fluid" :src="product.imageUrl" :alt="product.title" />
          </div>
        </div>
        <div class="col-md-5">
          <ul class="pl-0">
            <li class="text-secondary">{{product.category}}</li>
            <li class="text-secondary">
              <h1 class="h2">{{album}}</h1>
            </li>
            <li class="text-secondary border-bottom mt-3 small pb-2">建議售價</li>
            <li class="my-3">
              <span class="text-secondary">{{product.price|currency}}&emsp;&emsp;</span>
              <del class="text-muted">{{product.origin_price|currency}}</del>
            </li>
            <li class="text-muted mt-3 small">藝人</li>
            <li class="text-secondary">{{singer}}</li>
            <li class="text-muted mt-3 small">發行月份</li>
            <li class="text-secondary">{{product.description}}</li>
            <li class="text-danger font-weight-bold mt-3">HAPPY NEW YEAR．全館 88 折</li>
          </ul>
          <select name id v-model="product.num" class="form-control">
            <option :value="num" v-for="num in 10" :key="num">{{num}}{{product.unit}}</option>
          </select>
          <a
            href="javascript:;"
            class="btn btn-primary mt-3 btn-block"
            @click.prevent="addToCart(product.id,product.num)"
          >加入購物車</a>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 mt-3 mb-5">
          <div class="card text-center">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs">
                <li class="nav-item">
                  <a class="nav-link active" href="javascript:;">專輯介紹</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="javascript:;">專輯曲目</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link disabled"
                    href="javascript:;"
                    tabindex="-1"
                    aria-disabled="true"
                  >Disabled</a>
                </li>
              </ul>
            </div>
            <div class="card-body">
              <p class="card-text text-secondary h7" v-html="product.content"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProduct, addToCart } from "@/api/api";
import { EventBus } from "@/eventBus/eventBus";
export default {
  data() {
    return {
      product: {},
      singer:'',
      album:''
    };
  },

  methods: {
    getProduct() {
      let id = this.$route.params.id;
      this.$store.dispatch("loading/ASYNC_LOADING", true);
      getProduct(id)
        .then(res => {
          if (res.data.success) {
            this.product = res.data.product?res.data.product:{};
            this.singer=this.product?this.product.title.trim().split("/")[0]:''
            this.album=this.product?this.product.title.trim().split("/")[1]:''
            this.$store.dispatch("loading/ASYNC_LOADING", false);
          } else {
            EventBus.emitHandler(false, res.data.message);
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, "取得資料錯誤");
        });
    },
    addToCart(id, qty = 1) {
       this.$store.dispatch("ADD_TO_CART", { id, qty });
      // this.$store.dispatch("loading/ASYNC_LOADING", true);
      // let cart = {
      //   product_id: id,
      //   qty
      // };
      // addToCart({ data: cart })
      //   .then(res => {
      //     if (res.data.success) {
      //       this.$store.dispatch("loading/ASYNC_LOADING", false);
      //     } else {
      //       EventBus.emitHandler(false, res.data.message);
      //     }
      //   })
      //   .catch(error => {
      //     EventBus.emitHandler(false, "取得資料錯誤");
      //   });
    }
  },
  created() {
    this.getProduct();


}
};
</script>