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
      page: 1,
      isLoading: false
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
        console.log(this.tempCoupon);
        createCoupon({ data: this.tempCoupon }).then(res => {
          this.dataResponse(res.data.success);
          EventBus.emitHandler(true, res.data.message);
        });
      } else {
        editCoupon({ data: this.tempCoupon }, this.tempCoupon.id).then(res => {
          this.dataResponse(res.data.success);
          EventBus.emitHandler(true, res.data.message);
        });
      }
    },
    getCouponList(page = 1) {
      this.isLoading = true;
      getCouponList(page).then(res => {
        if (res.data.success) {
          this.coupons = res.data.coupons;
          console.log("  this.coupons", this.coupons);
          this.pagination = res.data.pagination;
          this.$route.params.page = page;
          this.$router.push({ name: "couponList", params: { page: page } });
          this.isLoading = false;
        } else {
          EventBus.emitHandler(false, "取得優惠券失敗");
        }
      });
    },
    deleteCoupon(id) {
      deleteCoupon(id).then(res => {
        if (res.data.success) {
          this.tempCoupon = {};
          this.getCouponList();
          $("#delCouponModal").modal("hide");
          EventBus.emitHandler(true, res.data.message);
        }
      });
    }
  },
  created() {
    this.getCouponList();
  }
};
</script>