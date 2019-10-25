<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <!-- 選購產品及加入購物車 -->
    <div class="container my-5">
      <div class="row">
        <div class="col-md-8 m-auto">
          <table class="table">
            <thead>
              <th></th>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="(item,index) in carts" :key="index">
                <td class="align-middle">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="deleteToCart(item.id)"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">已套用折扣碼</div>
                </td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total|currency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">{{ cart.total |currency}}</td>
              </tr>
              <tr v-if="cart.final_total!==cart.total">
                <td colspan="3" class="text-right text-success">折扣價</td>
                <td class="text-right text-success">{{ cart.final_total |currency }}</td>
              </tr>
            </tfoot>
          </table>
          <small class="mb-2" :class="{'text-success':isUse,'text-danger':!isUse}">{{message}}</small>
          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon" />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click="useCoupon">套用優惠碼</button>
            </div>
          </div>
        </div>
        <ValidationObserver ref="form" v-slot="{ invalid  }" class="col-md-8 m-auto">
          <form @submit.prevent="submitOrder">
            <div class="form-group">
              <ValidationProvider
                name="name"
                rules="required"
                v-slot="{ classes , errors }"
                ref="name"
              >
                <label for="username">收件人姓名</label>
                <input
                  type="text"
                  class="form-control mb-2"
                  :class="classes"
                  name="name"
                  id="username"
                  placeholder="輸入姓名"
                  v-model="userForm.user.name"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider name="email" rules="required|email" v-slot="{ classes,errors }">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  :class="classes"
                  name="email"
                  id="email"
                  placeholder="請輸入 Email"
                  v-model="userForm.user.email"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider name="tel" rules="required|numeric" v-slot="{ classes,errors }">
                <label for="tel">收件人電話</label>
                <input
                  type="tel"
                  class="form-control"
                  :class="classes"
                  id="tel"
                  name="tel"
                  placeholder="請輸入電話"
                  v-model="userForm.user.tel"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <ValidationProvider name="address" rules="required" v-slot="{ classes,errors }">
                <label for="useraddress">收件人地址</label>
                <input
                  type="text"
                  class="form-control"
                  :class="classes"
                  name="address"
                  id="useraddress"
                  placeholder="請輸入地址"
                  v-model="userForm.user.address"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <ValidationProvider name="comment" rules="required" v-slot="{ classes,errors }">
                <label for="comment">留言</label>
                <textarea
                  name
                  id="comment"
                  class="form-control"
                  :class="classes"
                  cols="30"
                  rows="5"
                  v-model="userForm.message"
                ></textarea>
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="text-right">
              <button class="btn btn-danger">送出訂單</button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getCartList,
  deleteToCart,
  useCoupon,
  submitOrder,
  getOrderList,
  checkout
} from "@/api/api";
import { EventBus } from "@/eventBus/eventBus";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { validate } from "vee-validate";

export default {
  name: "CartList",
  components: {
    ValidationProvider,
    ValidationObserver
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
      isLoading: false,
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
      isValid: false
    };
  },
  methods: {
    getCartList() {
      this.isLoading = true;
      getCartList().then(res => {
        if (res.data.success) {
          this.carts = res.data.data.carts;
          [this.cart.final_total, this.cart.total] = [
            res.data.data.final_total,
            res.data.data.total
          ];
          this.isLoading = false;
        } else {
          EventBus.emitHandler(false, "取得訂單失敗");
        }
      });
    },
    deleteToCart(id) {
      this.isLoading = true;
      deleteToCart(id).then(res => {
        if (res.data.success) {
          this.getCartList();
          this.isLoading = false;
          EventBus.emitHandler(true, res.data.message);
        } else {
          EventBus.emitHandler(false, res.data.message);
        }
      });
    },
    useCoupon() {
      this.isLoading = true;
      let code = {
        code: this.coupon
      };
      useCoupon({ data: code }).then(res => {
        if (res.data.success) {
          this.getCartList();
          this.isLoading = false;
          this.isUse = true;
          this.message = res.data.message;
        } else {
          this.isUse = false;
          this.isLoading = false;
          this.message = res.data.message;
        }
      });
    },
    async checkValid() {
      const isValid = await this.$refs.form.validate();
      this.isValid = isValid;
    },
    async checkError() {
      const name = await this.$refs.name.validate();
      console.log(name.valid);
    },
    submitOrder() {
      this.checkValid();
      if (!this.isValid) {
        submitOrder({ data: this.userForm }).then(res => {
          console.log("res.data.orderId", res.data.orderId);
          if (res.data.success) {
            // this.getCartList();
            this.$router.push({
              name: "checkout",
              params: { orderId: res.data.orderId }
            });
            this.isLoading = false;
            EventBus.emitHandler(true, res.data.message);
          } else {
            EventBus.emitHandler(false, res.data.message);
          }
        });
      }
    }
  },
  created() {
    this.getCartList();
  }
};
</script>