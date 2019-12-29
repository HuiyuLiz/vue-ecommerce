<template src="./template.html"></template>
<script>
import {
  getCartList,
  deleteFromCart,
  useCoupon,
  submitOrder,
  getOrderList,
  checkout,
  getPostal
} from "@/api/api";
import { EventBus } from "@/eventBus/eventBus";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { validate } from "vee-validate";
import postal from "../../../assets/postal";
import CartList from "../CartList/CartList";
import CartValidateItem from "./CartValidateItem";
import CartProgress from "../CartProgress/CartProgress";
export default {
  name: "CartComponent",
  components: {
    ValidationProvider,
    ValidationObserver,
    CartList,
    CartValidateItem,
    CartProgress
  },
  data() {
    return {
      isChangingPassword: false,
      isUse: true,
      message: "",
      carts: [],
      cart: [
        {
          final_total: "",
          total: ""
        }
      ],
      isOpen: false,
      coupon: "",
      userForm: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      isValid: false,
      index: {
        country: null,
        area: null
      },
      postal,
      step: 0
    };
  },
  computed: {
    countryIndex: {
      get() {
        return this.index.country;
      },
      set(val) {
        this.index.country = val;
        this.index.area = null;
        this.userForm.user.address = "";
      }
    },
    areaIndex: {
      get() {
        return this.index.area;
      },
      set(val) {
        this.index.area = val;
      }
    },
    currentCountry() {
      return this.index.country !== null
        ? this.postal[this.index.country]
        : null;
    },
    areas() {
      return this.currentCountry !== null ? this.currentCountry.children : [];
    },
    currentArea() {
      return this.index.area !== null ? this.areas[this.index.area].name : null;
    },
    currentCode() {
      return this.index.area !== null ? this.areas[this.index.area].code : null;
    },
    zone() {
      return (
        this.currentCode + " " + this.currentCountry.name + this.currentArea
      );
    }
  },
  methods: {
    getCartList() {
      this.$store.dispatch("loading/ASYNC_LOADING", true);
      getCartList()
        .then(res => {
          if (res.data.success) {
            this.carts = res.data.data.carts;
            [this.cart.final_total, this.cart.total] = [
              res.data.data.final_total,
              res.data.data.total
            ];
            this.$store.dispatch("loading/ASYNC_LOADING", false);
          } else {
            EventBus.emitHandler(false, "取得訂單失敗");
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, "取得資料錯誤");
        });
    },
    deleteFromCart(id) {
      this.$store.dispatch("ASYNC_LOADING", true);
      deleteFromCart(id)
        .then(res => {
          if (res.data.success) {
            this.getCartList();
            this.$store.dispatch("ASYNC_LOADING", false);
            EventBus.emitHandler(true, res.data.message);
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, "取得資料錯誤");
        });
    },
    useCoupon() {
      this.$store.dispatch("ASYNC_LOADING", true);
      let code = {
        code: this.coupon
      };
      useCoupon({ data: code })
        .then(res => {
          if (res.data.success) {
            this.getCartList();
            this.$store.dispatch("ASYNC_LOADING", false);
            this.isUse = true;
            this.message = res.data.message;
          } else {
            this.isUse = false;
            this.$store.dispatch("ASYNC_LOADING", false);
            this.message = res.data.message;
          }
        })
        .catch(error => {
          EventBus.emitHandler(false, "取得資料錯誤");
        });
    },
    async checkValid() {
      const isValid = await this.$refs.form.validate();
      this.isValid = isValid;
    },
    async submitOrder() {
      await this.checkValid();
      if (this.isValid) {
        this.userForm.user.address = this.zone + this.userForm.user.address;
        await submitOrder({ data: this.userForm })
          .then(res => {
            if (res.data.success) {
              this.$router.push({
                name: "checkout",
                params: { orderId: res.data.orderId }
              });
              this.isLoading = false;
              EventBus.emitHandler(true, res.data.message);
            } else {
              EventBus.emitHandler(false, res.data.message);
            }
          })
          .catch(error => {
            EventBus.emitHandler(false, "取得資料錯誤");
          });
      } else {
        this.isValid = false;
      }
    },
    selectZone() {
      this.$refs.zone.filter((item, index) => {
        if (!item.selected) return false;
        this.zone = item.value;
      });
    }
  },
  created() {
    this.getCartList();
  }
};
</script>
<style lang="scss" scpoped>
.card-body {
  margin-top: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.card-header {
  cursor: pointer;
}
</style>