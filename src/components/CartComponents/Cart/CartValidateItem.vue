<template>
  <div>
    <div class="form-group">
      <ValidationProvider name="name" rules="required" v-slot="{ classes , errors }">
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
      <label for="useraddress">收件人地址</label>
      <div class="form-row justify-content-center">
        <div class="form-group col-md-3">
          <ValidationProvider name="country" rules="required" v-slot="{ classes,errors }">
            <select class="form-control" v-model="countryIndex" :class="classes">
              <option :value="null" selected disabled class="form-control">請選擇</option>
              <option
                v-for="(country,index) in postal"
                :key="country.name"
                :value="index"
                class="form-control"
              >{{country.name}}</option>
            </select>
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-md-3">
          <ValidationProvider name="zone" rules="required" v-slot="{ classes,errors }">
            <select class="form-control" v-model="areaIndex" :class="classes">
              <option :value="null" selected disabled>請選擇</option>
              <option v-for="(area,index) in areas" :key="index" :value="index">{{area.name}}</option>
            </select>
            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-md-6">
          <ValidationProvider name="address" rules="required" v-slot="{ classes,errors }">
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
      </div>
    </div>
    <hr />
    <div class="form-group">
      <label for="comment">留言</label>
      <textarea
        name
        id="comment"
        class="form-control"
        cols="30"
        rows="5"
        v-model="userForm.message"
      ></textarea>
    </div>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
export default {
  name: "CartListItem",
  props: {
    userForm: {
      type: Object,
      required: true
    },
    index: {
      type: Object,
      required: true
    },
    areas: {
      type: Array,
      required: true
    },
    postal: {
      type: Array,
      required: true
    }
  },
  components: {
    ValidationProvider
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
    }
  }
};
</script>

<style>
</style>