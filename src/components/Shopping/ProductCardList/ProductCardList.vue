<template src="./template.html"></template>
<script>
import { getShoppingList, addToCart } from "@/api/api";
import { EventBus } from "@/eventBus/eventBus";
export default {
  name: "ProductCardList",
  data() {
    return {
      products: [],
      pagination: {},
      page: 1,
      isLoading: false
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      getShoppingList(page).then(res => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.$route.params.page = page;
          this.$router.push({ name: "shopping_List", params: { page: page } });
          this.isLoading = false;
        } else {
          EventBus.emitHandler(false, "取得商品失敗");
        }
      });
    },
    selectProduct(id) {
      this.$router.push({ name: "shopping_product", params: { id: id } });
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
    this.getProducts();
  }
};
</script>