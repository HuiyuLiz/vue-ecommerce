<template src="./template.html"></template>

<script>
import {
  getProductList,
  createProduct,
  editProduct,
  deleteProduct,
  uploadFile,
  getProductListAll
} from "@/api/api";
import $ from "jquery";
import Pagination from "@/components/Pagination/Pagination";
import { EventBus } from "@/eventBus/eventBus";

export default {
  name: "ProductList",
  components: {
    Pagination
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      isNew: false,
      page: 1,
      isLoading: true,
      fileUploadLoading: false
    };
  },
  methods: {
    openModal(isNew, item) {
      $("#productModal").modal("show");
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
    },
    openDelModal(item) {
      this.tempProduct = item;
      $("#delProductModal").modal("show");
    },
    dataResponse(success) {
      if (success) {
        this.getProducts();
        $("#productModal").modal("hide");
      } else {
        EventBus.emitHandler(false, "新增商品失敗");
      }
    },

    createProduct() {
      if (this.isNew) {
        createProduct({ data: this.tempProduct }).then(res => {
          this.dataResponse(res.data.success);
          EventBus.emitHandler(true, res.data.message);
        });
      } else {
        editProduct({ data: this.tempProduct }, this.tempProduct.id).then(
          res => {
            this.dataResponse(res.data.success);
            EventBus.emitHandler(true, res.data.message);
          }
        );
      }
    },
    getProductListAll() {
      getProductListAll().then(res => {
        // console.log("all", res.data.products);
      });
    },
    getProducts(page = 1) {
      this.isLoading = true;
      getProductList(page).then(res => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.$route.params.page = page;
          this.$router.push({ name: "productList", params: { page: page } });
          this.isLoading = false;
        } else {
          EventBus.emitHandler(false, "取得商品失敗");
        }
      });
    },
    deleteProduct(id) {
      deleteProduct(id).then(res => {
        if (res.data.success) {
          EventBus.emitHandler(true, res.data.message);
          this.tempProduct = {};
          this.getProducts();
          $("#delProductModal").modal("hide");
        } else {
          EventBus.emitHandler(false, res.data.message);
        }
      });
    },
    uploadFile() {
      this.fileUploadLoading = true;
      let file = this.$refs.files.files[0];
      let formData = new FormData();
      formData.append("file-to-upload", file);
      let config = {
        headers: {
          "Content-type": "multipart/form-data"
        }
      };
      uploadFile(formData, config).then(res => {
        if (res.data.success) {
          this.tempProduct.imageUrl = res.data.imageUrl;
          this.$set(this.tempProduct, this.tempProduct.imageUrl);
          this.fileUploadLoading = false;
        } else {
          EventBus.emitHandler(false, res.data.message);
          this.fileUploadLoading = false;
        }
      });
    }
  },
  created() {
    this.getProducts();
  },
  watch: {
    $route(router) {
      let page = parseInt(router.params.page);
      console.log("page", page);
      getProductList(page).then(res => {
        if (res.data.success) {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.$route.params.page = page;
          this.$router.push({ name: "productList", params: { page: page } });
        } else {
          EventBus.emitHandler(false, "取得商品失敗");
        }
      });
    }
  }
};
</script>