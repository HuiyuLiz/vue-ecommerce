<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <h2>Detail</h2>
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div
            class="background-cover"
            style="width:100%;height:600px"
            :style="{backgroundImage:`url(${product.imageUrl})`}"
          ></div>
        </div>
        <div class="col-md-6">
          <ul>
            <li>{{product.category}}</li>
            <li>{{product.content}}</li>
            <li>{{product.description}}</li>
            <li>{{product.origin_price}}</li>
            <li>{{product.price}}</li>
            <li>{{product.title}}</li>
            <li>{{product.unit}}</li>
          </ul>
          <select name id v-model="product.num">
            <option :value="num" v-for="num in 10" :key="num">{{num}}{{product.unit}}</option>
          </select>
          <a
            href="#"
            class="ml-5 btn btn-primary"
            @click.prevent="addToCart(product.id,product.num)"
          >加入購物車</a>
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
      isLoading: false
    };
  },

  methods: {
    getProduct() {
      let id = this.$route.params.id;
      this.isLoading = true;
      getProduct(id).then(res => {
        if (res.data.success) {
          this.product = res.data.product;
          this.isLoading = false;
        } else {
          EventBus.emitHandler(false, res.data.message);
        }
      });
      console.log(this.product);
    },
    addToCart(id, qty = 1) {
      this.isLoading = true;
      let cart = {
        product_id: id,
        qty
      };
      addToCart({ data: cart }).then(res => {
        if (res.data.success) {
          this.isLoading = false;
        } else {
          EventBus.emitHandler(false, res.data.message);
        }
      });
    }
  },
  created() {
    this.getProduct();
  }
};
</script>