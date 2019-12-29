<template src="./template.html"></template>

<script>
import {
  createCoupon,
  getCouponList,
  editCoupon,
  deleteCoupon
} from "@/api/api";
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
  name: "CouponList",
  components: {
    Pagination
  },
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isNew: false,
      page: 1
    };
  },
  methods: {
    openModal(isNew, item) {
      $("#couponModal").modal("show");
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
      }
    },
    openDelModal(item) {
      this.tempCoupon = item;
      $("#delCouponModal").modal("show");
    },
    dataResponse(success) {
      if (success) {
        this.getCouponList();
        $("#couponModal").modal("hide");
      } else {
        EventBus.emitHandler(false, "新增優惠券失敗");
      }
    },
    createCoupon() {
      if (this.isNew) {
        createCoupon({ data: this.tempCoupon })
          .then(res => {
            this.dataResponse(res.data.success);
            EventBus.emitHandler(true, res.data.message);
          })
          .catch(error => {
            EventBus.emitHandler(false, "取得資料錯誤");
          });
      } else {
        editCoupon({ data: this.tempCoupon }, this.tempCoupon.id)
          .then(res => {
            this.dataResponse(res.data.success);
            EventBus.emitHandler(true, res.data.message);
          })
          .catch(error => {
            EventBus.emitHandler(false, "取得資料錯誤");
          });
      }
    },
    getCouponList(page = 1) {
      this.$store.dispatch("ASYNC_LOADING", true);
      getCouponList(page)
        .then(res => {
          if (res.data.success) {
            this.coupons = res.data.coupons;
            this.pagination = res.data.pagination;
            this.$route.params.page = page;
            this.$router.push({ name: "couponList", params: { page: page } });
            this.$store.dispatch("ASYNC_LOADING", false);
          } else {
            EventBus.emitHandler(false, "取得優惠券失敗");
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, "取得資料錯誤");
        });
    },
    deleteCoupon(id) {
      deleteCoupon(id)
        .then(res => {
          if (res.data.success) {
            this.tempCoupon = {};
            this.getCouponList();
            $("#delCouponModal").modal("hide");
            EventBus.emitHandler(true, res.data.message);
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, "取得資料錯誤");
        });
    }
  },
  created() {
    this.getCouponList();
  }
};
</script>