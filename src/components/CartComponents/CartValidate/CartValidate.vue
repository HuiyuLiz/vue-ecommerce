<template>
  <div>
    <div class="form-group">
      <ValidateInput
        text="收件人姓名"
        v-model="userForm.user.name"
        rules="required"
        class="classes"
        name="username"
        :showLabel="true"
      ></ValidateInput>
    </div>
    <div class="form-group">
        <ValidateInput
        text="Email"
        v-model="userForm.user.email"
        rules="required|email"
        class="classes"
        name="email"
        :showLabel="true"
      ></ValidateInput>
      </ValidationProvider>
    </div>
    <div class="form-group">
         <ValidateInput
        type="number"
        text="手機號碼"
        v-model="userForm.user.tel"
        rules="required|mobile"
        class="classes"
        name="mobile"
        :showLabel="true"
      ></ValidateInput>
    </div>
    <div class="form-group">
      <label for="useraddress" class="text-secondary">收件人地址</label>
      <div class="form-row justify-content-center">
        <div class="form-group col-md-3">
          <ValidationProvider name="country" rules="required" v-slot="{ classes,errors }">
            <select class="form-control   rounded-0 mb-2" v-model="countryIndex" :class="classes">
              <option :value="null" selected disabled class="form-control ">請選擇縣市</option>
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
            <select class="form-control  rounded-0 mb-2" v-model="areaIndex" :class="classes">
              <option :value="null" selected disabled>請選擇鄉鎮市區</option>
              <option v-for="(area,index) in areas" :key="index" :value="index">{{area.name}}</option>
            </select>
            <span class="text-danger" v-if="errors[0]">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-md-6">
            <ValidateInput
        text="地址"
        v-model="userForm.user.address"
        rules="required"
        class="classes"
        name="address"
        :showLabel="false"
      ></ValidateInput>
        </div>
      </div>
    </div>
    <hr />
    <div class="form-group  rounded-0 mb-5">
      <label for="comment"  class="text-secondary">留言</label>
      <textarea
        name
        id="comment"
        class="form-control rounded-0"
        cols="30"
        rows="5"
        v-model="userForm.message"
      ></textarea>
    </div>
  </div>
</template>

<script>
import ValidateInput from './ValidateInput'
export default {
  name: 'CartList',
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
  components:{
    ValidateInput
  },
  computed: {
    countryIndex: {
      get () {
        return this.index.country;
      },
      set (val) {
        this.index.country = val;
        this.index.area = null;
        this.userForm.user.address = "";
      }
    },
    areaIndex: {
      get () {
        return this.index.area;
      },
      set (val) {
        this.index.area = val;
      }
    }
  }
};
</script>

<style>
</style>